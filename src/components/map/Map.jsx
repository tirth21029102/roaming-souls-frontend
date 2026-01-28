import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';

import ProfileCard from '../profileCard/ProfileCard';
import ChatApp from '../chat/ChatApp';

import DetectCityFromRoute from './effects/DetectCityFromRoute';
import DetectMapClick from './effects/DetectMapClick';
import CenterMapView from './effects/CenterMapView';
import UserLocationController from './UserLocationController';
import ProfileBadgeManager from '../ProfileBadgeManager';
import MapIntroTour from './MapIntroTour';
import CallConnectionLine from '../callLineMap/CallConnectionLine';

export default function Map() {
  const [latitude, setLatitude] = useState(23.216003721928487);
  const [longnitude, setLongnitude] = useState(72.64572143554689);

  const cities = useSelector((state) => state.cities.cities);
  // const loggedInUserInfo = useSelector((state) => state.users.loggedInUser);

  return (
    <div className="relative h-full w-3/4">
      <MapContainer
        center={[latitude, longnitude]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {cities?.map((city) => (
          <Marker key={city.id} position={[city.lat, city.lng]}>
            <Popup>
              <span className="text-3xl">{city.cityName}</span>
              <span className="text-2xl font-extrabold">{city.emoji}</span>
            </Popup>
          </Marker>
        ))}
        {/* 🔗 Call connection polyline */}
        <CallConnectionLine />

        <ProfileBadgeManager
          setLatitude={setLatitude}
          setLongnitude={setLongnitude}
        />

        <MapIntroTour setLatitude={setLatitude} setLongnitude={setLongnitude} />

        {/* Map side effects */}
        <DetectCityFromRoute
          setLatitude={setLatitude}
          setLongnitude={setLongnitude}
        />
        <DetectMapClick
          setLatitude={setLatitude}
          setLongnitude={setLongnitude}
        />
        <CenterMapView latitude={latitude} longnitude={longnitude} />
      </MapContainer>

      <div className="absolute bottom-8 left-1/2 z-999 -translate-x-1/2">
        <ProfileCard />
      </div>

      <ChatApp />

      <UserLocationController />
    </div>
  );
}
