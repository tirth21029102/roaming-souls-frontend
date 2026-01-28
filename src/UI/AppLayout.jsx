import SideBar from '../components/SideBar';
import Map from '../components/map/Map';
import { useEffect } from 'react';
import socket from '../socket/socket';
import { registerSocketListeners } from '../socket/listeners';
import { authUser } from '../utils/authUser';

export default function AppLayout() {
  useEffect(() => {
    const init = async () => {
      const res = await authUser();

      if (res.status === 'success') {
        if (!socket.connected) {
          socket.connect();
          registerSocketListeners(socket);
        }
      }
    };

    init();
  }, []);

  return (
    <div className="flex h-full w-full">
      <SideBar />
      <Map />
    </div>
  );
}
