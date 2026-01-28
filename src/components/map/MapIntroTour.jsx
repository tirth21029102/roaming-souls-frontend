import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';

function flyToAsync(map, lat, lng, zoom, options = {}) {
  return new Promise((resolve) => {
    const onMoveEnd = () => {
      map.off('moveend', onMoveEnd);
      resolve();
    };

    map.on('moveend', onMoveEnd);
    map.flyTo([lat, lng], zoom, options);
  });
}

export default function MapIntroTour({ setLatitude, setLongnitude }) {
  const map = useMap();
  const hasRun = useRef(false);

  const users = useSelector((state) => state.userTracking.visibleUsers);

  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  const id = loggedInUser?.id;

  const loggedInUserLatLng = id ? users.find((user) => user.id === id) : null;

  useEffect(() => {
    if (!map || !users?.length || !loggedInUserLatLng) return;
    if (hasRun.current) return;

    hasRun.current = true;

    const runTour = async () => {
      const shuffled = [...users].sort(() => Math.random() - 0.5);
      const introUsers = shuffled.filter(
        (user) => user.id !== loggedInUserLatLng.id,
      );

      // Intro other users
      for (const user of introUsers) {
        await flyToAsync(
          map,
          Number(user.latitude),
          Number(user.longitude),
          6,
          { duration: 1.5 },
        );
      }

      // Final: logged-in user (THIS NOW WORKS)
      await flyToAsync(
        map,
        Number(loggedInUserLatLng.latitude),
        Number(loggedInUserLatLng.longitude),
        8,
        { duration: 2 },
      );

      setLatitude(Number(loggedInUserLatLng.latitude));
      setLongnitude(Number(loggedInUserLatLng.longitude));
    };

    runTour();
  }, [map, users, loggedInUserLatLng, setLatitude, setLongnitude]);

  return null;
}

// export default function MapIntroTour({ setLatitude, setLongnitude }) {
//   const map = useMap();
//   const hasRun = useRef(false);

//   const users = useSelector((state) => state.userTracking.visibleUsers);

//   const { id } = useSelector((state) => state.users.loggedInUser);

//   const loggedInUserLatLng = users.find((user) => user.id === id);

//   useEffect(() => {
//     if (!map || !users?.length || !loggedInUserLatLng) return;
//     if (hasRun.current) return;

//     hasRun.current = true;

//     const runTour = async () => {
//       // shuffle users so it's random
//       const shuffled = [...users].sort(() => Math.random() - 0.5);
//       const newShuffled = shuffled.filter(
//         (user) => loggedInUserLatLng.id !== user.id,
//       );
//       // console.log(newShuffled);
//       // console.log(shuffled);
//       console.log(newShuffled);
//       for (let user of newShuffled) {
//         // console.log(user);
//         map.flyTo([Number(user?.latitude), Number(user?.longitude)], 6, {
//           duration: 1.5,
//         });

//         await wait(1600);
//       }
//       // finally go to logged-in user
//       map.flyTo(
//         [
//           Number(loggedInUserLatLng.latitude),
//           Number(loggedInUserLatLng.longitude),
//         ],
//         8,
//         { duration: 2 },
//       );

//       setLatitude(Number(loggedInUserLatLng.latitude));
//       setLongnitude(Number(loggedInUserLatLng.longitude));
//     };

//     runTour();
//   }, [map, users, loggedInUserLatLng, setLatitude, setLongnitude]);

//   return null;
// }

// function wait(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
