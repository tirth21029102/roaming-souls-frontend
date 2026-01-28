import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { fetchMsgHistory } from '../../utils/fetchMsgHistory';
import { useEffect } from 'react';
import { clearChat } from '../../store/chat.slice';
import { messageReceived } from '../../store/chat.slice';

export default function ChatMessages({ conversationId }) {
  const messages = useSelector((state) => state.messages.messages);
  const currentUserId = useSelector((state) => state.users.loggedInUser.id);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => fetchMsgHistory(conversationId),
    retry: false,
    staleTime: 0,
  });
  // if (error) console.log(error);

  useEffect(() => {
    if (data?.length) {
      dispatch(clearChat()); // optional but recommended
      data.forEach((msg) => dispatch(messageReceived(msg)));
    }
  }, [data, dispatch]);

  useEffect(() => {
    return () => dispatch(clearChat());
  }, []);

  return (
    <div className="flex-1 space-y-2 overflow-y-auto bg-green-50 p-3">
      {isLoading && (
        <span className="text-green-700">
          please wait while we load your chats...
        </span>
      )}
      {error && (
        <span className="text-green-700">
          sorry , we are unable to load your conversation
        </span>
      )}
      {messages.length === 0 && !isLoading && !error && (
        <span className="text-green-700">Start your conversation...</span>
      )}
      {messages.map((m) => {
        const isOutgoing = m.sender_id === currentUserId;
        return (
          <div
            key={m.id}
            className={`w-fit max-w-[70%] rounded-lg px-3 py-2 text-sm shadow ${
              isOutgoing
                ? 'ml-auto bg-indigo-500 text-white'
                : 'bg-rose-50 text-rose-900'
            }`}
          >
            {m.content}
          </div>
        );
      })}
    </div>
  );
}
