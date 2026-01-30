import { NavLink } from 'react-router-dom';

export default function PageNavLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:justify-between md:gap-8">
      <NavLink
        className="text-green-100 uppercase duration-150 hover:text-yellow-300"
        to="/pricing"
      >
        pricing
      </NavLink>
      <NavLink
        className="text-green-100 uppercase duration-150 hover:text-yellow-300"
        to="/product"
      >
        product
      </NavLink>
      <NavLink
        className="text-green-100 uppercase duration-150 hover:text-yellow-300"
        to="/login"
      >
        login
      </NavLink>
      <NavLink
        className="text-green-100 uppercase duration-150 hover:text-yellow-300"
        to="/signup"
      >
        Signup
      </NavLink>
    </div>
  );
}
