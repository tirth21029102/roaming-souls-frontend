import { useState } from 'react';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_AUTH_URL;

export default function VerifyEmailModal({ email, onClose, onVerified }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) return toast.error('Please enter OTP');

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success('Email verified successfully 🎉');
      onVerified();
    } catch (err) {
      toast.error(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <h2 className="mb-2 text-2xl font-semibold text-green-800">
          Verify your Email
        </h2>
        <p className="mb-6 text-gray-600">
          We’ve sent a verification code to <br />
          <span className="font-medium text-red-400">{email}</span>
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="mb-4 w-full rounded-2xl bg-green-100 px-6 py-3 text-center text-lg tracking-widest text-green-800"
        />

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="w-full rounded-2xl border px-4 py-2 text-green-400 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full rounded-2xl bg-green-700 px-4 py-2 text-white hover:bg-green-600"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </div>
    </div>
  );
}
