const BASE_URL = import.meta.env.VITE_AUTH_URL;

export const logoutHelper = async () => {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('sorry , we are unable to logout the user');
  const data = await res.json();
  return data;
};
