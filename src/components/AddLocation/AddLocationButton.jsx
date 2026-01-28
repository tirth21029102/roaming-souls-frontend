import { useDispatch, useSelector } from 'react-redux';
import { setSelectCityPrompt } from '../../store/user.presence.slice';

export default function AddLocationButton() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  const user_name = loggedInUser?.user_name;
  const { viewMode } = useSelector((state) => state.userTracking);
  const handleLocationButtonOnClick = () => {
    dispatch(setSelectCityPrompt(true));
  };

  return (
    <button
      onClick={handleLocationButtonOnClick}
      className="absolute right-12 bottom-12 z-999 cursor-pointer rounded-full bg-black/80 px-4 py-2 text-sm text-white shadow-md"
    >
      📍 {viewMode === 'location_missing' && <span>Add your location </span>}
      {viewMode === 'location_fullfilled' && (
        <span>Want to update your location ? </span>
      )}
      <span className="text-red-300 uppercase">{user_name || ''}</span>
    </button>
  );
}
