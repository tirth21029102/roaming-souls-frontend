import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'IDLE',
  localUserId: null,
  remoteUserId: null,
  offer: null,
  answer: null,
  isVideoEnabled: true,
  isAudioEnabled: true,
  error: null,
};

const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    /* ================= OUTGOING ================= */
    startOutgoingCall(state, action) {
      state.status = 'OUTGOING';
      state.remoteUserId = action.payload.to;
      state.error = null;
    },

    /* ================= INCOMING ================= */
    incomingCall(state, action) {
      state.status = 'INCOMING';
      state.remoteUserId = action.payload.from;
      state.offer = action.payload.offer;
      state.error = null;
    },

    /* ================= ACCEPT ================= */
    acceptCall(state) {
      if (state.status !== 'INCOMING') return;
      state.status = 'IN_CALL';
    },

    /* ================= ANSWER RECEIVED ================= */
    callAnswered(state, action) {
      if (state.status !== 'OUTGOING') return;
      state.status = 'IN_CALL';
      state.answer = action.payload;
    },

    /* ================= END ================= */
    endCall() {
      return initialState;
    },

    /* ================= FAILURES ================= */
    callRejected() {
      return {
        ...initialState,
        error: 'Call rejected',
      };
    },

    callTimeout() {
      return {
        ...initialState,
        error: 'Call timeout',
      };
    },

    // callError(state, action) {
    //   state.error = action.payload;
    // },
    callError(state, action) {
      return {
        ...initialState,
        error: action.payload,
      };
    },

    /* ================= MEDIA ================= */
    toggleVideo(state) {
      state.isVideoEnabled = !state.isVideoEnabled;
    },

    toggleAudio(state) {
      state.isAudioEnabled = !state.isAudioEnabled;
    },

    // callBusy(state) {
    //   state.error = 'User is busy';
    //   return initialState;
    // },
    callBusy() {
      return {
        ...initialState,
        error: 'User is busy',
      };
    },
  },
});

export const {
  startOutgoingCall,
  incomingCall,
  acceptCall,
  callAnswered,
  endCall,
  callRejected,
  callTimeout,
  callError,
  callBusy,
  toggleVideo,
  toggleAudio,
} = callSlice.actions;

export default callSlice.reducer;
