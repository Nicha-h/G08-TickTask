import React, { useState } from 'react';
import Logo from '../assets/Logo.svg';
import { NavLink, Outlet } from "react-router-dom";
import Men1 from '../assets/men1.svg'
import SearchIcon from '../assets/Search.svg'
function Navbar() {
  const [activeButton, setActiveButton] = useState('Home');

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="flex flex-col items-center w-full">
      
      <div className="fixed top-0 w-full bg-white shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] z-10 border-2">
        <div className="flex justify-between items-center max-w-7xl mx-auto p-2 ">
          {/* Logo */}
          <img className="flex justify-start w-20 h-20" src={Logo} alt="Logo" />

          {/* Buttons Container */}
          <div className="flex justify-center items-center gap-[38px] font-poppins  font-semibold">
            {/* Home Button */}
            <NavLink
              to="/"
              end
              onClick={() => handleClick('Home')}
              className={`rounded-xl w-[158px] h-[41px] flex justify-center items-center transition-all duration-200 ease-in-out transform ${
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
              className={`rounded-xl w-[158px] h-[41px] flex justify-center items-center transition-all duration-200 ease-in-out transform ${
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
              className={`rounded-xl w-[158px] h-[41px] flex justify-center items-center transition-all duration-200 ease-in-out transform ${
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
              className={`rounded-xl w-[158px] h-[41px] flex justify-center items-center transition-all duration-200 ease-in-out transform ${
                activeButton === 'Overview' ? 'bg-primary text-white border-2 border-primary2 scale-105 shadow-lg' : 
                'bg-white text-black border-2 border-black hover:scale-105 hover:shadow-lg'
              }`}
            >
              Overview
            </NavLink>
          </div>
          {/* pfp Container */}
          <div className='flex flex-row gap-[10px]'>
            <img className='hover:scale-105 transition-all duration-200 ease-in-out transform' src={SearchIcon} alt="search"></img>
            <img className='hover:scale-105 transition-all duration-200 ease-in-out transform' src={Men1} alt="profile"/>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="mt-32 w-full max-w-7xl mx-auto p-4">
        <Outlet /> 
      </div>
    </div>
  );
}

export default Navbar;