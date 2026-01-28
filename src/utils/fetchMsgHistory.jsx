const BASE_URL = import.meta.env.VITE_CONVERSATIONS_URL;

export const fetchMsgHistory = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/messages`, {
    credentials: 'include',
  });

  if (!res.ok) throw new Error('unable to fetch messages');

  const data = await res.json();
  return data.data.rows; // JUST return data
};
