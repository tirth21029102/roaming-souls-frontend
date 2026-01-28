import store from '../../store/store';
import { setSelectedCity } from '../../store/cities.slice';
export const fetchCitiesDetialsInfo = (id) => {
  const selectedCity = store
    .getState()
    .cities.cities.find((city) => city.id === +id);
  if (!selectedCity) return null;
  store.dispatch(setSelectedCity(id));
  return {
    lat: selectedCity.lat,
    lng: selectedCity.lng,
  };
};
