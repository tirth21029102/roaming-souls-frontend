import LoadingSpiinerSmall from '../LoadingSpiinerSmall';
import { useProfileCard } from './useProfileCard';
import ProfileHoverCard from './ProfileHoverCard';
import { useState } from 'react';
const BASE_URL = import.meta.env.VITE_IMAGE_URL;

export default function ProfileCard() {
  const { user, handleLogOutUser } = useProfileCard();
  const [showHover, setShowHover] = useState(false);

  if (!user) return <LoadingSpiinerSmall />;

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white/90 px-5 py-3 shadow-lg ring-1 ring-green-200 backdrop-blur-md">
      {/* Avatar */}
      <div className="relative cursor-pointer">
        <img
          src={`${BASE_URL}/${user.imageName}`}
          alt={user.user_name}
          className="h-11 w-11 rounded-full object-cover ring-2 ring-green-500"
          onMouseEnter={() => setShowHover(true)}
          onMouseLeave={() => setShowHover(false)}
        />
        <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
      </div>

      {/* User Info */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-green-900">
          {user.user_name}
        </span>
        <span className="text-xs text-green-600">Online</span>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogOutUser}
        className="ml-4 cursor-pointer rounded-xl bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-green-700 active:scale-95"
      >
        Logout
      </button>
      {/* HOVER CARD */}
      <ProfileHoverCard
        visible={showHover}
        friendsCount={user.friendsCount}
        visitedCitiesCount={user.visitedCitiesCount}
        currentCity={user.currentCity}
        rank={user.rank}
      />
    </div>
  );
}
