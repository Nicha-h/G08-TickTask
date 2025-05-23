import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";

function NotFoundPage() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#95B1EE] px-4 sm:px-8">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-[1100px] min-h-[65vh] flex flex-col lg:flex-row items-center justify-around p-6 sm:p-12 lg:px-20 lg:py-12">
        
        {/* Image Section - Top on mobile, Left on desktop */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mb-1 lg:mb-0">
          <img
            src={Logo}
            alt="logo"
            className="w-[250px] sm:w-[300px] lg:w-[480px] h-auto"
          />
        </div>
        
        {/* Content Section - Bottom on mobile, Right on desktop */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center">
          <h1 className="text-[70px] sm:text-[90px] lg:text-[150px] font-poppins font-bold text-black leading-none mb-2">
            404
          </h1>
          <p className="text-lg sm:text-2xl font-poppins font-semibold text-black mb-2">
            PAGE NOT FOUND :(
          </p>
          <p className="text-gray-600 font-poppins text-base sm:text-lg mb-6 px-4">
            It seems like this page does not exist!
          </p>
          <button
            onClick={() => navigate("/home")}
            className="py-3 px-8 bg-[#E7F1A8] border-2 border-black rounded-md hover:bg-[#DDEF6E] transition-all font-poppins font-bold text-[16px] w-auto min-w-[120px]"
          >
            HOME
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;