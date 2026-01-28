const BASE_URL = import.meta.env.VITE_CITIES_URL;

export const deleteSelectedCity = async (id) => {
  const userToken = localStorage.getItem('token');
  // try {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    method: 'DELETE',
  });
  if (!res.ok) throw new Error("city can't be deleted");
  const data = await res.json();
  return data;
  // console.log(data);
  // QueryClient.invalidateQueries(['cities']);
};
