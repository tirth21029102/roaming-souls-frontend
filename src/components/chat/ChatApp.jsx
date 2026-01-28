import { useSelector } from 'react-redux';

import ChatIntro from './ChatIntro';
import UsersList from './UsersList';
import ChatWindow from './ChatWindow';
import VideoCall from './VideoCall';

import { useChatUsers } from './hooks/useChatUsers';
import { useChatUI } from './hooks/useChatUI';
import { useEffect, useState } from 'react';

export default function ChatApp() {
  const currentUser = useSelector((state) => state.users.loggedInUser);
  const call = useSelector((state) => state.call);

  const chatUI = useChatUI();
  const { users, isLoading } = useChatUsers(chatUI.viewMode, currentUser?.id);

  return (
    <div className="absolute top-12 right-8 z-999 w-72 rounded-lg bg-green-100 p-4 shadow-md">
      {/* INTRO */}
      {chatUI.viewMode === 'intro' && (
        <ChatIntro
          onShowAll={chatUI.showAll}
          onShowOnlyFriends={chatUI.showFriends}
        />
      )}

      {/* USER LIST */}
      {(chatUI.viewMode === 'all' || chatUI.viewMode === 'friends') && (
        <UsersList
          users={users}
          isLoading={isLoading}
          currentUser={currentUser}
          onBack={chatUI.showIntro}
          onStartChat={chatUI.openChat}
          /* ⬇️ CALL IS DISPATCHED INSIDE UsersList */
        />
      )}

      {/* CHAT */}
      {chatUI.activeChat && (
        <ChatWindow
          user={chatUI.activeChat}
          currentUser={currentUser}
          onClose={chatUI.closeChat}
        />
      )}

      {/* VIDEO CALL (Redux-driven) */}
      {(call.status === 'INCOMING' ||
        call.status === 'OUTGOING' ||
        call.status === 'IN_CALL') && <VideoCall />}
    </div>
  );
}

// import { useChatController } from './hooks/useChatController';
// import { useEffect } from 'react';
// import socket from '../../socket/socket';
// import { SOCKET_EVENTS } from '../../socket/events';
// import store from '../../store/store';
// import { incomingCall } from '../../store/call.slice';

// export default function ChatApp() {
//   const currentUser = useSelector((state) => state.users.loggedInUser);

//   const chat = useChatController();
//   const { users, isLoading } = useChatUsers(chat.viewMode, currentUser?.id);

//   return (
//     <div className="absolute top-12 right-8 z-999 w-72 rounded-lg bg-green-100 p-4 shadow-md">
//       {chat.viewMode === 'intro' && (
//         <ChatIntro
//           onShowAll={chat.showAll}
//           onShowOnlyFriends={chat.showFriends}
//         />
//       )}

//       {(chat.viewMode === 'all' || chat.viewMode === 'friends') && (
//         <UsersList
//           users={users}
//           currentUser={currentUser}
//           onBack={chat.showIntro}
//           onStartChat={chat.startChat}
//           onStartCall={chat.startCall}
//         />
//       )}

//       {chat.activeChat && (
//         <ChatWindow
//           user={chat.activeChat}
//           currentUser={currentUser}
//           onClose={chat.closeChat}
//         />
//       )}

//       {chat.activeCall && (
//         <VideoCall
//           currentUser={currentUser}
//           remoteUser={chat.activeCall.user}
//           isCaller={chat.activeCall.isCaller}
//           onClose={chat.closeCall}
//         />
//       )}
//     </div>
//   );
// }

// import { useSelector } from 'react-redux';
// import { useChatUI } from './useChatUI';
// import { useChatUsers } from './useChatUsers';

// import ChatIntro from './ChatIntro';
// import UsersList from './UsersList';
// import ChatWindow from './ChatWindow';
// import VideoCall from './VideoCall';
