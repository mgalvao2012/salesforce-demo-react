import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useSSE } from './useSSE';
import type {
  EventSourceMessage,
  FetchEventSourceInit,
} from '@microsoft/fetch-event-source';

type FetchSig = (url: string, init: FetchEventSourceInit) => Promise<void>;

interface FakeStream {
  emitMessage: (msg: EventSourceMessage) => void;
  open: (resp: Response) => Promise<void>;
  waitForReady: () => Promise<void>;
}

/**
 * Minimal stand-in for @microsoft/fetch-event-source: the real lib invokes
 * `onopen(response)` on connect, then `onmessage(...)` for each frame, and the
 * outer fetch promise stays pending until the stream closes. If onopen throws,
 * the outer promise rejects with that error.
 */
function makeFakeFetch(): { fetchFn: FetchSig; controller: FakeStream } {
  let onMessage: ((msg: EventSourceMessage) => void) | null = null;
  let onOpen: ((resp: Response) => Promise<void> | void) | null = null;
  let outerReject: ((err: unknown) => void) | null = null;

  let signalReady: () => void = () => {};
  const ready = new Promise<void>((res) => {
    signalReady = res;
  });

  const fetchFn: FetchSig = (_url, init) => {
    return new Promise<void>((_resolve, reject) => {
      onMessage = init.onmessage ?? null;
      onOpen = init.onopen ?? null;
      outerReject = reject;
      signalReady();
      init.signal?.addEventListener('abort', () => {
        reject(new DOMException('aborted', 'AbortError'));
      });
    });
  };

  const controller: FakeStream = {
    emitMessage: (msg) => onMessage?.(msg),
    open: async (resp) => {
      await ready;
      try {
        await onOpen?.(resp);
      } catch (err) {
        outerReject?.(err);
      }
    },
    waitForReady: () => ready,
  };

  return { fetchFn, controller };
}

describe('useSSE', () => {
  it('moves to "open" after onopen receives 200 text/event-stream', async () => {
    const { fetchFn, controller } = makeFakeFetch();
    const { result } = renderHook(() =>
      useSSE({
        url: 'https://x/sse',
        getToken: async () => 't',
        onFrame: vi.fn(),
        fetchFn: fetchFn as never,
      }),
    );

    await waitFor(() => expect(result.current.status).toBe('connecting'));

    await act(async () => {
      await controller.open(
        new Response('', { status: 200, headers: { 'content-type': 'text/event-stream' } }),
      );
    });

    await waitFor(() => expect(result.current.status).toBe('open'));
  });

  it('parses messages and forwards them to onFrame', async () => {
    const { fetchFn, controller } = makeFakeFetch();
    const onFrame = vi.fn();

    renderHook(() =>
      useSSE({
        url: 'https://x/sse',
        getToken: async () => 't',
        onFrame,
        fetchFn: fetchFn as never,
      }),
    );

    await act(async () => {
      await controller.open(
        new Response('', { status: 200, headers: { 'content-type': 'text/event-stream' } }),
      );
    });

    act(() => {
      controller.emitMessage({
        id: '42',
        event: 'token',
        data: JSON.stringify({ messageId: 'm1', delta: 'hi' }),
        retry: undefined as unknown as number,
      });
    });

    expect(onFrame).toHaveBeenCalledTimes(1);
    expect(onFrame).toHaveBeenCalledWith({
      id: '42',
      type: 'token',
      data: { messageId: 'm1', delta: 'hi' },
    });
  });

  it('ignores ping/empty events', async () => {
    const { fetchFn, controller } = makeFakeFetch();
    const onFrame = vi.fn();

    renderHook(() =>
      useSSE({
        url: 'https://x/sse',
        getToken: async () => 't',
        onFrame,
        fetchFn: fetchFn as never,
      }),
    );

    await act(async () => {
      await controller.open(
        new Response('', { status: 200, headers: { 'content-type': 'text/event-stream' } }),
      );
    });

    act(() => {
      controller.emitMessage({
        id: '',
        event: '',
        data: '',
        retry: undefined as unknown as number,
      });
    });

    expect(onFrame).not.toHaveBeenCalled();
  });

  it('stops on 401 without reconnect', async () => {
    const { fetchFn, controller } = makeFakeFetch();
    const { result } = renderHook(() =>
      useSSE({
        url: 'https://x/sse',
        getToken: async () => 't',
        onFrame: vi.fn(),
        fetchFn: fetchFn as never,
      }),
    );

    await act(async () => {
      await controller.open(new Response('', { status: 401 }));
    });

    await waitFor(() => expect(result.current.status).toBe('error'));
    expect(result.current.lastError).toMatch(/auth rejected/);
  });
});
