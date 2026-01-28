export default function ErrorSmallCompo({ message = 'Something went wrong' }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-500 text-red-500">
        <span className="text-xl font-bold">!</span>
      </div>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
}
