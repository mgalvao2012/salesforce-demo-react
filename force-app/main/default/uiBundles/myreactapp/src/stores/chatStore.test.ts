import { describe, it, expect, beforeEach } from 'vitest';
import { useChatStore } from './chatStore';

beforeEach(() => {
  useChatStore.getState().reset();
});

describe('chatStore', () => {
  it('appends optimistic user messages', () => {
    useChatStore.getState().appendOptimistic('local-1', 'hello');
    const messages = useChatStore.getState().messages;
    expect(messages).toHaveLength(1);
    expect(messages[0]).toMatchObject({
      id: 'local-1',
      role: 'user',
      content: 'hello',
      status: 'pending',
    });
  });

  it('creates a streaming assistant placeholder on first token', () => {
    useChatStore.getState().applyFrame({
      id: '1',
      type: 'token',
      data: { messageId: 'asst-1', delta: 'Hel' },
    });
    const s = useChatStore.getState();
    expect(s.streamingId).toBe('asst-1');
    expect(s.messages).toHaveLength(1);
    expect(s.messages[0]).toMatchObject({
      id: 'asst-1',
      role: 'assistant',
      content: 'Hel',
      status: 'streaming',
    });
  });

  it('appends subsequent token deltas to the same message', () => {
    const store = useChatStore.getState();
    store.applyFrame({ id: '1', type: 'token', data: { messageId: 'asst-1', delta: 'Hel' } });
    store.applyFrame({ id: '2', type: 'token', data: { messageId: 'asst-1', delta: 'lo' } });
    store.applyFrame({ id: '3', type: 'token', data: { messageId: 'asst-1', delta: '!' } });

    const s = useChatStore.getState();
    expect(s.messages).toHaveLength(1);
    expect(s.messages[0]?.content).toBe('Hello!');
  });

  it('finalizes message on message_complete and clears streamingId', () => {
    const store = useChatStore.getState();
    store.applyFrame({ id: '1', type: 'token', data: { messageId: 'asst-1', delta: 'Hi' } });
    store.applyFrame({
      id: '2',
      type: 'message_complete',
      data: { messageId: 'asst-1', tokens: 1 },
    });

    const s = useChatStore.getState();
    expect(s.streamingId).toBeNull();
    expect(s.messages[0]?.status).toBe('final');
  });

  it('marks streaming message as error on error frame', () => {
    const store = useChatStore.getState();
    store.applyFrame({ id: '1', type: 'token', data: { messageId: 'asst-1', delta: 'partial' } });
    store.applyFrame({
      id: '2',
      type: 'error',
      data: { code: 'rate_limit', message: 'too many requests' },
    });

    const s = useChatStore.getState();
    expect(s.streamingId).toBeNull();
    expect(s.messages[0]?.status).toBe('error');
  });

  it('seedFromHistory replaces messages and sorts by createdAt', () => {
    const store = useChatStore.getState();
    store.appendOptimistic('local-1', 'will be replaced');
    const earlier = 1_700_000_000_000;
    const later = earlier + 5_000;
    store.seedFromHistory([
      { id: 'b', role: 'assistant', content: 'second', status: 'final', createdAt: later },
      { id: 'a', role: 'user', content: 'first', status: 'final', createdAt: earlier },
    ]);

    const s = useChatStore.getState();
    expect(s.messages).toHaveLength(2);
    expect(s.messages[0]?.id).toBe('a');
    expect(s.messages[1]?.id).toBe('b');
    expect(s.streamingId).toBeNull();
  });

  it('markError flags an existing message', () => {
    const store = useChatStore.getState();
    store.appendOptimistic('local-1', 'hi');
    store.markError('local-1', 'network down');

    const m = useChatStore.getState().messages[0];
    expect(m?.status).toBe('error');
  });
});
