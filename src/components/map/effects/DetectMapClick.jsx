import { useNavigate } from 'react-router-dom';
import { useMapEvents } from 'react-leaflet';

export default function DetectMapClick({ setLatitude, setLongnitude }) {
  const navigate = useNavigate();

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setLatitude(lat);
      setLongnitude(lng);

      navigate(`form?lat=${lat}&lng=${lng}`, { replace: true });
    },
  });

  return null;
}
