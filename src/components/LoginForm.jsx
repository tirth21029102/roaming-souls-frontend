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
    <div className="flex h-full flex-col items-center justify-center gap-10 px-4 py-10 md:h-3/4 md:flex-row md:gap-48 md:px-0 md:py-0">
      <div className="hidden h-full items-center justify-center md:flex md:flex-1">
        <img
          src={loginDoodle}
          className="animate-float h-3/4 w-auto max-w-full"
        />
      </div>
      <div className="flex w-full items-center justify-center md:h-full md:flex-1">
        <form
          className="flex w-full max-w-md flex-col items-center gap-6 rounded-4xl border p-6 text-center md:gap-8 md:p-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="text-xl md:text-5xl">E-mail</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            placeholder="tkr8499@gmail.com"
            className="w-full rounded-2xl bg-green-100 px-4 py-3 text-green-950 md:px-8 md:py-4"
          />
          {errors.email && (
            <span className="text-sm text-red-600 md:text-[1.3rem]">
              {errors.email.message}
            </span>
          )}

          <label className="text-xl md:text-5xl">Password</label>
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
            className="w-full rounded-2xl bg-green-100 px-4 py-3 text-green-950 md:px-8 md:py-4"
          />
          {errors.password && (
            <span className="text-sm text-red-600 md:text-[1.3rem]">
              {errors.password.message}
            </span>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer rounded-2xl bg-green-800 px-4 py-3 duration-150 hover:bg-green-300 hover:text-green-900 md:w-fit md:px-6 md:py-3"
          >
            {isSubmitting ? 'Logging You In...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
