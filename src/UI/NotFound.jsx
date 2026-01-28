import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-around bg-gradient-to-br from-green-200 via-green-500 to-green-800 px-8 text-white">
      {/* Big Image */}
      <img
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/404/404-computer.svg"
        alt="Lost illustration"
        className="animate-float w-[520px] max-w-full"
      />

      {/* Text */}
      <div className="text-center md:text-left">
        <h1 className="text-7xl font-extrabold text-green-300 drop-shadow-lg md:text-8xl">
          You lost, brother
        </h1>

        <p className="mt-6 max-w-md text-xl text-green-100/80">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-20 rounded-xl bg-green-500 px-8 py-3 text-lg font-semibold text-green-800 transition hover:scale-105 hover:bg-green-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

// @keyframes float {
//   0% {
//     transform: translateY(0);
//   }
//   50% {
//     transform: translateY(-14px);
//   }
//   100% {
//     transform: translateY(0);
//   }
// }
// .animate-float {
//   animation: float 4s ease-in-out infinite;
// }
