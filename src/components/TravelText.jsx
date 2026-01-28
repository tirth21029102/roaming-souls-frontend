// import { Link } from 'react-router-dom';

// export default function TravelText() {
//   return (
//     <h1 className="flex items-center justify-center gap-1 text-5xl font-bold">
//       <div className="h-fit rounded-2xl bg-gray-50 p-4">
//         <Link to="/app">
//           <span className="text-purple-400">M</span>
//           <span className="text-pink-400">y</span>
//           <span className="text-gray-300"> </span>
//           <span className="text-indigo-400">T</span>
//           <span className="text-blue-400">r</span>
//           <span className="text-emerald-400">a</span>
//           <span className="text-teal-400">v</span>
//           <span className="text-cyan-400">e</span>
//           <span className="text-sky-400">l</span>
//           <span className="text-gray-300"> </span>
//           <span className="text-rose-400">L</span>
//           <span className="text-fuchsia-400">i</span>
//           <span className="text-purple-400">s</span>
//           <span className="text-indigo-400">t</span>
//         </Link>
//       </div>
//     </h1>
//   );
// }

import { Link } from 'react-router-dom';

const letters = [
  { char: 'M', color: 'text-purple-400' },
  { char: 'y', color: 'text-pink-400' },
  { char: ' ', color: 'text-gray-300' },
  { char: 'T', color: 'text-indigo-400' },
  { char: 'r', color: 'text-blue-400' },
  { char: 'a', color: 'text-emerald-400' },
  { char: 'v', color: 'text-teal-400' },
  { char: 'e', color: 'text-cyan-400' },
  { char: 'l', color: 'text-sky-400' },
  { char: ' ', color: 'text-gray-300' },
  { char: 'L', color: 'text-rose-400' },
  { char: 'i', color: 'text-fuchsia-400' },
  { char: 's', color: 'text-purple-400' },
  { char: 't', color: 'text-indigo-400' },
  { char: '🗺️', color: 'text-gray-400' },
];

export default function TravelText({ type = 'default' }) {
  return (
    <h1 className="flex items-center justify-center text-5xl font-bold">
      <div className="rounded-2xl bg-gray-50 p-4">
        <Link
          to={type === 'default' ? '/app' : '/'}
          className="group flex gap-[2px]"
        >
          {letters.map((l, i) => (
            <span
              key={i}
              className={`inline-block ${l.color} transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1 hover:scale-125 hover:rotate-180`}
            >
              {l.char}
            </span>
          ))}
        </Link>
      </div>
    </h1>
  );
}
