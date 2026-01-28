import { useEffect, useState } from 'react';

export function useChatController() {
  const [viewMode, setViewMode] = useState('intro'); // intro | all | friends
  const [activeChat, setActiveChat] = useState(null);
  const [activeCall, setActiveCall] = useState(null);

  // Keyboard side effect
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key !== 'Escape') return;

      if (activeCall) {
        setActiveCall(null);
      } else if (activeChat) {
        setActiveChat(null);
      } else {
        setViewMode('intro');
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeChat, activeCall]);

  return {
    // state
    viewMode,
    activeChat,
    activeCall,

    // derived
    isFriendsView: viewMode === 'friends',

    // actions
    showIntro: () => setViewMode('intro'),
    showAll: () => setViewMode('all'),
    showFriends: () => setViewMode('friends'),
    startChat: setActiveChat,
    startCall: (user) =>
      setActiveCall({
        user,
        isCaller: true,
      }),
    receiveCall: (user) =>
      setActiveCall({
        user,
        isCaller: false,
      }),
    closeChat: () => setActiveChat(null),
    closeCall: () => setActiveCall(null),
  };
}
