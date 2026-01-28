import { NavLink, Outlet, useNavigation } from 'react-router-dom';
import TravelText from './TravelText';
import LoadingSpinner from './LoadingSpiinerSmall';

export default function SideBar() {
  const { state } = useNavigation();
  return (
    <div className="grid h-full w-1/4 grid-cols-1 grid-rows-[auto_auto_1fr_auto] place-items-center gap-12 overflow-auto p-8">
      <TravelText type="sidebar" />
      <div className="flex justify-center gap-8 rounded-2xl bg-amber-400 p-4">
        <NavLink className="uppercase hover:text-green-800" to="cities">
          cities
        </NavLink>
        <NavLink
          className="sidebar uppercase hover:text-green-800"
          to="countries"
        >
          countries
        </NavLink>
      </div>
      <div className="h-full w-11/12 rounded-2xl bg-green-300">
        {state === 'loading' || state === 'submitting' ? (
          <LoadingSpinner />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}
