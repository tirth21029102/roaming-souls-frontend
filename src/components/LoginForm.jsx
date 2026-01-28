import { useRef, useState } from 'react';
import loginDoodle from '../assets/loginFormDoodle.svg';
import { useForm } from 'react-hook-form';
import { handleLoginReq } from '../utils/handleLoginReq';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../store/user.slice';
import { handlePasswordInput } from '../utils/handleHidePwd';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const hideTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      // isDirty, isValid
    },
    reset,
  } = useForm({
    defaultValues: {
      username: 'tirth',
      email: 'tirth@gmail.com',
      password: 'Tirth@123',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading('Submitting form...');

    try {
      const resultObj = await handleLoginReq(data);

      if (!resultObj.success) {
        toast.update(toastId, {
          render: resultObj.message || 'Login failed',
          type: 'error',
          isLoading: false,
          autoClose: 2000,
        });
        reset();
        return;
      }

      toast.update(toastId, {
        render: resultObj.message || 'Login done successfully',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
      reset();
      dispatch(setAuthUser());

      navigate('/app');
    } catch {
      toast.update(toastId, {
        render: 'Unexpected error occurred',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  // reset(); // clears formreset(); // clears form
  // reset({ username: 'newUser' }); // reset with values

  return (
    <div className="flex h-3/4 justify-center gap-48">
      <div className="flex h-full items-center justify-center">
        <img src={loginDoodle} className="animate-float h-3/4" />
      </div>
      <div className="flex h-full items-center justify-center">
        <form
          className="flex flex-col items-center gap-8 rounded-4xl border p-12 text-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* <label className="text-5xl">Your Name</label>
          <input
            {...register('username', {
              required: 'UserName is required',
            })}
            className="rounded-2xl bg-green-100 px-8 py-4 text-green-950"
          />
          {errors.username && (
            <span className="text-[1.3rem] text-red-600">
              {errors.username.message}
            </span>
          )} */}
          <label className="text-5xl">E-mail</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            placeholder="tkr8499@gmail.com"
            className="rounded-2xl bg-green-100 px-8 py-4 text-green-950"
          />
          {errors.email && (
            <span className="text-[1.3rem] text-red-600">
              {errors.email.message}
            </span>
          )}

          <label className="text-5xl">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'password is required 🫗',
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'enter strong password 🔒',
              },
            })}
            onInput={(e) =>
              handlePasswordInput(e, hideTimeoutRef, setShowPassword)
            }
            className="rounded-2xl bg-green-100 px-8 py-4 text-green-950"
          />
          {errors.password && (
            <span className="text-[1.3rem] text-red-600">
              {errors.password.message}
            </span>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-fit cursor-pointer rounded-2xl bg-green-800 px-4 py-2 duration-150 hover:bg-green-300 hover:text-green-900"
          >
            {isSubmitting ? 'Logging You In...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
