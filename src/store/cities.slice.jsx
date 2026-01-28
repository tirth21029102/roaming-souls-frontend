import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cities: [],
  selectedCityId: '',
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCitiesData(state, action) {
      state.cities = action.payload;
    },
    setSelectedCity(state, action) {
      state.selectedCityId = action.payload;
    },
  },
});

export const { setCitiesData, setSelectedCity } = citySlice.actions;
export default citySlice.reducer;
