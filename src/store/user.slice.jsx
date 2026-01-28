import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  loggedInUser: null,
  loggedInUserCoords: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUser(state) {
      state.isAuthenticated = true;
    },
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
    clearUser(state) {
      state.loggedInUser = null;
    },
    setLoggedInUserCoords(state, action) {
      state.loggedInUserCoords = [action.payload.lat, action.payload.lng];
    },
  },
});

export const {
  setAuthUser,
  setLoggedInUser,
  clearUser,
  setLoggedInUserCoords,
} = userSlice.actions;
export default userSlice.reducer;
