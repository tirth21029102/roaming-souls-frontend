import { createAvatarIcon } from './map/icons/createAvatarIcon';
import { Marker, Popup } from 'react-leaflet';

export default function ProfileBadge({ user }) {
  return (
    <Marker
      position={[Number(user.latitude), Number(user.longitude)]}
      icon={createAvatarIcon(
        `${import.meta.env.VITE_IMAGE_URL}/${user.imageName}`,
      )}
    >
      <Popup>
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-semibold">{user.user_name}</span>
          <span className="font-semibold">{user.email}</span>
          <span className="text-sm text-gray-500">{user.cityName}</span>
        </div>
      </Popup>
    </Marker>
  );
}
