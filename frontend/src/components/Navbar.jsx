import React, { useState, useEffect, useRef } from 'react';
import Logo from '../assets/Logo.svg';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import SearchIcon from '../assets/Search.svg';
import edit from '@iconify-icons/mdi/pencil-outline'
import signout from '@iconify-icons/mdi/sign-out-variant'
import { Icon } from '@iconify/react/dist/iconify.js';
import ConfirmLogout from './modals/ConfirmLogout';

import Men1 from "../assets/ProfilePics/men1.svg";
import Men2 from "../assets/ProfilePics/men 2.svg";
import Men3 from "../assets/ProfilePics/men3.svg";
import Men4 from "../assets/ProfilePics/men 4.svg";
import Men5 from "../assets/ProfilePics/men 5.svg";
import Men from "../assets/ProfilePics/men.svg";
import Women1 from "../assets/ProfilePics/women 1.svg";
import Women2 from "../assets/ProfilePics/women 2.svg";
import Women3 from "../assets/ProfilePics/women 3.svg";
import Women from "../assets/ProfilePics/women.svg";

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('Home');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState("Men1");

  const presetMap = {
    Men1,
    Men2,
    Men3,
    Men4,
    Men5,
    Men,
    Women1,
    Women2,
    Women3,
    Women,
  };

  // Helper function to get profile picture source
  const getProfilePicSrc = (picturePath) => {
    if (!picturePath) return Men1;
    
    // If it's a base64 custom image
    if (picturePath.startsWith("data:image")) {
      return picturePath;
    }
    
    // If it's a preset image name
    if (presetMap[picturePath]) {
      return presetMap[picturePath];
    }
    
    // Default fallback
    return Men1;
  };

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
    setShowDropdown(false); // hide dropdown when navigating
  };

  const handleProfileClick = () => {
    setShowDropdown(prev => !prev); // toggle dropdown
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:3000/api/users/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        console.log("Fetched user data in navbar:", userData);

        setUser(userData);
        setProfilePicture(userData.User_profile_icon_path || "Men1");
        setError(null);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Failed to load profile data");
        // Don't show alert in navbar, just use fallback
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show loading state if still fetching
  if (loading) {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="fixed top-0 w-full bg-white shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] z-10 border-2">
          <div className="flex justify-between items-center max-w-7xl mx-auto p-2 relative">
            <img className="flex justify-start md:w-15 md:h-15 lg:w-20 lg:h-20" src={Logo} alt="Logo" />
            <div className="flex justify-center items-center gap-[38px] font-poppins font-semibold">
              {/* Navigation buttons - you can keep these static during loading */}
              <NavLink to="/home" className="rounded-xl w-[100px] h-[38px] md:w-[100px] md:h-[38px] lg:w-[158px] lg:h-[41px] flex justify-center items-center bg-white text-black border-2 border-black">
                Home
              </NavLink>
              <NavLink to="/pomodoro" className="rounded-xl w-[120px] h-[40px] md:w-[120px] md:h-[40px] lg:w-[158px] lg:h-[41px] flex justify-center items-center bg-white text-black border-2 border-black">
                Pomodoro
              </NavLink>
              <NavLink to="/calendar" className="rounded-xl w-[120px] h-[40px] md:w-[120px] md:h-[40px] lg:w-[158px] lg:h-[41px] flex justify-center items-center bg-white text-black border-2 border-black">
                Calendar
              </NavLink>
              <NavLink to="/overview" className="rounded-xl w-[120px] h-[40px] md:w-[120px] md:h-[40px] lg:w-[158px] lg:h-[41px] flex justify-center items-center bg-white text-black border-2 border-black">
                Overview
              </NavLink>
            </div>
            <div className="flex flex-row gap-[10px] relative">
              <img src={SearchIcon} alt="search" />
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="mt-32 w-full max-w-7xl mx-auto p-4">
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="fixed top-0 w-full bg-white shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] z-10 border-2">
        <div className="flex justify-between items-center max-w-7xl mx-auto p-2 relative">
          {/* Logo */}
          <img className="flex justify-start md:w-15 md:h-15 lg:w-20 lg:h-20" src={Logo} alt="Logo" />

          {/* Buttons Container */}
          <div className="flex justify-center items-center gap-[38px] font-poppins font-semibold">
            {/* Home Button */}
            <NavLink
              to="/home"
              end
              onClick={() => handleClick('Home')}
              className={`rounded-xl w-[100px] h-[38px] md:w-[100px] md:h-[38px] lg:w-[158px] lg:h-[41px] flex justify-center items-center transition-all duration-200 ease-in-out transform ${
                activeButton === 'Home' ? 'bg-primary text-white border-2 border-primary2 scale-105 shadow-lg' :
                'bg-white text-black border-2 border-black hover:scale-105 hover:shadow-lg'
              }`}
            >
              Home
            </NavLink>

            {/* Pomodoro Button */}
            <NavLink
              to="/pomodoro"
              onClick={() => handleClick('Pomodoro')}
              className={`rounded-xl w-[120px] h-[40px] md:w-[120px] md:h-[40px] lg:w-[158px] lg:h-[41px] flex justify-center items-center transition-all duration-200 ease-in-out transform ${
                activeButton === 'Pomodoro' ? 'bg-primary text-white border-2 border-primary2 scale-105 shadow-lg' :
                'bg-white text-black border-2 border-black hover:scale-105 hover:shadow-lg'
              }`}
            >
              Pomodoro
            </NavLink>

            {/* Calendar Button */}
            <NavLink
              to="/calendar"
              onClick={() => handleClick('Calendar')}
              className={`rounded-xl w-[120px] h-[40px] md:w-[120px] md:h-[40px] lg:w-[158px] lg:h-[41px] flex justify-center items-center transition-all duration-200 ease-in-out transform ${
                activeButton === 'Calendar' ? 'bg-primary text-white border-2 border-primary2 scale-105 shadow-lg' :
                'bg-white text-black border-2 border-black hover:scale-105 hover:shadow-lg'
              }`}
            >
              Calendar
            </NavLink>

            {/* Overview Button */}
            <NavLink
              to="/overview"
              onClick={() => handleClick('Overview')}
              className={`rounded-xl w-[120px] h-[40px] md:w-[120px] md:h-[40px] lg:w-[158px] lg:h-[41px] flex justify-center items-center transition-all duration-200 ease-in-out transform ${
                activeButton === 'Overview' ? 'bg-primary text-white border-2 border-primary2 scale-105 shadow-lg' :
                'bg-white text-black border-2 border-black hover:scale-105 hover:shadow-lg'
              }`}
            >
              Overview
            </NavLink>
          </div>

          {/* pfp Container */}
          <div className="flex flex-row gap-[10px] relative" ref={dropdownRef}>
            <img
              className="hover:scale-105 transition-all duration-200 ease-in-out transform cursor-pointer"
              src={SearchIcon}
              alt="search"
            />
            <img
              onClick={handleProfileClick}
              className="w-15 h-15 rounded-full object-cover hover:scale-105 transition-all duration-200 ease-in-out transform cursor-pointer"
              src={getProfilePicSrc(profilePicture)}
              alt="profile"
            />
            
            {/* Dropdown menu */}
            <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-12 w-64 bg-white border shadow-lg py-4 flex flex-col gap-2 z-20"
              >
                  {/* Top section: Profile info */}
                  <div className="flex items-center gap-3 px-4 mb-2">
                    <img
                      className="w-13 h-13 rounded-full object-cover"
                      src={getProfilePicSrc(profilePicture)}
                      alt="profile"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-black text-sm">
                        {user?.Username || 'Loading...'}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {user?.user?.User_Email || user?.User_Email || 'Loading...'}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <hr className="border-gray-300" />

                  {/* Edit Profile button */}
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setShowDropdown(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition rounded-md"
                  >
                    <Icon icon={edit} className='w-6 h-6'/>
                    <span className="text-black font-poppins font-black">Edit Profile</span>
                  </button>

                  {/* Sign out button */}
                  <button
                    onClick={() => {
                      setShowLogoutModal(true);
                      setShowDropdown(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition rounded-md text-red-500 font-medium"
                  >
                    <Icon icon={signout} className='w-6 h-6'/>
                    <span>Sign out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
              
      {/* Page Content */}
      <div className="mt-32 w-full max-w-7xl mx-auto p-4">
        <Outlet />
      </div>
      {showLogoutModal && (
        <ConfirmLogout onClose={() => setShowLogoutModal(false)}/>
      )}
    </div>
  );
}

export default Navbar;