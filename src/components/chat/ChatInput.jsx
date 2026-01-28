import { useState } from 'react';
import { sendMessage } from '../../socket/emitters';

export default function ChatInput({ conversationId }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message, conversationId);
    setMessage('');
  };

  return (
    <div className="flex items-center gap-2 border-t bg-white p-2">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="flex-1 rounded-full border px-4 py-2 text-sm text-green-600 focus:outline-none"
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        onClick={handleSend}
        className="rounded-full bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
      >
        Send
      </button>
    </div>
  );
}
