import React, { useState } from 'react';
import Back from '../../assets/Singlearrow.svg';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { authClient, authResult, signOut } from '../../util/auth';
import { codeSchema, otpErrorMessage, passwordSchema, pendingEmail, PASSWORD_MIN } from '../../util/otp';
import { useCooldown } from '../../hooks/useCooldown';
import PasswordField from '../../components/PasswordField';
import CodeField from '../../components/CodeField';
import ErrorBox from '../../components/ErrorBox';

const userSchema = z
  .object({
    otp: codeSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Your passwords do not match',
    path: ['confirmPassword'],
  });

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  // The email comes from the forgot page through router state (or this tab's sessionStorage after a refresh), never the URL.
  // Read once so clearing the stored copy after a successful reset doesn't trigger the redirect below.
  const [email] = useState(() => location.state?.email ?? pendingEmail.get('reset'));

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(userSchema) });

  const cooldown = useCooldown('reset');
  const [codeError, setCodeError] = useState(null);
  const [notice, setNotice] = useState('');
  const [resending, setResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!email) {
    return <Navigate to="/findYourAccount" replace />;
  }

  const resendCode = async () => {
    if (resending || cooldown.secondsLeft > 0) return;
    setResending(true);
    try {
      const { error } = await authResult(authClient.emailOtp.requestPasswordReset({ email }));
      cooldown.start();
      if (error?.status === 429) {
        setCodeError({ message: 'Too many requests. Please wait a minute and try again.', needsNewCode: codeError?.needsNewCode ?? false });
        return;
      }
      // A new code replaces the old one, so the old error no longer applies
      setCodeError(null);
      resetField('otp');
      setNotice('New code sent. Check your email.');
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setResending(false);
    }
  };

  const onSubmit = async (data) => {
    setNotice('');
    let error;
    try {
      ({ error } = await authResult(authClient.emailOtp.resetPassword({
        email,
        otp: data.otp,
        password: data.password,
      })));
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
      return;
    }

    if (error) {
      setCodeError(otpErrorMessage(error));
      return;
    }

    // Drop any session this browser still has, otherwise /login would bounce straight to /home
    await signOut().catch(() => {});
    pendingEmail.clear('reset');
    cooldown.clear();
    navigate('/login', { replace: true, state: { passwordChanged: true } });
  };

  const codeIsDead = codeError?.needsNewCode ?? false;

  return (
    <div>
      {errorMessage && <ErrorBox errorMessage={errorMessage} onClose={() => setErrorMessage('')} />}
      {/* Back */}
      <div className="m-12">
        <NavLink
          to="/findYourAccount"
          aria-label="Back"
          className="inline-block hover:animate-bounce-left transition-transform duration-200 cursor-pointer"
        >
          <img src={Back} alt="Back" className="h-7 w-7" />
        </NavLink>
      </div>

      {/* Form */}
      <div className="flex flex-col justify-center items-center min-h-screen font-poppins -mt-28 pb-12 px-4">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Reset your Password
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-normal py-3.5 break-words max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[470px]">
            Enter the code we emailed to <span className="font-semibold">{email}</span> and your new password.{' '}
            <NavLink to="/findYourAccount" className="text-royalblue hover:underline whitespace-nowrap">
              Use a different email
            </NavLink>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[470px] flex flex-col items-center transition-all duration-200 ease-in-out transform"
        >
          {/* Lets password managers save the new password against the right account */}
          <input type="email" name="username" autoComplete="username" value={email} readOnly hidden />

          {/* Reset code */}
          <CodeField
            registration={register('otp', { onChange: () => setCodeError(null) })}
            error={errors.otp?.message ?? codeError?.message}
            needsNewCode={codeIsDead}
            notice={notice}
            secondsLeft={cooldown.secondsLeft}
            resending={resending}
            onResend={resendCode}
          />

          <PasswordField
            id="password"
            label="New Password"
            registration={register('password')}
            error={errors.password?.message}
            hint={`At least ${PASSWORD_MIN} characters`}
            placeholder="Password"
          />

          <PasswordField
            id="confirmPassword"
            label="Confirm Password"
            registration={register('confirmPassword')}
            error={errors.confirmPassword?.message}
            placeholder="Confirm Password"
          />

          <div className="mt-[29px] w-full flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting || codeIsDead}
              className="w-[140px] h-[35px] text-xs md:w-[150px] md:h-[40px] md:text-sm lg:w-[180px] lg:h-[40px] lg:text-base rounded-[4px] bg-bluegray font-poppins font-semibold text-white transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer
              disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              {isSubmitting ? 'Saving…' : 'Done'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
