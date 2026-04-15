import React, { useState } from 'react';
import Close from '../assets/close.svg';

function ErrorBox({ onClose, errorMessage }) {

  const [isClosing, setIsClosing] = useState(false);
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) onClose();
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className={`bg-white p-7 rounded-lg shadow-lg text-center w-full max-w-md relative ${
            isClosing ? 'animate-scale-out' : 'animate-scale-in'}`}>

            <button
                type="button"
                className="absolute top-4 right-4 cursor-pointer hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                onClick={closeModal}
                aria-label="Close error dialog"
            >
                <img src={Close} alt="" aria-hidden="true" className="h-6 w-6" />
            </button>
            {/* Title */}
            <h2 className="text-xl font-fredoka font-bold mb-4 text-red-500">Error</h2>
            
            {/* Divider */}
            <div className="border-t border-gray-300 mb-4"></div>

            {/* Error Message Body */}
            <div className='font-fredoka font-normal text-base text-gray-700 mb-6'>
              {errorMessage || "An unexpected error occurred."}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center w-full mt-2">
              <button 
                  onClick={closeModal} 
                  className="text-sm font-black font-poppins px-6 py-2 bg-red-500 text-white
                  rounded-lg hover:bg-red-600 hover:scale-105 transition"
              >
                  Close
              </button>
            </div>
                
        </div>
    </div>
  );
}

export default ErrorBox;
