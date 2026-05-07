import { useCallback, useEffect, useState } from 'react';
import { useChatStore } from '../../stores/chatStore';
import { useChatStream } from '../../hooks/useChatStream';
import {
  loadConversationList,
  loadRecentConversation,
  type ConversationSummary,
} from '../../api/chatClient';
import ChatView from './ChatView';
import ChatInput from './components/ChatInput';
import ConnectionPill from './components/ConnectionPill';
import ConversationSidebar from './components/ConversationSidebar';

const ACTIVE_KEY = 'chat:activeConversationId';

const initialActiveId = (): string => {
  const existing = sessionStorage.getItem(ACTIVE_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  sessionStorage.setItem(ACTIVE_KEY, id);
  return id;
};

export default function Chat() {
  const [conversationId, setConversationId] = useState<string>(initialActiveId);

  const setConversation = useChatStore((s) => s.setConversation);
  const seedFromHistory = useChatStore((s) => s.seedFromHistory);
  const reset = useChatStore((s) => s.reset);

  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  // Load conversation list on mount.
  const refreshList = useCallback(async () => {
    setListLoading(true);
    setListError(null);
    try {
      const list = await loadConversationList();
      setConversations(list);
    } catch (err) {
      setListError((err as Error).message);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshList();
  }, [refreshList]);

  // Sync active id into the store + sessionStorage.
  useEffect(() => {
    setConversation(conversationId);
    sessionStorage.setItem(ACTIVE_KEY, conversationId);
  }, [conversationId, setConversation]);

  // Load history for the active conversation.
  useEffect(() => {
    let cancelled = false;
    setHistoryLoaded(false);
    setHistoryError(null);
    reset();
    void (async () => {
      try {
        const { messages } = await loadRecentConversation(conversationId);
        if (cancelled) return;
        seedFromHistory(messages);
      } catch (err) {
        if (!cancelled) setHistoryError((err as Error).message);
      } finally {
        if (!cancelled) setHistoryLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [conversationId, seedFromHistory, reset]);

  const { status, lastError, reconnect, send } = useChatStream(conversationId);

  const onSelect = useCallback((externalId: string) => {
    setConversationId(externalId);
  }, []);

  const onNewConversation = useCallback(() => {
    const id = crypto.randomUUID();
    setConversationId(id);
    // Optimistically include the new conversation in the list (will be
    // reconciled by the next list refresh once the backend persists it).
    setConversations((prev) => [
      {
        externalId: id,
        title: 'New conversation',
        startedAt: Date.now(),
        endedAt: null,
        status: 'Active',
      },
      ...prev,
    ]);
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <ConversationSidebar
        conversations={conversations}
        activeExternalId={conversationId}
        loading={listLoading}
        error={listError}
        onSelect={onSelect}
        onNewConversation={onNewConversation}
      />

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b bg-white px-4 py-2">
          <h1 className="text-lg font-semibold text-gray-900">Chat</h1>
          <ConnectionPill status={status} onReconnect={reconnect} />
        </div>

        {(lastError || historyError) && (
          <div className="border-b border-yellow-200 bg-yellow-50 px-4 py-2 text-xs text-yellow-900">
            {lastError ?? historyError}
          </div>
        )}

        {!historyLoaded ? (
          <div className="flex flex-1 items-center justify-center text-sm text-gray-500">
            Loading conversation…
          </div>
        ) : (
          <ChatView />
        )}

        <ChatInput
          disabled={status !== 'open'}
          onSend={(text) => {
            void send(text);
          }}
        />
      </div>
    </div>
  );
}
