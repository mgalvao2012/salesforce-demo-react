import { cn } from '../../../lib/utils';
import type { ChatMessage } from '../../../stores/chatStore';

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  const isError = message.status === 'error';
  return (
    <div className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap break-words',
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900',
          isError && 'bg-red-100 text-red-900 border border-red-300',
          message.status === 'pending' && 'opacity-60',
        )}
        data-status={message.status}
        data-role={message.role}
      >
        {message.content || (message.status === 'streaming' ? ' ' : '')}
      </div>
    </div>
  );
}
