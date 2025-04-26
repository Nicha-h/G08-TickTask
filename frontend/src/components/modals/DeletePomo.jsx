import React, { useState } from 'react';
import Close from '../../assets/close.svg';

function DeletePomo({onClose}) {
    const [isClosing, setIsClosing] = useState(false);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleDelete = () => {
    localStorage.removeItem("userToken");
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className={`bg-white p-7 rounded-lg shadow-lg text-center w-full max-w-md relative ${
            isClosing ? 'animate-scale-out' : 'animate-scale-in'}`}>

            <div className="absolute top-4 right-4 cursor-pointer hover:scale-105" onClick={closeModal}>
                <img src={Close} alt="Close" className="h-6 w-6" />
            </div>    
            {/* Title */}
            <h2 className="text-xl font-fredoka font-normal mb-4">Delete this pomodoro?</h2>
            
            {/* Divider */}
            <div className="border-t border-gray-300 mb-4"></div>

            {/* body */}
            <div className='font-fredoka font-normal text-base'>it will be gone forever!</div>
            {/* Action Buttons */}
            <div className="flex justify-between items-center w-full mt-2 gap-4">
            {/* Cancel button */}
            <button 
                onClick={closeModal} 
                className="text-sm font-black font-poppins px-4 py-0.5 sm:px-4 sm:py-0.5 md:px-4 md:py-1 lg:px-4 lg:py-1 bg-gray-300 border-2 text-gray-600 
                rounded-lg hover:bg-gray-400 hover:scale-105 transition"
            >
                Cancel
            </button>

            {/* delete*/}
            <button 
                onClick={handleDelete} 
                className="text-sm font-black font-poppins px-4 py-0.5 sm:px-4 sm:py-0.5 md:px-4 md:py-1 lg:px-4 lg:py-1 bg-red-400 text-black 
                rounded-lg border-2 border-black hover:bg-red-600 hover:scale-105 transition"
            >
                Delete
            </button>
            

          </div>
                
        </div>
    </div>
  );
}

export default DeletePomo;
