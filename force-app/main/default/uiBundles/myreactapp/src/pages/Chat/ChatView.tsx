import { useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useChatStore } from '../../stores/chatStore';
import ChatBubble from './components/ChatBubble';
import TypingDots from './components/TypingDots';

export default function ChatView() {
  const messages = useChatStore((s) => s.messages);
  const streamingId = useChatStore((s) => s.streamingId);

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 6,
  });

  // Keep scroll pinned to the latest message while streaming.
  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (distanceFromBottom < 200) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, streamingId]);

  const showTyping = streamingId !== null && messages.find((m) => m.id === streamingId)?.content === '';

  return (
    <div className="flex h-full flex-col">
      <div ref={parentRef} className="flex-1 overflow-y-auto">
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const message = messages[virtualRow.index];
            if (!message) return null;
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="px-3 py-1"
              >
                <ChatBubble message={message} />
              </div>
            );
          })}
        </div>
        {showTyping && <TypingDots />}
      </div>

      {/* Off-screen aria-live region: announces only finalized assistant messages. */}
      <div
        role="log"
        aria-live="polite"
        aria-atomic="false"
        className="sr-only"
        data-testid="chat-live-region"
      >
        {messages
          .filter((m) => m.role === 'assistant' && m.status === 'final')
          .slice(-1)
          .map((m) => (
            <p key={m.id}>{m.content}</p>
          ))}
      </div>
    </div>
  );
}
