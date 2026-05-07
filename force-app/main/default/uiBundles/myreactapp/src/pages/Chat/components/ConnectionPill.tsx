import { cn } from '../../../lib/utils';
import type { ConnectionStatus } from '../../../hooks/useSSE';

interface ConnectionPillProps {
  status: ConnectionStatus;
  onReconnect: () => void;
}

const LABEL: Record<ConnectionStatus, string> = {
  idle: 'Idle',
  connecting: 'Connecting…',
  open: 'Connected',
  reconnecting: 'Reconnecting…',
  error: 'Disconnected',
  closed: 'Closed',
};

const COLOR: Record<ConnectionStatus, string> = {
  idle: 'bg-gray-200 text-gray-700',
  connecting: 'bg-yellow-100 text-yellow-800',
  open: 'bg-green-100 text-green-800',
  reconnecting: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  closed: 'bg-gray-200 text-gray-700',
};

export default function ConnectionPill({ status, onReconnect }: ConnectionPillProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn('rounded-full px-2 py-0.5 text-xs font-medium', COLOR[status])}
        role="status"
      >
        {LABEL[status]}
      </span>
      {status === 'error' && (
        <button
          type="button"
          onClick={onReconnect}
          className="text-xs text-blue-600 hover:underline"
        >
          Reconnect
        </button>
      )}
    </div>
  );
}
