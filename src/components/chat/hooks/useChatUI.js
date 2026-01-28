import { useEffect, useState } from 'react';

export function useChatUI() {
  const [viewMode, setViewMode] = useState('intro'); // intro | all | friends
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key !== 'Escape') return;

      if (activeChat) {
        setActiveChat(null);
      } else {
        setViewMode('intro');
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeChat]);

  return {
    viewMode,
    activeChat,

    showIntro: () => setViewMode('intro'),
    showAll: () => setViewMode('all'),
    showFriends: () => setViewMode('friends'),

    openChat: setActiveChat,
    closeChat: () => setActiveChat(null),
  };
}
