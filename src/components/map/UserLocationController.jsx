import { useSelector } from 'react-redux';
import AddLocationButton from '../AddLocation/AddLocationButton';
import AddLocationOverlay from '../AddLocation/AddLocationOverlay';
import { useUserLocationsQuery } from './useUserLocationsQuery';

export default function UserLocationController() {
  const loggedInUserInfo = useSelector((state) => state.users.loggedInUser);

  const { selectCityPrompt } = useSelector((state) => state.userTracking);

  const { data, error } = useUserLocationsQuery();

  return (
    <>
      <AddLocationButton loggedInUserInfo={loggedInUserInfo} />
      {selectCityPrompt && <AddLocationOverlay />}
    </>
  );
}
