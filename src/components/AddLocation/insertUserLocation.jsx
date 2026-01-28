const BASE_URL = import.meta.env.VITE_LOCATIONS_URL;

export const insertUserLocation = async (city, userId) => {
  const res = await fetch(`${BASE_URL}/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(city),
  });
  if (!res.ok) throw new Error('sorry unable to create city');
};
