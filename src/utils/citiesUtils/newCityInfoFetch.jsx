// const sendReverseGeoCodeApi = (lat, lng) =>
//   `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;

// export const fetchCityInfo = async ({ request }) => {
//   const url = new URL(request.url);
//   const searchParams = url.searchParams;
//   const lat = searchParams.get('lat');
//   const lng = searchParams.get('lng');
//   console.log(typeof lat, lng);
//   const res = await fetch(sendReverseGeoCodeApi(lat, lng));
//   if (!res.ok) throw new Error('CityData not able to fetch');
//   const data = await res.json();
//   console.log('I am running');
//   return data;
// };

const apiKey = import.meta.env.VITE_REVERSE_GEO_CODE_API_KEY;
const sendReverseGeoCodeApi = (lat, lng) =>
  `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

export const fetchCityInfo = async ({ request }) => {
  const url = new URL(request.url).searchParams;
  const lat = url.get('lat');
  const lng = url.get('lng');
  const res = await fetch(`${sendReverseGeoCodeApi(lat, lng)}`);
  if (!res.ok) throw new Error('reverse geo api is not working');
  const data = await res.json();
  return data;
};
