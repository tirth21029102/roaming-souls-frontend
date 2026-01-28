const BASE_URL = import.meta.env.VITE_LOCATIONS_URL;

export const fetchUserLocaFromDb = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('user location is unable to get');
  const data = await res.json();
  return data;
};
