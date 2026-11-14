import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Back from '../assets/Singlearrow.svg';
import { authClient, authResult } from '../util/auth';
import { codeSchema, otpErrorMessage } from '../util/otp';
import { useCooldown } from '../hooks/useCooldown';
import CodeField from './CodeField';

const codeFormSchema = z.object({ otp: codeSchema });

// "Verify your email" step shown after sign-up (or sign-in) when Neon Auth requires a verified email.
// It only appears once email verification is turned on in Neon.
function VerifyEmailStep({ email, onVerified, onBack }) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(codeFormSchema) });

  const cooldown = useCooldown('verify');
  const [codeError, setCodeError] = useState(null);
  const [notice, setNotice] = useState('');
  const [resending, setResending] = useState(false);

  const resendCode = async () => {
    if (resending || cooldown.secondsLeft > 0) return;
    setResending(true);
    try {
      const { error } = await authResult(authClient.emailOtp.sendVerificationOtp({ email, type: 'email-verification' }));
      cooldown.start();
      if (error) {
        setCodeError({ ...otpErrorMessage(error), needsNewCode: codeError?.needsNewCode ?? false });
        return;
      }
      setCodeError(null);
      resetField('otp');
      setNotice('New code sent. Check your email.');
    } catch {
      setCodeError({ message: "Couldn't reach the server. Check your connection and try again.", needsNewCode: codeError?.needsNewCode ?? false });
    } finally {
      setResending(false);
    }
  };

  const onSubmit = async ({ otp }) => {
    setNotice('');
    try {
      const { error } = await authResult(authClient.emailOtp.verifyEmail({ email, otp }));
      if (error) {
        setCodeError(otpErrorMessage(error));
        return;
      }
      await onVerified();
    } catch {
      setCodeError({ message: 'Something went wrong. Please try again.', needsNewCode: false });
    }
  };

  const codeIsDead = codeError?.needsNewCode ?? false;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen font-poppins px-4">
      <div className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[427px]">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="inline-block mb-6 hover:animate-bounce-left transition-transform duration-200 cursor-pointer"
        >
          <img src={Back} alt="" aria-hidden="true" className="h-7 w-7" />
        </button>
        <div className="font-bold text-2xl md:text-3xl lg:text-4xl">Verify your email</div>
        <p className="font-normal py-3.5 text-sm md:text-base break-words">
          We sent a 6-digit code to <span className="font-semibold">{email}</span>. Enter it below to finish setting up your account.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[427px] flex flex-col items-center -mt-[21px]"
      >
        <CodeField
          registration={register('otp', { onChange: () => setCodeError(null) })}
          error={errors.otp?.message ?? codeError?.message}
          needsNewCode={codeIsDead}
          notice={notice}
          secondsLeft={cooldown.secondsLeft}
          resending={resending}
          onResend={resendCode}
        />
        <div className="mt-[25px] w-full flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting || codeIsDead}
            className="w-[140px] h-[35px] text-xs md:w-[150px] md:h-[40px] md:text-sm lg:w-[180px] lg:h-[40px] lg:text-base rounded-[4px] bg-bluegray font-poppins font-semibold text-white
            transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer
            disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {isSubmitting ? 'Verifying…' : 'Verify'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default VerifyEmailStep;
