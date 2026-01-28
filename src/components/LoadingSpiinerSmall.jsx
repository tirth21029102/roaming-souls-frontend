export default function LoadingSpinner() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-900 border-t-transparent" />
    </div>
  );
}
