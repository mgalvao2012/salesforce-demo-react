import { useEffect, useRef, useState } from 'react';
import {
  fetchEventSource,
  type EventSourceMessage,
} from '@microsoft/fetch-event-source';
import type { ChatFrame } from '@chat/protocol';

export type ConnectionStatus =
  | 'idle'
  | 'connecting'
  | 'open'
  | 'reconnecting'
  | 'error'
  | 'closed';

export interface UseSSEOptions {
  url: string;
  getToken: () => Promise<string>;
  onFrame: (frame: ChatFrame) => void;
  initialLastEventId?: string;
  /** Test seam: defaults to global fetchEventSource. */
  fetchFn?: typeof fetchEventSource;
}

export interface UseSSEResult {
  status: ConnectionStatus;
  lastError: string | null;
  /** Manual reconnect trigger (used by reconnect UI). */
  reconnect: () => void;
}

const MAX_BACKOFF_MS = 30_000;
const BACKOFF_BASE_MS = 1_000;
const JITTER = 0.25;

const sleep = (ms: number, signal: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal.addEventListener('abort', () => {
      clearTimeout(t);
      reject(new DOMException('aborted', 'AbortError'));
    });
  });

const computeBackoff = (attempt: number): number => {
  const base = Math.min(BACKOFF_BASE_MS * 2 ** attempt, MAX_BACKOFF_MS);
  const jitter = base * JITTER * (Math.random() * 2 - 1);
  return Math.max(0, Math.round(base + jitter));
};

class FatalAuthError extends Error {}
class TransientError extends Error {}

export function useSSE(opts: UseSSEOptions): UseSSEResult {
  const { url, getToken, onFrame, initialLastEventId, fetchFn = fetchEventSource } = opts;

  const [status, setStatus] = useState<ConnectionStatus>('idle');
  const [lastError, setLastError] = useState<string | null>(null);
  const [reconnectKey, setReconnectKey] = useState(0);

  const onFrameRef = useRef(onFrame);
  onFrameRef.current = onFrame;
  const getTokenRef = useRef(getToken);
  getTokenRef.current = getToken;

  useEffect(() => {
    if (!url) {
      setStatus('idle');
      return;
    }
    const ac = new AbortController();
    let lastEventId = initialLastEventId ?? '';
    let attempt = 0;
    let cancelled = false;

    const run = async (): Promise<void> => {
      while (!cancelled) {
        setStatus(attempt === 0 ? 'connecting' : 'reconnecting');
        try {
          const token = await getTokenRef.current();
          await fetchFn(url, {
            method: 'GET',
            signal: ac.signal,
            headers: {
              Authorization: `Bearer ${token}`,
              ...(lastEventId ? { 'Last-Event-ID': lastEventId } : {}),
            },
            openWhenHidden: true,
            onopen: async (resp) => {
              if (resp.ok && resp.headers.get('content-type')?.includes('text/event-stream')) {
                attempt = 0;
                setStatus('open');
                setLastError(null);
                return;
              }
              if (resp.status === 401 || resp.status === 403) {
                throw new FatalAuthError(`auth rejected (${resp.status})`);
              }
              throw new TransientError(`unexpected status ${resp.status}`);
            },
            onmessage: (msg: EventSourceMessage) => {
              if (msg.id) lastEventId = msg.id;
              if (!msg.event || msg.event === 'ping') return;
              try {
                const frame = {
                  id: msg.id,
                  type: msg.event,
                  data: JSON.parse(msg.data),
                } as ChatFrame;
                onFrameRef.current(frame);
              } catch (err) {
                setLastError(`bad frame: ${(err as Error).message}`);
              }
            },
            onerror: (err) => {
              if (err instanceof FatalAuthError) throw err;
              throw new TransientError((err as Error)?.message ?? 'connection error');
            },
            onclose: () => {
              throw new TransientError('stream closed by server');
            },
          });
          if (cancelled) return;
        } catch (err) {
          if (cancelled || ac.signal.aborted) return;
          if (err instanceof FatalAuthError) {
            setStatus('error');
            setLastError(err.message);
            return;
          }
          setLastError((err as Error).message);
          attempt += 1;
          const wait = computeBackoff(attempt);
          try {
            await sleep(wait, ac.signal);
          } catch {
            return;
          }
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
      ac.abort();
      setStatus('closed');
    };
  }, [url, initialLastEventId, reconnectKey, fetchFn]);

  return {
    status,
    lastError,
    reconnect: () => setReconnectKey((k) => k + 1),
  };
}
