import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import close from '../../assets/close.svg';

const ColorPickerModal = ({ currentColor, onSelect, onClose }) => {
  const [customColor, setCustomColor] = useState("#FFFFFF");
  const [colorHistory, setColorHistory] = useState([]);
  const [colorTab, setColorTab] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);

  const basicColors = [
    "#FBE6E5", "#FFFDE8", "#EBF4DF", "#EAF9FE", "#E6E7FC", "#F5E6FD",
    "#F09C9A", "#FCF5A4", "#A2E296", "#ACE9FC", "#CDCBFC", "#DB9BF9",
    "#EC6F6B", "#FBEF7C", "#7DD46C", "#87E1FB", "#999AF7", "#CA6CF6",
    "#EB4941", "#FBEC60", "#5DD46C", "#6CD7FB", "#6765F6", "#BC41F4",
    "#E73422", "#FBE84E", "#3DD46C", "#39CFF4", "#3333F3", "#B024F6",
  ];

  useEffect(() => {
    const savedColors = localStorage.getItem('colorHistory');
    if (savedColors) {
      setColorHistory(JSON.parse(savedColors));
    }
  }, []);

  const handleColorSelect = (color) => {
    if (isEditing) return;
    
    onSelect(color);
    
    const newHistory = [color, ...colorHistory.filter(c => c !== color).slice(0, 11)];
    setColorHistory(newHistory);
    localStorage.setItem('colorHistory', JSON.stringify(newHistory));
    
    onClose();
  };

  const handleCustomColorSelect = () => {
    handleColorSelect(customColor);
  };

  const clearColorHistory = () => {
    setColorHistory([]);
    localStorage.removeItem('colorHistory');
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const removeColorFromHistory = (colorToRemove) => {
    const newHistory = colorHistory.filter(color => color !== colorToRemove);
    setColorHistory(newHistory);
    localStorage.setItem('colorHistory', JSON.stringify(newHistory));
  };

  return (
    <div className="fixed inset-0 bg-gray-400/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg w-[320px] shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] sm:text-[22px] font-fredoka font-reg">Colors</h2>
          <img
            className="w-auto h-auto sm:w-6 sm:h-6 cursor-pointer"
            src={close}
            alt="close"
            onClick={onClose}
          />
        </div>
        
        {/* Divider */}
        <div className="w-full my-4 border-t border-gray-300"></div>
        
        {/* Tab Content */}
        <div className="min-h-[240px] mb-4"> {/* Fixed height container */}
          {colorTab === "basic" ? (
            <div className="flex justify-center">
              <div className="w-fit h-fit grid grid-cols-6 gap-[0.5px] mb-4 border-[1.5px]">
                {basicColors.map((c, idx) => (
                  <button
                    key={idx}
                    className={`w-9 h-9 ${currentColor === c ? "ring-[1px] ring-black" : ""}`}
                    style={{ backgroundColor: c }}
                    onClick={() => handleColorSelect(c)}
                  />
                ))}
              </div>
            </div>
          ) : ( 
            <div className="flex flex-col items-center justify-center">
              <HexColorPicker 
                color={customColor}
                onChange={setCustomColor}
                className="w-full h-[200px] mb-4 border-[1.5px] rounded-lg"
              />
              <div className="flex justify-center items-center w-full gap-2">
                <div
                  className="mr-[-21px] w-9 h-9 rounded-full border border-black border-[1.5px]"
                  style={{ backgroundColor: customColor }}
                />

                <button
                  onClick={handleCustomColorSelect}
                  className="-mt-4.5 px-2 py-1 text-[10px] font-[900] bg-black text-white rounded-full"
                >
                  +
                </button>

                <div className="flex">
                  <input
                    type="text"
                    placeholder="FFFFFF"
                    value={customColor.replace('#', '')}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[0-9A-Fa-f]{0,6}$/.test(value)) {
                        setCustomColor(`#${value}`);
                      }
                    }}
                    className="w-20 h-8 p-3 font-poppins font-bold text-[13px] rounded-lg border-[1.5px] text-center"
                    maxLength={6}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Color History Section - Fixed position */}
        <div className="mb-4">
          <div className="flex justify-around gap-18 items-center mb-2">
            <div className="flex flex-col font-poppins font-bold text-[16px]">COLOR HISTORY</div>
            <button 
              onClick={toggleEditMode}
              className="flex text-[10px] underline font-poppins font-reg"
            >
              {isEditing ? "done" : "edit"}
            </button>
          </div>
          
          <div className="flex justify-center">
            <div className="grid grid-cols-6 gap-2 w-full">
              {colorHistory.length > 0 ? (
                colorHistory.map((color, index) => (
                  <div key={index} className="relative flex justify-center">
                    <button
                      className={`w-7 h-7 border-[1.5px] rounded-full ${isEditing ? "opacity-80" : ""}`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                    />
                    {isEditing && (
                      <button
                        onClick={() => removeColorFromHistory(color)}
                        className="absolute -top-1 -right-1.5 w-4 h-4 bg-red-600 font-poppins text-[10px] font-[900] text-bold text-black rounded-full border-[1.5px] flex items-center justify-center"
                      >
                        -
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-6 text-center text-sm text-[#A7A7A7] py-2">
                  No color history yet
                </div>
              )}
            </div>
          </div>

          {/* Clear All button when in edit mode */}
          {isEditing && colorHistory.length > 0 && (
            <div className="flex justify-center mt-2">
              <button
                onClick={clearColorHistory}
                className="text-red-500 underline font-poppins text-[10px] font-reg"
              >
                clear all
              </button>
            </div>
          )}
        </div>

        {/* Tab Switch Buttons */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={() => setColorTab("basic")}
            className={`text-[14px] font-poppins font-bold px-5 py-2 rounded-lg border-[1.5px] ${colorTab === "basic" ? "bg-black text-white" : "border border-black"}`}
          >
            Basic
          </button>
          <button
            onClick={() => setColorTab("custom")}
            className={`text-[14px] font-poppins font-bold px-4 py-2 rounded-lg border-[1.5px] ${colorTab === "custom" ? "bg-black text-white" : "border border-black"}`}
          >
            Custom
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerModal;