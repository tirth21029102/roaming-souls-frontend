import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    messageReceived(state, action) {
      const exists = state.messages.some((m) => m.id === action.payload.id);
      if (!exists) {
        state.messages.push(action.payload);
      }
    },
    clearChat(state) {
      state.messages = [];
    },
  },
});

export const { messageReceived, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
