import { useEffect, useState } from 'react';
import { joinConversation } from '../../../socket/emitters';

const BASE_URL = import.meta.env.VITE_CONVERSATIONS_URL;

export function useConversation(userId) {
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const initConversation = async () => {
      try {
        const res = await fetch(`${BASE_URL}/private`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });

        const data = await res.json();
        setConversationId(data.conversationId);
      } finally {
        setLoading(false);
      }
    };

    initConversation();
  }, [userId]);

  useEffect(() => {
    if (!conversationId) return;
    joinConversation(conversationId);
  }, [conversationId]);

  return {
    conversationId,
    loading,
  };
}
