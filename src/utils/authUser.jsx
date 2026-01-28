const BASE_URL = import.meta.env.VITE_AUTH_URL;
import store from '../store/store';
import { setLoggedInUser } from '../store/user.slice';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

// export const authUser = async () => {
//   const isAuthenticated = store.getState().users.isAuthenticated;
//   if (isAuthenticated) return { status: 'success' };
//   const userToken = localStorage.getItem('token');
//   if (!userToken) return { status: 'failed' };
//   const res = await fetch(`${BASE_URL}/checkUser`, {
//     headers: {
//       Authorization: `Bearer ${userToken}`,
//     },
//   });
//   if (!res.ok) return { status: 'failed' };
//   const { message } = await res.json();
//   if (message === 'valid_token') return { status: 'success' };
//   return { status: 'failed' };
// };

// {
//   message: 'valid_token';
// }
// {
//   message: 'invalid_token';
// }

// export const authUser = async () => {
//   const isAuthenticated = store.getState().users.isAuthenticated;
//   if (isAuthenticated) return { status: 'success' };

//   try {
//     const res = await fetch(`${BASE_URL}/checkUser`, {
//       credentials: 'include',
//     });

//     if (!res.ok) return { status: 'failed' };

//     const user = await res.json();

//     // store.dispatch(setUser(user));
//     return { status: 'success' };
//   } catch {
//     return { status: 'failed' };
//   }
// };

export const authUser = async () => {
  // const { isAuthenticated } = store.getState().users;
  // if (isAuthenticated) return { status: 'success' };

  try {
    let res = await fetch(`${BASE_URL}/me`, {
      credentials: 'include',
    });

    if (res.status === 401) {
      toast.success('Session expired. Refreshing…');
      const refreshRes = await fetch(`${BASE_URL}/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!refreshRes.ok) {
        return { status: 'failed' };
      }

      // Retry original request
      res = await fetch(`${BASE_URL}/me`, {
        credentials: 'include',
      });
    }

    if (!res.ok) return { status: 'failed' };

    const result = await res.json();
    store.dispatch(setLoggedInUser(result.data.user));

    return { status: 'success' };
  } catch {
    return { status: 'failed' };
  }
};
