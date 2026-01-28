const BASE_URL = import.meta.env.VITE_CITIES_URL;

export const fetchCityInfo = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("sorry such city doesn't exist");
  const data = await res.json();
  return data;
};
