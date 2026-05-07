import { cn } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import type { ConversationSummary } from '../../../api/chatClient';

interface ConversationSidebarProps {
  conversations: ConversationSummary[];
  activeExternalId: string | null;
  loading: boolean;
  error: string | null;
  onSelect: (externalId: string) => void;
  onNewConversation: () => void;
}

export default function ConversationSidebar({
  conversations,
  activeExternalId,
  loading,
  error,
  onSelect,
  onNewConversation,
}: ConversationSidebarProps) {
  return (
    <aside
      className="flex w-64 flex-col border-r bg-white"
      aria-label="Recent conversations"
    >
      <div className="border-b p-3">
        <Button onClick={onNewConversation} className="w-full" variant="default">
          New chat
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto" aria-busy={loading}>
        {loading && conversations.length === 0 && (
          <p className="p-3 text-xs text-gray-500">Loading…</p>
        )}
        {error && <p className="p-3 text-xs text-red-700">{error}</p>}
        {!loading && !error && conversations.length === 0 && (
          <p className="p-3 text-xs text-gray-500">No previous conversations.</p>
        )}

        <ul className="flex flex-col">
          {conversations.map((c) => {
            const isActive = c.externalId === activeExternalId;
            return (
              <li key={c.externalId}>
                <button
                  type="button"
                  onClick={() => onSelect(c.externalId)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'block w-full truncate border-b px-3 py-2 text-left text-sm transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-900 font-medium'
                      : 'text-gray-800 hover:bg-gray-50',
                  )}
                  title={c.title}
                >
                  {c.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
