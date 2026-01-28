const BASE_URL = import.meta.env.VITE_USERS_URL;

export const fetchUsers = async (friendsOnly, userId) => {
  const url = `${BASE_URL}${friendsOnly ? `/${userId}/friends` : '/'}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};
