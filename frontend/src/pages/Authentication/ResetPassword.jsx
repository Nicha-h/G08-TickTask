import React, { useState } from 'react';
import Back from '../../assets/Singlearrow.svg';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavLink } from 'react-router-dom';
import Reveal from '../../assets/Eye.svg';
import Hidden from '../../assets/Hidden.svg';
import FYI from '../../assets/vineboom.svg';

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userSchema = z
    .object({
      password: z.string().min(7, 'Your password needs to be at least 7 characters.'),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Your passwords does not match",
      path: ['confirmPassword'], 
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  const onSubmit = () => {
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 300);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (  
    <div>
      {/* Back */}
      <div className="m-12">
        <NavLink to="/login" className="inline-block hover:animate-bounce-left transition-transform duration-200 cursor-pointer">
          <img src={Back} alt="Back" className="h-7 w-7" />
        </NavLink>
      </div>

      {/* Form */}
      <div className="flex flex-col justify-center items-center h-screen font-poppins -mt-28">
        <div className="sm:text-3xl md:text-4xl lg:text-5xl font-bold">Reset your Password     
            <div className="sm:text-lg md:text-xl lg:text-2xl font-normal py-3.5">Enter your new password</div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[470px] flex flex-col items-center transition-all duration-200 ease-in-out transform"
        >
          {/* Password */}
          <div className="font-normal font-poppins mt-[29px] w-full relative">
            <p className="font-normal text-[13px] sm:text-[13px] md:text-[14px] lg:text-[15px] ">Password</p>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full h-[40px] border-2 rounded-[8px] text-[14px] pl-3 pr-10"
            />
            {/* Toggle Visibility */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[41px] md:top-[43px] lg:top-[42px] transform -translate-y-1/2 hover:scale-105"
            >
              {showPassword ? (
                <img src={Reveal} alt="Hide Password" className="w-4 h-4 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-all duration-200 ease-in-out transform" />
              ) : (
                <img src={Hidden} alt="Show Password" className="w-4 h-4 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-all duration-200 ease-in-out transform" />
              )}
            </button>
            {errors.password && <p className="text-red-500 text-xs sm:text-xs md:text-xs lg:text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="font-normal font-poppins mt-[29px] w-full relative">
            <p className="font-normal text-[13px] sm:text-[13px] md:text-[14px] lg:text-[15px] ">Confirm Password</p>
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="w-full h-[40px] border-2 rounded-[8px] text-[14px] pl-3 pr-10"
            />
            {/* Toggle Confirm Password Visibility */}
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-[41px] md:top-[43px] lg:top-[42px] transform -translate-y-1/2 hover:scale-105"
            >
              {showConfirmPassword ? (
                <img src={Reveal} alt="Hide Password" className="w-4 h-4 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-all duration-200 ease-in-out transform" />
              ) : (
                <img src={Hidden} alt="Show Password" className="w-4 h-4 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-all duration-200 ease-in-out transform" />
              )}
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-xs sm:text-xs md:text-xs lg:text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex flex-row items-center justify-center text-xs w-full font-light py-2.5 text-darkgray">
                <img src={FYI} className="w-4 h-4 mr-1" alt="Info" />
                Your password needs to be at least 7 characters.
            </div>

          <div className="mt-[21px] w-full flex justify-center">
            <button
              type="submit"
              className="w-[140px] h-[35px] text-xs md:w-[150px] md:h-[40px] md:text-sm lg:w-[180px] lg:h-[40px] lg:text-base rounded-[4px] bg-bluegray font-poppins font-semibold text-white transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Done
            </button>
          </div>
        </form>
        
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div
            className={`bg-white p-7 rounded-lg shadow-lg text-center w-full max-w-md relative ${
              isClosing ? 'animate-scale-out' : 'animate-scale-in'
            }`}
          >

            {/* Title */}
            <h2 className="text-2xl font-poppins font-bold mb-4">Password Changed!</h2>

            {/* Divider */}
            <div className="flex justify-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>

            {/* Message */}
            <p className="font-poppins text-base mt-3">Your Password has been changed successfully</p>
            <div className='mt-6'>
                <NavLink to="/login">
                <button className="w-[140px] h-[35px] text-xs md:w-[150px] md:h-[40px] md:text-sm lg:w-[150px] lg:h-[40px] lg:text-base rounded-[4px] bg-bluegray font-poppins font-semibold text-white 
                transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
                onClick={closeModal}>
                    Back to login
                </button>
                </NavLink>
            </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;