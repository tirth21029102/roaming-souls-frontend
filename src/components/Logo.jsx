import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.jpg';
import TravelText from './TravelText';

// export default function Logo() {
//   return (
//     <div className="h-16 overflow-hidden rounded-2xl md:h-full">
//       <Link to="/">
//         <img
//           src={logoImg}
//           className="my-auto flex h-full items-center justify-center duration-200 hover:scale-115"
//         />
//       </Link>
//       <TravelText />
//     </div>
//   );
// }
// export default function Logo() {
//   return (
//     <div className="flex h-24 items-center overflow-hidden rounded-2xl md:h-20">
//       <Link to="/" className="block h-full">
//         <img
//           src={logoImg}
//           alt="Logo"
//           className="h-full w-auto object-contain transition-transform duration-200 hover:scale-105"
//         />
//       </Link>
//     </div>
//   );
// }
export default function Logo() {
  return (
    <div className="flex h-24 items-center overflow-hidden rounded-2xl md:h-32">
      <Link to="/" className="block h-full">
        <img
          src={logoImg}
          alt="Logo"
          className="h-full w-auto object-contain transition-transform duration-200 hover:scale-105"
        />
      </Link>
    </div>
  );
}
