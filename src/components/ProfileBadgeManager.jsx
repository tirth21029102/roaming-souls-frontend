import { useSelector } from 'react-redux';
import ProfileBadge from './ProfileBadge';

export default function ProfileBadgeManager({ setLatitude, setLongnitude }) {
  const users = useSelector((state) => state.userTracking.visibleUsers);
  return (
    <>
      {users.length > 0 &&
        users.map((user) => (
          <ProfileBadge
            key={user.id}
            setLatitude={setLatitude}
            setLongnitude={setLongnitude}
            user={user}
          />
        ))}
    </>
  );
}
