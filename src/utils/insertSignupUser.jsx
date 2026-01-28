const BASE_URL = import.meta.env.VITE_AUTH_URL;
export const insertSignupUser = async (data) => {
  const formData = new FormData();
  formData.append('image', data.image[0]);
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('password', data.password);
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('user was unable to signup');
  const data1 = await res.json();
  return data1;
};
