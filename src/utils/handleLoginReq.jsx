const BASE_URL = import.meta.env.VITE_AUTH_URL;
import store from '../store/store';
import { setLoggedInUser } from '../store/user.slice';

export const handleLoginReq = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || 'Login failed');
    }

    store.dispatch(setLoggedInUser(result.data.user));

    return {
      success: true,
      message: 'Login successful',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || 'Something went wrong',
    };
  }
};
