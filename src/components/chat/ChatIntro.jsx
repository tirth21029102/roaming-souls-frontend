export default function ChatIntro({ onShowAll, onShowOnlyFriends }) {
  return (
    <p className="text-xl text-green-800">
      Want to connect with other <strong>Roaming Souls</strong> like you?
      <span className="flex gap-4">
        <button
          onClick={onShowAll}
          className="mt-3 block w-full cursor-pointer rounded-md bg-green-600 py-2 text-white hover:bg-green-700"
        >
          View All
        </button>
        <button
          onClick={onShowOnlyFriends}
          className="mt-3 block w-full cursor-pointer rounded-md bg-green-600 py-2 text-white hover:bg-green-700"
        >
          View Friends
        </button>
      </span>
    </p>
  );
}
