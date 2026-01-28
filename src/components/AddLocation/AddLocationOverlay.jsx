import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectCityPrompt,
  setCurrentUserCoordinates,
} from '../../store/user.presence.slice';
import { insertUserLocation } from '../AddLocation/insertUserLocation';
import { toast } from 'react-toastify';

const GEONAMES_URL = 'https://secure.geonames.org/searchJSON';

function useCitySearch(query) {
  return useQuery({
    queryKey: ['citySearch', query],
    queryFn: async () => {
      if (!query) return [];

      const url = new URL(GEONAMES_URL);
      url.search = new URLSearchParams({
        q: query,
        maxRows: '8',
        cities: 'cities15000',
        username: 'sidd_123',
      }).toString();

      const res = await fetch(url.toString());

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      return data.geonames;
    },
    retry: false,
    enabled: !!query,
  });
}

export default function AddLocationOverlay() {
  const [query, setQuery] = useState('');
  const { data, isLoading } = useCitySearch(query);
  const loggedInUserInfo = useSelector((state) => state.users.loggedInUser);
  const dispatch = useDispatch();

  const onSelectCity = async (city) => {
    dispatch(setSelectCityPrompt(false));
    try {
      await insertUserLocation(city, loggedInUserInfo.id);
      toast.success('successfully updated your location... 😁 ');
    } catch (error) {
      toast.error('sorry unable to update your location');
    }
  };
  const onClose = () => dispatch(setSelectCityPrompt(false));

  return (
    <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/40">
      <div className="w-96 rounded-2xl bg-white p-4 shadow-xl">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full rounded-lg border px-3 py-2 text-purple-900 placeholder-gray-400"
        />

        <div className="mt-3 max-h-60 overflow-y-auto">
          {isLoading && <p className="text-sm text-orange-600">Searching...</p>}

          {data?.map((city) => (
            <button
              key={city.geonameId}
              onClick={() => onSelectCity(city)}
              className="flex w-full cursor-pointer justify-between rounded-lg px-2 py-2 hover:bg-gray-100"
            >
              <span className="text-red-400">
                {city.name},{' '}
                <span className="text-sm text-gray-500">
                  {city.countryName}
                </span>
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-3 w-full rounded-lg bg-gray-100 py-2 text-sm text-amber-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
