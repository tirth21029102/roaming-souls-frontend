import UserItem from './UserItem';

export default function UsersList({ users, currentUser, onBack, onStartChat }) {
  return (
    <ul className="max-h-64 space-y-2 overflow-y-auto">
      {users &&
        users.length > 0 &&
        users
          .filter((user) => user.id !== currentUser.id)
          .map((user) => (
            <UserItem key={user.id} user={user} onStartChat={onStartChat} />
          ))}

      <button
        onClick={onBack}
        className="mt-2 w-full cursor-pointer text-xs text-green-700 underline"
      >
        Back
      </button>
    </ul>
  );
}
