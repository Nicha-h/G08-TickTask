import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function ProfileEdit() {
    const userSchema = z.object({
        email: z.string().email('Please enter a valid email'),
        password: z.string().min(7, 'Incorrect password!'),
      });
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[427px] flex flex-col items-center 
        transition-all duration-200 ease-in-out transform">
          <div className="font-poppins w-full">
            <p className="text-[13px] sm:text-[13px] md:text-[14px] lg:text-[15px] mb-[3px]">Email</p>
            <input
              {...register('email')}
              placeholder="example@mail.com"
              className="w-full h-[35px] sm:h-[35px] md:h-[37px] lg:h-[40px] border-2 rounded-[8px] text-[12px] sm:text-[12px] md:text-[12px] lg:text-[14px] pl-3"
            />
            </div>
    </div>
  )
}

export default ProfileEdit
