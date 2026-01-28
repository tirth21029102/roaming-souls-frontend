// export default function Countries() {
//   return <h1>hello from Countries componenet</h1>;
// }

import { useSelector } from 'react-redux';

export default function Countries() {
  const citiesData = useSelector((state) => state.cities.cities);
  if (citiesData.length === 0)
    return (
      <h1 className="text-center text-red-400">
        Sorry, No Countries to show ⛳
      </h1>
    );
  return (
    <div className="p-12">
      {citiesData
        .reduce((acc, currCityObj) => {
          if (
            !acc.find(
              (currCountry) => currCountry.country === currCityObj.country,
            )
          )
            acc.push({
              country: currCityObj.country,
              code: currCityObj.emoji,
            });
          return acc;
        }, [])
        .map((countryCode) => (
          <div
            className="mb-4 flex items-center justify-between gap-2 rounded-2xl bg-green-950 p-4 text-[1.2rem] shadow-md transition-shadow hover:shadow-lg"
            key={countryCode.country}
          >
            <span>{countryCode.code}</span>
            <span>{countryCode.country}</span>
          </div>
        ))}
    </div>
  );
}
