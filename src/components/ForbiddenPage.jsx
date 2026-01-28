import { Link, useNavigate } from 'react-router-dom';
import forImg from '../assets/forbidenImg.webp';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ForbiddenPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const toastId = toast.loading(
      'In 10 seconds, you will be redirected to login page.',
    );

    const timerId = setTimeout(() => {
      toast.update(toastId, {
        render: 'Navigating you to login page',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
      navigate('/login');
    }, 10000);

    // 🔴 Cleanup on unmount
    return () => {
      clearTimeout(timerId); // remove timer
      toast.dismiss(); // dismiss all toasts
    };
  }, [navigate]); // ✅ dependency array

  return (
    <div className="flex h-full items-center justify-center gap-12 bg-green-500">
      <img src={forImg} className="animate-float h-full" />
      <div className="flex flex-col gap-12">
        <Link
          className="rounded-2xl bg-green-950 px-4 py-2 text-green-200 duration-300 hover:bg-green-200 hover:text-green-950"
          to="/"
        >
          Home
        </Link>
        <Link
          className="rounded-2xl bg-green-950 px-4 py-2 text-green-200 duration-300 hover:bg-green-200 hover:text-green-950"
          to="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
