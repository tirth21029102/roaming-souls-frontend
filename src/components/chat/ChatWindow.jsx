import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useConversation } from './hooks/useConversation';
const BASE_URL = import.meta.env.VITE_IMAGE_URL;

export default function ChatWindow({ user, onClose, currentUser }) {
  const { conversationId, loading } = useConversation(user.id);

  if (loading || !conversationId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="relative z-10 flex h-125 w-95 flex-col rounded-xl bg-white shadow-2xl">
        <ChatHeader user={user} onClose={onClose} />
        <ChatMessages conversationId={conversationId} />
        <ChatInput conversationId={conversationId} />
      </div>

      <div className="absolute top-12 right-12 z-999 flex items-center gap-4 rounded-full bg-gray-300 text-green-800">
        <span className="text-red-400">{currentUser.user_name}</span>
        <img
          src={`${BASE_URL}/${currentUser.imageName}`}
          className="h-12 w-12 rounded-full"
        />
      </div>
    </div>
  );
}
