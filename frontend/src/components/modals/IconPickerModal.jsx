import React from 'react';
import close from '../../assets/close.svg';
import { iconComponents, iconOptions } from '../modals/icon.jsx';

const IconPickerModal = ({ selectedIcon, onSelect, onClose }) => {
  const isIconSelected = (iconKey) => {
    return selectedIcon === iconComponents[iconKey];
  };

  const handleIconSelect = (iconKey) => {
    onSelect(iconComponents[iconKey]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[18px] font-poppins font-bold">Select an Icon</h2>
          <img
            src={close}
            alt="close"
            onClick={onClose}
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain cursor-pointer"
          />
        </div>

        {/* Icon Grid */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 rounded-full">
          {iconOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleIconSelect(option.iconKey)}
              className={`w-auto h-auto aspect-square flex rounded-full flex items-center justify-center transition-colors ${
                isIconSelected(option.iconKey)
                  ? 'bg-gray-400'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <img
                src={iconComponents[option.iconKey]}
                alt={option.id}
                className="w-9 h-9 sm:w-11 sm:h-11 object-contain "
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconPickerModal;