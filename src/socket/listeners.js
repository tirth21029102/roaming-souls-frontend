import { SOCKET_EVENTS } from './events';
import store from '../store/store';
import { messageReceived } from '../store/chat.slice';
import {
  incomingCall,
  callAnswered,
  callRejected,
  callTimeout,
  endCall,
  callError,
  callBusy,
} from '../store/call.slice';

export const registerSocketListeners = (socket) => {
  socket.off(SOCKET_EVENTS.CONNECT);
  socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE);

  socket.off(SOCKET_EVENTS.CALL_OFFER);
  socket.off(SOCKET_EVENTS.CALL_ANSWER);
  socket.off(SOCKET_EVENTS.CALL_REJECTED);
  socket.off(SOCKET_EVENTS.CALL_TIMEOUT);
  socket.off(SOCKET_EVENTS.CALL_ENDED);
  socket.off(SOCKET_EVENTS.CALL_ERROR);
  socket.off(SOCKET_EVENTS.CALL_BUSY);

  socket.on(SOCKET_EVENTS.CONNECT, () => {
    console.log('🟢 Socket connected:', socket.id);
  });

  /* ================= CHAT ================= */
  socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, (data) => {
    store.dispatch(messageReceived(data));
  });

  /* ================= CALLS ================= */
  socket.on(SOCKET_EVENTS.CALL_OFFER, ({ from, offer }) => {
    store.dispatch(incomingCall({ from, offer }));
  });

  socket.on(SOCKET_EVENTS.CALL_ANSWER, ({ answer }) => {
    store.dispatch(callAnswered(answer));
  });

  socket.on(SOCKET_EVENTS.CALL_REJECTED, () => {
    store.dispatch(callRejected());
  });

  socket.on(SOCKET_EVENTS.CALL_TIMEOUT, () => {
    store.dispatch(callTimeout());
  });

  socket.on(SOCKET_EVENTS.CALL_ENDED, () => {
    store.dispatch(endCall());
  });

  socket.on(SOCKET_EVENTS.CALL_BUSY, () => {
    store.dispatch(callBusy());
  });

  socket.on(SOCKET_EVENTS.CALL_ERROR, (message) => {
    store.dispatch(callError(message));
  });
};

// Socket listens globally → forwards to active call only.
