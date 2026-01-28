// export default function UserItem({ user, onStartChat, onStartCall }) {
//   return (
//     <li className="animate-fadeIn flex items-center gap-3 rounded-md bg-green-200 p-2">
//       <img
//         src={`http://localhost:9000/${user.imageName}`}
//         alt={user.user_name}
//         className="h-8 w-8 rounded-full object-cover"
//       />
//       <span className="text-sm text-green-900">{user.user_name}</span>
//       <button
//         className="ml-auto flex cursor-pointer rounded-2xl bg-green-900 p-1 text-sm text-green-200"
//         onClick={() => onStartCall(user)}
//       >
//         Call
//       </button>
//       <button
//         className="ml-auto flex cursor-pointer rounded-2xl bg-green-900 p-1 text-sm text-green-200"
//         onClick={() => onStartChat(user)}
//       >
//         Message
//       </button>
//     </li>
//   );
// }
const BASE_URL = import.meta.env.VITE_IMAGE_URL;

import { useDispatch } from 'react-redux';
import { startOutgoingCall } from '../../store/call.slice';

export default function UserItem({ user, onStartChat }) {
  const dispatch = useDispatch();
  return (
    <li className="animate-fadeIn flex items-center gap-3 rounded-md bg-green-200 p-2">
      <img
        src={`${BASE_URL}/${user.imageName}`}
        alt={user.user_name}
        className="h-8 w-8 rounded-full object-cover"
      />

      <span className="text-sm text-green-900">{user.user_name}</span>

      {/* CALL */}
      <button
        className="ml-auto cursor-pointer rounded-2xl bg-green-900 px-2 py-1 text-sm text-green-200"
        onClick={() => dispatch(startOutgoingCall({ to: user.id }))}
      >
        Call
      </button>

      {/* CHAT */}
      <button
        className="cursor-pointer rounded-2xl bg-green-900 px-2 py-1 text-sm text-green-200"
        onClick={() => onStartChat(user)}
      >
        Message
      </button>
    </li>
  );
}
