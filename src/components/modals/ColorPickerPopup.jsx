import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HexColorPicker } from "react-colorful";
import close from '../../../assets/close.svg';

const ColorPickerPopup = ({ 
  onClose, 
  onSelectColor, 
  initialColor = "#FFFFFF"
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [customColor, setCustomColor] = useState(initialColor);

  const basicColors = [
    "#F24726", "#FAA810", "#FEF445", "#CEE741",
    "#0CA789", "#2D9BF0", "#FF0000", "#FF7F00",
    "#FFFF00", "#7FFF00", "#00FF00", "#00FF7F",
    "#00FFFF", "#007FFF", "#0000FF", "#7F00FF",
    "#FF00FF", "#FF007F", "#800000", "#808000"
  ];

  const handleColorSelection = (color) => {
    onSelectColor(color);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {activeTab === 'basic' ? 'Basic Colors' : 'Custom Color'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close color picker"
          >
            <img src={close} alt="Close" className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex border-b mb-4">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'basic' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
              onClick={() => setActiveTab('basic')}
            >
              Basic
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'custom' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
              onClick={() => setActiveTab('custom')}
            >
              Custom
            </button>
          </div>

          {activeTab === 'basic' ? (
            <div className="grid grid-cols-5 gap-3 mb-4">
              {basicColors.map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full border-2 ${initialColor === color ? 'ring-2 ring-offset-2 ring-black' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelection(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          ) : (
            <div className="mb-4">
              <HexColorPicker
                color={customColor}
                onChange={setCustomColor}
                className="w-full h-48 mb-4"
              />
              <div className="flex items-center justify-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full border border-gray-300"
                  style={{ backgroundColor: customColor }}
                />
                <span className="font-mono text-sm">{customColor}</span>
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <button
              className="w-full py-2 bg-black text-white rounded-md font-medium mt-2"
              onClick={() => handleColorSelection(customColor)}
            >
              Apply Color
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

ColorPickerPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSelectColor: PropTypes.func.isRequired,
  initialColor: PropTypes.string
};

export default ColorPickerPopup;