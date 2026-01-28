import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCities } from '../../utils/citiesUtils/fetchCities';
import { formatDate } from '../../utils/formatDate';
import LoadingSpinner from '../LoadingSpiinerSmall';
import ErrorSmallCompo from '../Error/ErrorSmall';
import { useDispatch, useSelector } from 'react-redux';
import { setCitiesData } from '../../store/cities.slice';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { deleteSelectedCity } from '../../utils/citiesUtils/deleteSelectedCity';

export default function Cities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.users.loggedInUser);
  const {
    data: cities,
    isLoading,
    isError,
    // isFetching,
    // isSuccess,
    error,
  } = useQuery({
    queryKey: ['cities'],
    queryFn: () => fetchCities(user.id),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 60 * 5 * 1000,
    refetchOnMount: 'always',
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSelectedCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });

  useEffect(() => {
    dispatch(setCitiesData(cities));
  }, [cities, dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <ErrorSmallCompo message={error.message} />;
  }

  return (
    <ul className="flex flex-col gap-8 p-4">
      {cities.length === 0 ? (
        <div>
          <h1 className="text-center text-green-800">Add Your First City</h1>
        </div>
      ) : (
        cities.map((city) => (
          <li
            key={city.id}
            className="flex items-center justify-between rounded-xl bg-white px-4 py-2 text-xl text-green-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            onClick={() => navigate(`${city.id}`)}
          >
            <span className="p-1">{city.emoji}</span>
            <span className="p-1">{city.cityName}</span>
            <span className="p-1">{`( ${formatDate(city.date)} )`}</span>
            <span className="p-1">
              <button
                className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-100 hover:text-red-800 hover:ring-1"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMutation.mutate(city.id);
                }}
              >
                &times;
              </button>
            </span>
          </li>
        ))
      )}
    </ul>
  );
}
