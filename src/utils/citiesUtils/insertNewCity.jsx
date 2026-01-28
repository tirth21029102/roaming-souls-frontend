const BASE_URL = import.meta.env.VITE_CITIES_URL;

export const insertNewCity = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('city was not created , sorry 😕');
  const msg = await res.json();
  return msg;
};
//data.data2.user_id
