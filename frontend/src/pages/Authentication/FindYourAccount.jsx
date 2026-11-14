import React, { useState } from 'react';
import Back from '../../assets/Singlearrow.svg';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Close from '../../assets/close.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { authClient, authResult } from '../../util/auth';
import { emailSchema, pendingEmail } from '../../util/otp';
import { useCooldown } from '../../hooks/useCooldown';
import ErrorBox from '../../components/ErrorBox';

function FindYourAccount() {
  const navigate = useNavigate();
  const userSchema = z.object({
    email: emailSchema,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(userSchema) });

  const cooldown = useCooldown('reset');
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [sentTo, setSentTo] = useState('');
  const [rateLimited, setRateLimited] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async ({ email }) => {
    let error;
    try {
      ({ error } = await authResult(authClient.emailOtp.requestPasswordReset({ email })));
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
      return;
    }

    if (error?.status === 429) {
      setRateLimited(true);
      cooldown.start();
      return;
    }

    // Same result whether or not the account exists, so this page can't be used to find out who has one
    setRateLimited(false);
    setSentTo(email);
    pendingEmail.set('reset', email);
    cooldown.start();
    setShowModal(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 300);
  };

  const waiting = cooldown.secondsLeft > 0;

  return (
    <div>
      {errorMessage && <ErrorBox errorMessage={errorMessage} onClose={() => setErrorMessage('')} />}
        {/*Back */}
        <div className="m-12">
            <NavLink to="/login" aria-label="Back to login" className="inline-block hover:animate-bounce-left transition-transform duration-200 cursor-pointer">
                <img src={Back} alt="Back" className="h-7 w-7" />
            </NavLink>
        </div>

        {/*form */}
      <div className="flex flex-col justify-center items-center h-screen font-poppins -mt-28 px-4">
        <div className=" font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Find your account
            <div className=" font-normal py-3.5 text-base sm:text-base md:text-lg lg:text-2xl ">Enter your registered email</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate
          className="w-full max-w-[250px] sm:max-w-[250px] md:max-w-[320px] lg:max-w-[427px] flex flex-col items-center
          transition-all duration-200 ease-in-out transform">

          <div className="font-poppins w-full mt-8">
            <label htmlFor="email" className="block font-normal text-[13px] sm:text-[13px] md:text-[14px] lg:text-[15px] mb-2">Email</label>
            <input
              id="email"
              {...register('email')}
              type="email"
              autoComplete="email"
              placeholder="example@mail.com"
              aria-invalid={errors.email ? 'true' : 'false'}
              className={`font-normal w-full h-[35px] sm:h-[35px] md:h-[37px] lg:h-[40px] border-2 rounded-[8px] text-[12px] sm:text-[12px] md:text-[12px] lg:text-[14px] pl-3 ${
                errors.email ? 'border-red-500' : 'border'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-xs md:text-xs lg:text-sm mt-1">
                {errors.email.message}
              </p>
            )}
            {rateLimited && waiting && (
              <p role="alert" className="text-red-500 text-xs sm:text-xs md:text-xs lg:text-sm mt-1">
                Too many requests. Try again in {cooldown.secondsLeft}s.
              </p>
            )}
          </div>
          <div className="flex justify-center item-center text-center text-[10px] md:text-xs font-normal py-2.5">
            Enter your email to receive a code to reset your password
          </div>
          <div className="mt-[21px] w-full flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting || waiting}
              className="w-[140px] h-[35px] text-xs md:w-[150px] md:h-[40px] md:text-sm lg:w-[180px] lg:h-[40px] lg:text-base rounded-[4px] bg-bluegray font-poppins font-semibold text-white
              transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer
              disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              {isSubmitting ? 'Sending…' : waiting ? `Resend in ${cooldown.secondsLeft}s` : 'Send reset code'}
            </button>
          </div>
          {sentTo && !showModal && (
            <button
              type="button"
              onClick={() => navigate('/reset-Password', { state: { email: sentTo } })}
              className="mt-3 text-[13px] lg:text-[15px] text-royalblue hover:underline cursor-pointer"
            >
              I already have a code
            </button>
          )}
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sent-dialog-title"
            className={`bg-white p-7 rounded-lg shadow-lg text-center w-full max-w-md relative ${
              isClosing ? 'animate-scale-out' : 'animate-scale-in'
            }`}
          >
            {/* Close Button */}
            <button type="button" aria-label="Close" className="absolute top-4 left-4 cursor-pointer hover:scale-105" onClick={closeModal}>
              <img src={Close} alt="" aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Title */}
            <h2 id="sent-dialog-title" className="text-2xl font-poppins font-bold mb-4">Check your email</h2>

            {/* Divider */}
            <div className="flex justify-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>

            {/* Message */}
            <p className="font-poppins text-sm md:text-base mt-3 break-words">
              If an account exists for <span className="font-semibold">{sentTo}</span>, we sent a 6-digit code. It expires in 5 minutes.
            </p>
            <button
              onClick={() => navigate('/reset-Password', { state: { email: sentTo } })}
              className="mt-5 w-[160px] h-[35px] text-sm rounded-[4px] bg-bluegray font-poppins font-semibold text-white
                transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              Enter code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindYourAccount;
