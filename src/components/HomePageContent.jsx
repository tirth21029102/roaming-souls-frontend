import { Link } from 'react-router-dom';

export default function HomePageContent() {
  return (
    <div className="mx-4 flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center md:mx-30 md:h-3/4 md:gap-10">
      <span className="text-4xl font-bold md:text-8xl">
        The world is meant to be remembered.
      </span>

      <span className="text-4xl font-bold text-green-700 md:text-8xl">
        Roam it. Pin it. Relive it.
      </span>

      <span className="max-w-5xl text-lg text-green-200 md:text-4xl">
        <span className="font-semibold">Roamly</span> is a living map for
        roaming souls. Pin the cities you’ve wandered, write notes that time
        can’t erase, upload photos that hold your memories, and connect with
        travelers who understand the call of the road.
      </span>

      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <Link
          className="rounded-2xl bg-green-800 px-6 py-3 text-base font-semibold tracking-wide uppercase duration-150 hover:bg-green-200 hover:text-green-900 md:px-8 md:py-4 md:text-xl"
          to="/app"
        >
          Start your journey
        </Link>

        <button
          className="cursor-not-allowed rounded-2xl border border-green-700 px-6 py-3 text-base font-semibold tracking-wide text-green-700 uppercase duration-150 hover:bg-green-700 hover:text-white md:px-8 md:py-4 md:text-xl"
          // to="/about"
          disabled
          // pointer-events:none
        >
          Meet roaming souls
        </button>
      </div>
    </div> // it's great
  );
}
