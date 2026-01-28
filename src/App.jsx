import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import socket from './socket/socket';
import { registerSocketListeners } from './socket/listeners';

export default function App() {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    registerSocketListeners(socket);

    return () => {
      socket.off();
      socket.disconnect();
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-green-100 p-8">
      <div className="h-full w-full overflow-auto rounded-2xl bg-green-500 text-green-100">
        <Outlet />
      </div>
    </div>
  );
}
