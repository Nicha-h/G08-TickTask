import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Men1 from '../assets/ProfilePics/men1.svg';
import { useNavigate } from 'react-router-dom';
import ProfilePic from '../components/modals/ProfilePic';

function ProfileEdit() {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(Men1); // default
  const [loading, setLoading] = useState(true);
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const navigate = useNavigate();

  const userSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Please enter a valid email'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                Username: 'SigmaBoy',
                User_Email: 'admin@gmail.com',
              }),
            1000
          )
        );

        setUser(userData);
        reset({
          username: userData.Username,
          email: userData.User_Email,
        });
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [reset]);

  const handleProfilePicSelect = (pic) => {
    console.log('User picked:', pic.name);
    setProfilePicture(pic.src);
  };

  const onSubmit = (data) => {
    console.log('Form Data:', { ...data, profilePicture });
    navigate('/home');
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen w-full bg-white font-poppins">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen w-full p-6 font-poppins">
      <div className="flex flex-row items-center w-full max-w-5xl">
        <h1 className="text-2xl font-bold mr-12 ml-40">Profile Editor</h1>

        <div className="flex flex-col md:flex-row items-center gap-8 w-full">
          {/* Profile Picture */}
          <div className="flex flex-col items-center md:w-auto">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full object-cover bg-red-400 cursor-pointer hover:opacity-80 transition"
              onClick={() => setShowProfilePicModal(true)} // click to open modal
            />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full md:flex-1 gap-4 max-w-md"
          >
            <div className="flex flex-col w-full max-w-md">
              <label className="text-sm mb-1">Username</label>
              <input
                {...register('username')}
                className="border-2 rounded-[8px] px-3 py-2 text-sm w-full"
                style={{ maxWidth: '427px' }}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
              )}
            </div>

            <div className="flex flex-col w-full max-w-md">
              <div className="flex items-center gap-2">
                <label className="text-sm mb-1">Email</label>
                <button
                  type="button"
                  className="text-xs text-gray-400 underline hover:text-blue-600"
                >
                  change email?
                </button>
              </div>
              <input
                {...register('email')}
                className="border-2 rounded-[8px] px-3 py-2 text-sm w-full"
                style={{ maxWidth: '427px' }}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-center w-full" style={{ maxWidth: '427px' }}>
              <button
                type="submit"
                className="w-[150px] h-[40px] bg-primary hover:bg-primary2 text-white font-semibold py-2 rounded-[8px] transition-all"
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showProfilePicModal && (
        <ProfilePic
          onClose={() => setShowProfilePicModal(false)}
          onSelect={handleProfilePicSelect}
        />
      )}
    </div>
  );
}

export default ProfileEdit;
