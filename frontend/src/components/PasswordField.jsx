import React, { useState } from 'react';
import Reveal from '../assets/Eye.svg';
import Hidden from '../assets/hidden.svg';
import FYI from '../assets/vineboom.svg';

// Password input with a show/hide toggle. `registration` is the react-hook-form register(...) result.
function PasswordField({ id, label, registration, error, hint, placeholder, autoComplete = 'new-password' }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="font-normal font-poppins mt-[29px] w-full">
      <label htmlFor={id} className="block font-normal text-[13px] sm:text-[13px] md:text-[14px] lg:text-[15px] mb-[3px]">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="flex flex-row items-center text-xs font-light text-darkgray mb-1.5">
          <img src={FYI} className="w-4 h-4 mr-1" alt="" aria-hidden="true" />
          {hint}
        </p>
      )}
      <div className="relative">
        <input
          id={id}
          {...registration}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`w-full h-[35px] sm:h-[35px] md:h-[37px] lg:h-[40px] border-2 rounded-[8px] text-[12px] lg:text-[14px] pl-3 pr-10 ${
            error ? 'border-red-500' : ''
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-105"
        >
          <img
            src={visible ? Reveal : Hidden}
            alt=""
            aria-hidden="true"
            className="w-4 h-4 lg:w-5 lg:h-5 transition-all duration-200 ease-in-out transform"
          />
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-xs sm:text-xs md:text-xs lg:text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

export default PasswordField;
