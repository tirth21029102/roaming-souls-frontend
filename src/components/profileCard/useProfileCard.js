import { toast } from 'react-toastify';
import { logoutHelper } from '../../utils/logoutUser';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../socket/socket';
import { clearUser } from '../../store/user.slice';

export function useProfileCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.loggedInUser);

  const handleLogOutUser = async () => {
    const toastId = toast.loading('Please wait 🫷 logging out user');

    try {
      await logoutHelper();
      socket.off();
      socket.disconnect();
      dispatch(clearUser());

      toast.update(toastId, {
        render: 'User logged out successfully 🤗',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });

      navigate('/');
    } catch {
      toast.update(toastId, {
        render: 'Sorry, unable to logout ☹️',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return {
    user,
    handleLogOutUser,
  };
}
