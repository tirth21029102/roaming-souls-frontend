import { Link } from 'react-router-dom';

export default function HomePageContent() {
  return (
    <div className="mx-30 flex h-3/4 flex-col items-center justify-center gap-10 text-center">
      <span className="text-8xl font-bold">
        The world is meant to be remembered.
      </span>

      <span className="text-8xl font-bold text-green-700">
        Roam it. Pin it. Relive it.
      </span>

      <span className="max-w-5xl text-4xl text-green-200">
        <span className="font-semibold">Roamly</span> is a living map for
        roaming souls. Pin the cities you’ve wandered, write notes that time
        can’t erase, upload photos that hold your memories, and connect with
        travelers who understand the call of the road.
      </span>

      <div className="flex gap-6">
        <Link
          className="rounded-2xl bg-green-800 px-8 py-4 text-xl font-semibold tracking-wide uppercase duration-150 hover:bg-green-200 hover:text-green-900"
          to="/app"
        >
          Start your journey
        </Link>

        <Link
          className="rounded-2xl border border-green-700 px-8 py-4 text-xl font-semibold tracking-wide text-green-700 uppercase duration-150 hover:bg-green-700 hover:text-white"
          to="/about"
        >
          Meet roaming souls
        </Link>
      </div>
    </div> // it's great
  );
}
