import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCitiesDetialsInfo } from '../../../utils/citiesUtils/fetchCitiesDetialsInfo';

export default function DetectCityFromRoute({ setLatitude, setLongnitude }) {
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const data = fetchCitiesDetialsInfo(id);
    if (!data) return;

    const { lat, lng } = data;
    setLatitude(lat);
    setLongnitude(lng);
  }, [id, setLatitude, setLongnitude]);

  return null;
}
