import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allUserLocations: [],
  currentUserCoordinates: null,
  viewMode: 'location_missing', //  location_missing | location_fullfilled
  selectCityPrompt: false,
  visibleUsers: [],
};

const userTrackingSlice = createSlice({
  name: 'userTracking',
  initialState,
  reducers: {
    setAllUserLocations(state, action) {
      state.allUserLocations = action.payload;
    },
    setCurrentUserCoordinates(state, action) {
      state.currentUserCoordinates = action.payload;
    },
    setDisplay(state, action) {
      state.viewMode = action.payload;
    },
    setSelectCityPrompt(state, action) {
      state.selectCityPrompt = action.payload;
    },
    setVisibleUsers(state, action) {
      state.visibleUsers = action.payload;
    },
  },
});

export const {
  setAllUserLocations,
  setCurrentUserCoordinates,
  setDisplay,
  setSelectCityPrompt,
  setVisibleUsers,
} = userTrackingSlice.actions;
export default userTrackingSlice.reducer;
