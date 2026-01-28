import socket from './socket';
import { SOCKET_EVENTS } from './events';

export const sendMessage = (message, conversationId) => {
  socket.emit(SOCKET_EVENTS.SEND_MESSAGE, { conversationId, message });
};

export const joinConversation = (conversationId) => {
  socket.emit(SOCKET_EVENTS.JOIN_CONVERSATION, conversationId);
};

/* ================= CALLS ================= */
export const emitCallOffer = (to, offer) => {
  socket.emit(SOCKET_EVENTS.CALL_OFFER, { to, offer });
};

export const emitCallAnswer = (to, answer) => {
  socket.emit(SOCKET_EVENTS.CALL_ANSWER, { to, answer });
};

export const emitCallReject = (to) => {
  socket.emit(SOCKET_EVENTS.CALL_REJECTED, { to });
};

export const emitCallEnd = () => {
  socket.emit(SOCKET_EVENTS.CALL_ENDED);
};

export const emitIceCandidate = (to, candidate) => {
  socket.emit(SOCKET_EVENTS.ICE_CANDIDATE, { to, candidate });
};

export const emitCallError = (to, message) => {
  socket.emit(SOCKET_EVENTS.CALL_MEDIA_ERROR, {
    to,
    message,
  });
};
