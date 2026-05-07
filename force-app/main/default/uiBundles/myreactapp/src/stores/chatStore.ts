import { create } from 'zustand';
import type { ChatFrame } from '@chat/protocol';

export type Role = 'user' | 'assistant' | 'system' | 'tool';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  status: 'pending' | 'streaming' | 'final' | 'error';
  createdAt: number;
}

interface ChatState {
  messages: ChatMessage[];
  streamingId: string | null;
  conversationId: string | null;

  setConversation: (id: string) => void;
  appendOptimistic: (id: string, content: string) => void;
  applyFrame: (frame: ChatFrame) => void;
  markError: (id: string, message: string) => void;
  /** Replace the message list with prior history. Sorted ascending by createdAt. */
  seedFromHistory: (history: ChatMessage[]) => void;
  reset: () => void;
}

const ensureAssistantPlaceholder = (
  messages: ChatMessage[],
  streamingId: string | null,
  messageId: string,
): { messages: ChatMessage[]; streamingId: string } => {
  if (streamingId === messageId) return { messages, streamingId };
  const exists = messages.some((m) => m.id === messageId);
  if (exists) return { messages, streamingId: messageId };
  return {
    messages: [
      ...messages,
      {
        id: messageId,
        role: 'assistant',
        content: '',
        status: 'streaming',
        createdAt: Date.now(),
      },
    ],
    streamingId: messageId,
  };
};

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  streamingId: null,
  conversationId: null,

  setConversation: (id) => set({ conversationId: id }),

  appendOptimistic: (id, content) =>
    set((s) => ({
      messages: [
        ...s.messages,
        { id, role: 'user', content, status: 'pending', createdAt: Date.now() },
      ],
    })),

  applyFrame: (frame) =>
    set((s) => {
      switch (frame.type) {
        case 'token': {
          const next = ensureAssistantPlaceholder(s.messages, s.streamingId, frame.data.messageId);
          const messages = next.messages.map((m) =>
            m.id === frame.data.messageId
              ? { ...m, content: m.content + frame.data.delta, status: 'streaming' as const }
              : m,
          );
          return { messages, streamingId: next.streamingId };
        }
        case 'message_complete': {
          const messages = s.messages.map((m) =>
            m.id === frame.data.messageId ? { ...m, status: 'final' as const } : m,
          );
          return {
            messages,
            streamingId: s.streamingId === frame.data.messageId ? null : s.streamingId,
          };
        }
        case 'error': {
          const id = s.streamingId;
          if (!id) return s;
          const messages = s.messages.map((m) =>
            m.id === id ? { ...m, status: 'error' as const, content: m.content || frame.data.message } : m,
          );
          return { messages, streamingId: null };
        }
        case 'tool_call':
          // Render hook for tool UI; not handled in MVP store.
          return s;
        default:
          return s;
      }
    }),

  markError: (id, message) =>
    set((s) => ({
      messages: s.messages.map((m) =>
        m.id === id ? { ...m, status: 'error', content: message || m.content } : m,
      ),
    })),

  seedFromHistory: (history) =>
    set({
      messages: [...history].sort((a, b) => a.createdAt - b.createdAt),
      streamingId: null,
    }),

  reset: () => set({ messages: [], streamingId: null, conversationId: null }),
}));
