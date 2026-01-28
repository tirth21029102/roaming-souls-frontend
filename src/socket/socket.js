import { io } from 'socket.io-client';
const BASE_URL = import.meta.env.VITE_IMAGE_URL;

const socket = io(`${BASE_URL}`, {
  withCredentials: true,
  autoConnect: false,
});

export default socket;
