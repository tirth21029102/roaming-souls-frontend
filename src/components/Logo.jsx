import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.jpg';
import TravelText from './TravelText';

export default function Logo() {
  return (
    <div className="h-full overflow-hidden rounded-2xl">
      <Link to="/">
        <img
          src={logoImg}
          className="my-auto flex h-full items-center justify-center duration-200 hover:scale-115"
        />
      </Link>
      <TravelText />
    </div>
  );
}
