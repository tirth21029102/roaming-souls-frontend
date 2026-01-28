import { useMap } from 'react-leaflet';

export default function CenterMapView({ latitude, longnitude }) {
  const map = useMap();

  if (!latitude || !longnitude) return null;

  map.setView([latitude, longnitude], 6);

  return null;
}
