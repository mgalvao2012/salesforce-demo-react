import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ChatFrame } from '@chat/protocol';
import { useSSE, type ConnectionStatus } from './useSSE';
import { useChatStore } from '../stores/chatStore';
import { getSseToken, sendMessage as sendMessageApi, clearTokenCache } from '../api/chatClient';

export interface UseChatStreamResult {
  status: ConnectionStatus;
  lastError: string | null;
  reconnect: () => void;
  send: (content: string) => Promise<void>;
}

export function useChatStream(conversationId: string): UseChatStreamResult {
  const [sseUrl, setSseUrl] = useState<string>('');
  const [bootstrapError, setBootstrapError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const t = await getSseToken();
        if (!cancelled) setSseUrl(t.sseUrl);
      } catch (err) {
        if (cancelled) return;
        setBootstrapError((err as Error).message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const applyFrame = useChatStore((s) => s.applyFrame);
  const appendOptimistic = useChatStore((s) => s.appendOptimistic);
  const markError = useChatStore((s) => s.markError);

  const onFrame = useCallback(
    (frame: ChatFrame) => {
      applyFrame(frame);
    },
    [applyFrame],
  );

  const getToken = useCallback(async () => {
    const t = await getSseToken();
    return t.token;
  }, []);

  const sse = useSSE(
    useMemo(
      () => ({
        url: sseUrl,
        getToken,
        onFrame,
      }),
      [sseUrl, getToken, onFrame],
    ),
  );

  const send = useCallback(
    async (content: string) => {
      const optimisticId = `local-${crypto.randomUUID()}`;
      appendOptimistic(optimisticId, content);
      try {
        const t = await getSseToken();
        await sendMessageApi(t.sseUrl, t.token, { conversationId, content });
      } catch (err) {
        markError(optimisticId, (err as Error).message);
        clearTokenCache();
      }
    },
    [conversationId, appendOptimistic, markError],
  );

  return {
    status: sse.status,
    lastError: bootstrapError ?? sse.lastError,
    reconnect: sse.reconnect,
    send,
  };
}
