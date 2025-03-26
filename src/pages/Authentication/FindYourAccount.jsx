import React, { useState } from 'react';
import Back from '../../assets/Singlearrow.svg';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Close from '../../assets/close.svg';
import { Navigate, NavLink} from 'react-router-dom';

function FindYourAccount() {
  const userSchema = z.object({
    email: z.string().email('Please enter a valid email'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({ resolver: zodResolver(userSchema) });

  const [emailNotFound, setEmailNotFound] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  
  const onSubmit = async (data) => {
    const { email } = data;
    const emailExists = await checkEmailInDatabase(email);

    if (emailExists) {
      setShowModal(true);
      setEmailNotFound(false);
      clearErrors('email');
    } else {
      setEmailNotFound(true);
      setError('email', {
        type: 'manual',
        message: "Couldn't find your TickTask Account",
      });
    }
  };

  // Simulate checking email in database
  const checkEmailInDatabase = async (email) => {
    // Replace this with an actual API call
    const validEmails = ['ticktask@gmail.com', 'test@example.com', 'inwza0072000@gmail.com'];
    return validEmails.includes(email);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false); 
      setIsClosing(false); 
    }, 300); 
  };

  return (
    <div>
        {/*Back */}
        <div className="m-12">
            <NavLink to="/login" className="inline-block hover:animate-bounce-left transition-transform duration-200 cursor-pointer">
                <img src={Back} alt="Back" className="h-7 w-7" />
            </NavLink>
        </div>

        {/*form */}
      <div className="flex flex-col justify-center items-center h-screen font-poppins -mt-28">
        <div className=" font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Find your account
            <div className=" font-normal py-3.5 text-base sm:text-base md:text-lg lg:text-2xl ">Enter your registered email</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[250px] sm:max-w-[250px] md:max-w-[320px] lg:max-w-[427px] flex flex-col items-center 
          transition-all duration-200 ease-in-out transform">
          
          <div className="font-poppins w-full mt-8">
            <p className="font-normal text-[13px] sm:text-[13px] md:text-[14px] lg:text-[15px] mb-2">Email</p>
            <input
              {...register('email')}
              placeholder="example@mail.com"
              className={`font-normal w-full h-[35px] sm:h-[35px] md:h-[37px] lg:h-[40px] border-2 rounded-[8px] text-[12px] sm:text-[12px] md:text-[12px] lg:text-[14px] pl-3 ${
                emailNotFound || errors.email ? 'border-red-500' : 'border'
              }`}
            />
            {(emailNotFound || errors.email) && (
              <p className="text-red-500 text-xs sm:text-xs md:text-xs lg:text-sm mt-1">
                {emailNotFound ? "Couldn't find your TickTask Account" : errors.email.message}
              </p>
            )}
          </div>
          <div className="flex justify-center item-center text-[8px] sm:text-[10px] md:text-xs lg:text-xs font-normal py-2.5">
            Enter your email to receive an email to reset your password
          </div>
          <div className="mt-[21px] w-full flex justify-center">
            <button
              type="submit"
              className="w-[140px] h-[35px] text-xs md:w-[150px] md:h-[40px] md:text-sm lg:w-[180px] lg:h-[40px] lg:text-base rounded-[4px] bg-bluegray font-poppins font-semibold text-white 
              transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              Send reset link
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div
            className={`bg-white p-7 rounded-lg shadow-lg text-center w-full max-w-md relative ${
              isClosing ? 'animate-scale-out' : 'animate-scale-in'
            }`}
          >
            {/* Close Button */}
            <div className="absolute top-4 left-4 cursor-pointer hover:scale-105" onClick={closeModal}>
              <img src={Close} alt="Close" className="h-6 w-6" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-poppins font-bold mb-4">Email Sent!</h2>

            {/* Divider */}
            <div className="flex justify-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>

            {/* Message */}
            <p className="font-poppins text-base mt-3">Check your inbox!</p>
            {/*
            <p className="font-poppins text-xs mt-2">Didn't receive any mail?</p>
            <div>
              <button className="mt-1.5 w-[140px] h-[35px] text-xs md:w-[150px] md:h-[40px] md:text-xs lg:w-[160px] lg:h-[30px] lg:text-xs rounded-[4px] bg-bluegray font-poppins font-semibold text-white 
                transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg">
                Resend Confirmation
              </button>
            </div>
            */}
          </div>
        </div>
      )}
    </div>
  );
}

export default FindYourAccount;