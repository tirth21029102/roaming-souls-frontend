import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './cities.slice';
import usersReducer from './user.slice';
import chatReducer from './chat.slice';
import callReducer from './call.slice';
import userTrackingReducer from './user.presence.slice';

const store = configureStore({
  reducer: {
    cities: citiesReducer,
    users: usersReducer,
    messages: chatReducer,
    call: callReducer,
    userTracking: userTrackingReducer,
  },
});

export default store;
