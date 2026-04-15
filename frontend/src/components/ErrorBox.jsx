import React, { useEffect, useRef, useState } from 'react';
import Close from '../assets/close.svg';

function ErrorBox({ onClose, errorMessage }) {

  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    // Move initial focus to the dialog when it mounts
    if (dialogRef.current) {
      dialogRef.current.focus();
    }
    
    // Allow Escape key to close the dialog
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const closeModal = () => {
    setIsClosing(true);

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div 
            ref={dialogRef}
            tabIndex={-1}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="error-dialog-title"
            aria-describedby="error-dialog-desc"
            className={`bg-white p-7 rounded-lg shadow-lg text-center w-full max-w-md relative focus:outline-none ${
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
            <h2 id="error-dialog-title" className="text-xl font-fredoka font-bold mb-4 text-red-500">Error</h2>
            
            {/* Divider */}
            <div className="border-t border-gray-300 mb-4"></div>

            {/* Error Message Body */}
            <div id="error-dialog-desc" className='font-fredoka font-normal text-base text-gray-700 mb-6'>
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
