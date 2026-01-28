import { useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();
  return (
    <div className="m-auto flex h-full w-fit flex-col items-center justify-center rounded-4xl bg-green-400 p-12 text-4xl text-white">
      <p>
        error statusCode : <span className="text-red-600">{error.status}</span>
      </p>
      <p>
        error status Text :{' '}
        <span className="text-red-600">{error.statusText}</span>
      </p>
      <p>
        error Data : <span className="text-red-600">{error.data}</span>
      </p>
    </div>
  );
}
