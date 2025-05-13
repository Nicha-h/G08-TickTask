<<<<<<< HEAD
import React from "react";

export default function IconSelectorModal({ iconOptions, selectedIcon, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-400/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-4 overflow-hidden">
        <h4 className="font-bold mb-4 text-center">Select Icon</h4>

        <div className="grid grid-cols-4 gap-4">
          {iconOptions.map(icon => (
            <div
              key={icon.id}
              className={`w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 ${selectedIcon === icon.src ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => onSelect(icon.src)}
            >
              <img src={icon.src} alt={icon.alt} className="w-10 h-10" />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
=======
const IconSelectorModal = ({ 
    icons, 
    selectedIcon, 
    onSelect, 
    onClose 
  }) => {
    return (
      <div className="fixed inset-0 bg-gray-400/40 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-[400px] p-4 overflow-hidden">
          <h4 className="font-bold mb-2">Select Icon</h4>
          <div className="grid grid-cols-4 gap-4">
            {icons.map(icon => (
              <div
                key={icon.id}
                className={`w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 ${selectedIcon === icon.src ? "ring-2 ring-blue-500" : ""}`}
                onClick={() => onSelect(icon.src)}
              >
                <img src={icon.src} alt={icon.alt} className="w-10 h-10" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default IconSelectorModal;
>>>>>>> 5b5d2c643b1bf74c8f93b7669e40e19bb3c056a9
