const BASE_URL = import.meta.env.VITE_IMAGE_URL;
export default function ChatHeader({ user, onClose }) {
  return (
    <div className="flex items-center gap-3 rounded-t-xl bg-green-600 px-4 py-3 text-white">
      <img
        src={`${BASE_URL}/${user.imageName}`}
        alt={user.user_name}
        className="h-10 w-10 rounded-full object-cover"
      />
      <span className="text-2xl font-semibold">{user.user_name}</span>

      <button
        onClick={onClose}
        className="ml-auto cursor-pointer text-2xl opacity-80 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  );
}
