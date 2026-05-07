import { useState, type KeyboardEvent } from 'react';
import { Button } from '../../../components/ui/button';

interface ChatInputProps {
  disabled?: boolean;
  onSend: (text: string) => void;
}

export default function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [value, setValue] = useState('');

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form
      className="flex items-end gap-2 border-t bg-white p-3"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <textarea
        className="flex-1 resize-none rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        placeholder="Send a message…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        rows={2}
        disabled={disabled}
        aria-label="Message"
      />
      <Button type="submit" disabled={disabled || value.trim().length === 0}>
        Send
      </Button>
    </form>
  );
}
