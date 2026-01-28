import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchCityInfo } from '../../utils/citiesUtils/fetchCityInfo';
import { formatDate } from '../../utils/formatDate';
import LoadingSpinner from '../LoadingSpiinerSmall';
import ErrorSmallCompo from '../Error/ErrorSmall';

export default function CityInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: cityInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['cityInfo'],
    queryFn: () => fetchCityInfo(id),
    retry: false,
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <ErrorSmallCompo message={error.message} />;
  }
  const finalDetail = cityInfo.result[0];
  return (
    <div className="p-8 text-green-800">
      <span className="tracking-widest text-gray-500 uppercase">City name</span>
      <div className="flex items-center gap-2">
        <span className="">{finalDetail.emoji}</span>
        <span className="font-semibold text-gray-900">
          {finalDetail.cityName}
        </span>
      </div>

      <span className="mt-4 tracking-widest text-gray-500 uppercase">
        You went to {finalDetail.cityName} on
      </span>

      <div className="text-gray-700">{formatDate(finalDetail.date)}</div>

      <span className="mt-4 tracking-widest text-gray-500 uppercase">
        Learn more
      </span>

      <div>
        <Link
          to={`https://en.wikipedia.org/wiki/${finalDetail.cityName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 hover:underline"
        >
          Check out {finalDetail.cityName} on Wikipedia →
        </Link>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer rounded-2xl border border-green-400 px-2 py-1 uppercase duration-200 hover:bg-green-100 hover:text-green-950"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
