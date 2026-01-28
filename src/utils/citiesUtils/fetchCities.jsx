// import store from '../store/store';
// import { setCitiesData } from '../store/citiesSlice';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_CITIES_URL;

export const fetchCities = async (id) => {
  const toastId = toast('Submitting form...');
  const res = await fetch(`${BASE_URL}/user/${id}`);

  if (!res.ok) {
    toast.update(toastId, {
      render: 'sorry cities were unable to load',
      type: 'error',
      autoClose: 2000,
      isLoading: false,
    });
    throw new Error('Failed to fetch cities');
  }
  const { data } = await res.json();
  toast.update(toastId, {
    render: 'fresh cities list were loaded',
    type: 'success',
    autoClose: 2000,
    isLoading: false,
  });
  return data;
};
