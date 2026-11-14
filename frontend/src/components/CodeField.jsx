import React from 'react';
import { digitsOnly } from '../util/otp';

// 6-digit email code input with the "Resend code" line under it.
// `registration` is the react-hook-form register(...) result; `notice` is a non-error status such as "New code sent".
function CodeField({ registration, error, needsNewCode, notice, secondsLeft, resending, onResend }) {
  const resendDisabled = resending || secondsLeft > 0;
  const resendLabel = resending ? 'Sending…' : secondsLeft > 0 ? `Resend in ${secondsLeft}s` : null;

  return (
    <div className="font-normal font-poppins mt-[29px] w-full">
      <label htmlFor="otp" className="block font-normal text-[13px] sm:text-[13px] md:text-[14px] lg:text-[15px] mb-[3px]">
        Code
      </label>
      <input
        id="otp"
        {...registration}
        onChange={(e) => {
          e.target.value = digitsOnly(e.target.value);
          registration.onChange(e);
        }}
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder="123456"
        aria-invalid={error ? 'true' : 'false'}
        className={`w-full h-[35px] sm:h-[35px] md:h-[37px] lg:h-[40px] border-2 rounded-[8px] text-[14px] lg:text-[16px] pl-3 tracking-[0.3em] ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && (
        <div role="alert" className="text-red-500 text-xs sm:text-xs md:text-xs lg:text-sm mt-1">
          {error}
          {needsNewCode && (
            <button
              type="button"
              onClick={onResend}
              disabled={resendDisabled}
              className="ml-1 text-royalblue hover:underline cursor-pointer disabled:text-gray disabled:no-underline disabled:cursor-not-allowed"
            >
              {resendLabel ?? 'Send a new code'}
            </button>
          )}
        </div>
      )}
      {notice && !error && (
        <p role="status" className="text-green-600 text-xs sm:text-xs md:text-xs lg:text-sm mt-1">{notice}</p>
      )}
      {!needsNewCode && (
        <div className="mt-2 text-[12px] lg:text-[13px]">
          <span>Didn't get a code? </span>
          <button
            type="button"
            onClick={onResend}
            disabled={resendDisabled}
            className="text-royalblue hover:underline cursor-pointer disabled:text-gray disabled:no-underline disabled:cursor-not-allowed"
          >
            {resendLabel ?? 'Resend code'}
          </button>
        </div>
      )}
    </div>
  );
}

export default CodeField;
