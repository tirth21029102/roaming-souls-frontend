import { useEffect } from 'react';
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import errorImg from '../../assets/error_ambulance.png';
import siren from '../../assets/siren.mp3'; // optional but recommended
import '../../assets/ErrorAmbulance.css';

export default function ErrorAmbulance() {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    toast.error('🚨 Emergency! Something went wrong.', {
      position: 'top-center',
      autoClose: 4000,
      theme: 'colored',
    });

    // play siren once
    const audio = new Audio(siren);
    audio.volume = 0.3;
    audio.play().catch(() => {});

    // auto redirect after 10s
    const timer = setTimeout(() => {
      navigate('/login');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  let title = 'Unexpected Error';
  let message = 'Please try again or navigate safely.';

  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status}`;
    message = error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="error-container">
      {/* flashing lights */}
      <div className="lights">
        <span className="light red" />
        <span className="light blue" />
      </div>

      {/* ambulance animation */}
      <div className="ambulance-road">
        <img src={errorImg} alt="Running ambulance" className="ambulance" />
      </div>

      <h1>{title}</h1>
      <p>{message}</p>

      <div className="actions">
        <button onClick={() => navigate('/')}>🏠 Home</button>
        <button onClick={() => navigate('/app')}>🔁 Retry App</button>
        <button onClick={() => navigate('/login')}>🔐 Login</button>
      </div>

      <small className="redirect-text">
        Redirecting to login in 10 seconds…
      </small>
    </div>
  );
}
