import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  setAllUserLocations,
  setCurrentUserCoordinates,
  setDisplay,
  setVisibleUsers,
} from '../../store/user.presence.slice';
import { useDispatch, useSelector } from 'react-redux';

const BASE_URL = import.meta.env.VITE_LOCATIONS_URL;

const fetchAllUserLocations = async (dispatch, id) => {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch locations');
  }
  const data = await res.json();

  dispatch(setAllUserLocations(data.data));
  dispatch(setVisibleUsers(data.usersInfoLocations));

  const currentUserLocation = data.data.find(
    (userLocation) => userLocation.user_id === id,
  );

  if (currentUserLocation) {
    dispatch(setCurrentUserCoordinates(currentUserLocation));
    dispatch(setDisplay('location_fullfilled'));
  }

  return data.data;
};

export const useUserLocationsQuery = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  const id = loggedInUser?.id;

  const { data, error, isLoading } = useQuery({
    queryKey: ['userLocationsData'],
    queryFn: () => fetchAllUserLocations(dispatch, id),
    enabled: !!id, // 🔑 CRITICAL
  });
  return { data, error, isLoading };
};
