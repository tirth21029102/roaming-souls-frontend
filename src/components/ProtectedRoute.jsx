import { Outlet, useLoaderData } from 'react-router-dom';
import ForbiddenPag from '../components/ForbiddenPage';

export default function ProtectedRoute() {
  const data = useLoaderData();

  if (data.status === 'failed') return <ForbiddenPag />;
  return <Outlet />;
}
