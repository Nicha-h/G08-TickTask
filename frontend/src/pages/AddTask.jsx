import React, { useState, useEffect } from "react";
import close from '../assets/close.svg';
import AddToCate from '../assets/AddToCate.svg';
import CustomColor from '../assets/CustomColor.svg';
import iconPet from '../assets/iconPet.svg';
import iconComputer from '../assets/iconComputer.svg';
import iconArt from '../assets/iconArt.svg';
import iconSmile from '../assets/iconSmile.svg';
import iconWorkout from '../assets/iconWorkout.svg';
import iconPetStar from '../assets/iconStar.svg';
import iconHeart from '../assets/iconHeart.svg';
import iconGame from '../assets/iconGame.svg';
import iconScience from '../assets/iconScience.svg';
import iconCode from '../assets/iconCode.svg';
import iconBook from '../assets/iconBook.svg';
import iconHeartbeat from '../assets/iconHeartbeat.svg';
import iconUmbrella from '../assets/iconUmbrella.svg';
import iconAll from '../assets/iconAll.svg';
import iconStudy from '../assets/iconStudy.svg';
import iconWork from '../assets/iconWork.svg';
import { HexColorPicker } from "react-colorful";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [customColor, setCustomColor] = useState("#FFFFFF");
  const [selectedIcon, setSelectedIcon] = useState(iconSmile);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showColorPickerModal, setShowColorPickerModal] = useState(false);
  const [colorHistory, setColorHistory] = useState([]);
  const [colorTab, setColorTab] = useState("basic");


  const colorOptions = [
    null,
    "#F24726", "#FAA810", "#FEF445", "#CEE741",
    "#0CA789", "#2D9BF0"
  ];

  const basicColors = [
    "#F9EBEA", "#F5EEF8", "#EAF2F8", "#E8F6F3", "#FEF9E7", "#F2F4F4",
    "#F5B7B1", "#D7BDE2", "#A9CCE3", "#A2D9CE", "#F9E79F", "#CCD1D1",
    "#EC7063", "#AF7AC5", "#5499C7", "#45B39D", "#F4D03F", "#99A3A4",
    "#B03A2E", "#76448A", "#1F618D", "#117A65", "#B7950B", "#616A6B",
    "#78281F", "#512E5F", "#154360", "#0B5345", "#7D6608", "#424949",
    
  ];

  const categories = [
    "Study", "Pet", "Work", "Workout", "Personal"
  ];

  const iconOptions = [
    { id: 'Pet', icon: iconPet },
    { id: 'computer', icon: iconComputer },
    { id: 'art', icon: iconArt },
    { id: 'smile', icon: iconSmile },
    { id: 'workout', icon: iconWorkout },
    { id: 'star', icon: iconPetStar },
    { id: 'heart', icon: iconHeart },
    { id: 'game', icon: iconGame },
    { id: 'science', icon: iconScience },
    { id: 'code', icon: iconCode },
    { id: 'book', icon: iconBook },
    { id: 'heartbeat', icon: iconHeartbeat },
    { id: 'umbrella', icon: iconUmbrella },
    { id: 'all', icon: iconAll },
    { id: 'study', icon: iconStudy },
    { id: 'work', icon: iconWork }
  ];

  useEffect(() => {
    // Load color history from localStorage if available
    const savedColors = localStorage.getItem('colorHistory');
    if (savedColors) {
      setColorHistory(JSON.parse(savedColors));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      title,
      startDate,
      endDate,
      startTime,
      endTime,
      color,
      description,
      category,
      icon: selectedIcon
    };
    console.log("Task saved:", task);
  };

  const handleClose = () => {
    window.history.back();
  };

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const selectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    setShowCategoryDropdown(false);
  };

  const handleColorSelect = (selectedColor) => {
    setColor(selectedColor);
  };

  const handleCustomColorSelect = () => {
    setColor(customColor);
    
    // Add to color history
    const newHistory = [customColor, ...colorHistory.slice(0, 11)];
    setColorHistory(newHistory);
    localStorage.setItem('colorHistory', JSON.stringify(newHistory));
    
    setShowColorPickerModal(false);
  };

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    setShowIconPicker(false);
  };

  const clearColorHistory = () => {
    setColorHistory([]);
    localStorage.removeItem('colorHistory');
  };

  return (
    <div className="flex flex-cols text-black-900 p-4 justify-between">
      {/* Icon Picker Overlay */}
      {showIconPicker && (
        <div className="fixed inset-0 bg-gray-400/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[16px] sm:text-[18px] font-poppins font-bold">Select an Icon</h2>
              <img
                className="w-5 h-5 sm:w-6 sm:h-6 object-contain mr-3 sm:mr-5 cursor-pointer"
                src={close}
                alt="close"
                onClick={() => setShowIconPicker(false)}
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {iconOptions.map((option) => (
                <button
                  key={option.id}
                  className="flex flex-col bg-[#DDDDDD] rounded-full items-center p-5 hover:bg-[#A7A7A7]"
                  onClick={() => handleIconSelect(option.icon)}
                >
                  <img
                    src={option.icon}
                    alt={option.id}
                    className="w-10 h-10 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Color Picker Modal with Grid */}
      {showColorPickerModal && (
        <div className="fixed inset-0 bg-gray-400/40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-75 h-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[20px] sm:text-[22px] font-fredoka font-reg">Colors</h2>
              <img
                className="w-5 h-5 sm:w-6 sm:h-6 object-contain mr-3 sm:mr-5 cursor-pointer"
                src={close}
                alt="close"
                onClick={() => setShowColorPickerModal(false)}
              />
            </div>
            
            {/* Divider */}
            <div className="w-full my-4 border-t border-gray-300 "></div>

            {/* Tab Content */}
            {colorTab === "basic" ? (
              <div className="flex mb-4 justify-center">
                {/* Color Grid */}
                <div className="w-fit h-fit grid grid-cols-6  mb-4 border-2">
                  {basicColors.map((c, idx) => (
                    <button
                      key={idx}
                      className={`w-9 h-9 ${color === c ? "ring-[1.5px] ring-black" : ""}`}
                      style={{ backgroundColor: c }}
                      onClick={() => {
                        handleColorSelect(c);
                        setShowColorPickerModal(false);
                      }}
                    />
                    
                  ))}
                </div>
              </div>
            ) : ( <div className="flex flex-col items-center justify-center mb-6"> <HexColorPicker color={customColor}
                  onChange={setCustomColor}
                  className="w-full h-48 mb-4 border-[2px] rounded-xl"
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

            {/* Color History Section */}
            <div className="flex justify-around gap-18 items-center mb-2">
              <div className="flex flex-col font-poppins font-bold text-[16px]">COLOR HISTORY</div>
              <button 
                onClick={clearColorHistory}
                className="flex text-[10px] underline font-poppins font-reg"
              >
                edit
              </button>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="grid grid-cols-6 gap-2">
                {colorHistory.length > 0 ? (
                  colorHistory.map((color, index) => (
                    <button
                      key={index}
                      className="w-7 h-7 border-[1.5px] rounded-full"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setColor(color);
                        setShowColorPickerModal(false);
                      }}
                    />
                  ))
                ) : (
                  <div className="col-span-6 text-center text-sm text-gray-500 py-2">
                    No color history yet
                  </div>
                )}
              </div>
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
      )}

      {/* Header */}
      <div className="mb-4">
        <h1 className="flex text-[20px] font-poppins font-bold">Add a new <br /> task!</h1>
      </div>

      <div className="flex flex-cols items-center justify-center">
        <form onSubmit={handleSubmit} className="w-70 h-auto sm:w-115">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div
              className="w-30 h-30 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: color || "#E5E7EB",
                border: color ? 'none' : '1px solid #9CA3AF'
              }}
              onClick={() => setShowIconPicker(true)}
            >
              <img
                src={selectedIcon}
                alt="Task Icon"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <p className="flex text-[16px] font-poppins font-bold">TITLE</p>
            <div className="flex text-[14px] justify-center font-poppins font-reg">
              <input
                type="text"
                placeholder="What is your title?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg border-[1.5px]"
              />
            </div>
          </div>

          {/* Start Date/Time */}
          <div className="flex flex-cols items-center justify-center gap-3 mb-4">
            <div className="">
              <p className="flex text-[16px] font-poppins font-bold">START DATE</p>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-33 h-auto sm:w-56 p-3 rounded-lg border-[1.5px]"
              />
            </div>
            <div className="flex flex-col">
              <p className="flex text-[16px] font-poppins font-bold">START TIME</p>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-33 h-auto sm:w-56 p-3 rounded-lg border-[1.5px]"
              />
            </div>
          </div>

          {/* End Date/Time */}
          <div className="flex flex-cols items-center justify-center gap-3 mb-4">
            <div className="">
              <p className="flex text-[16px] font-poppins font-bold">END DATE</p>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-33 h-auto sm:w-56 p-3 rounded-lg border-[1.5px]"
              />
            </div>
            <div className="flex flex-col">
              <p className="flex text-[16px] font-poppins font-bold">END TIME</p>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-33 h-auto sm:w-56 p-3 rounded-lg border-[1.5px]"
              />
            </div>
          </div>

          {/* Color Picker */}
          <div className="flex items-center justify-evenly mb-4">
            <label className="flex item-center font-semibold">COLOR</label>
            <div className="flex gap-3">
              {colorOptions.map((c, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`w-5 h-5 rounded-full border ${color === c ? "ring-[1.5px] ring-black" : ""}`}
                  style={{
                    backgroundColor: c || "transparent",
                    border: idx === 0 ? "1px dashed #9CA3AF" : "1px solid transparent"
                  }}
                  onClick={() => handleColorSelect(c)}
                ></button>
              ))}
              <button
                type="button"
                onClick={() => setShowColorPickerModal(true)}
                className="w-5 h-5 flex items-center justify-center"
              >
                <img
                  className="w-5 h-5 object-contain"
                  src={CustomColor}
                  alt="CustomColor"
                />
              </button>
            </div>
          </div>

          {/* Description & Category */}
          <div className="mb-10">
            <div className="flex items-center justify-between gap-2 mb-2">
              <label className="text-[16px] font-poppins font-bold">DESCRIPTION</label>
              <div className="flex items-center gap-1 relative">
                <span className="text-[16px] font-poppins font-bold">ADD TO CATEGORY</span>
                <div className="relative">
                  <img
                    className="w-5 h-5 sm:w-7 sm:h-7 object-contain cursor-pointer"
                    src={AddToCate}
                    alt="AddToCate"
                    onClick={toggleCategoryDropdown}
                  />
                  {showCategoryDropdown && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        {categories.map((category, index) => (
                          <div
                            key={index}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={() => selectCategory(category)}
                          >
                            {category}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-70 h-auto sm:w-115 sm:h-40 text-[14px] font-poppins font-bold items-center justify-between border p-2 border-black border-[1.5px] rounded-xl"
              placeholder="Your description"
            ></textarea>
          </div>

          {/* Save Button */}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="flex justify-center items-center w-35 h-10 text-[14px] font-bold bg-[#E7FFAE] hover:bg-lime-300 p-2 border-black border-[1.5px] rounded-lg"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>

      {/* Close Button */}
      <div>
        <img
          className="w-5 h-5 sm:w-7 sm:h-7 object-contain mr-3 sm:mr-5 cursor-pointer"
          src={close}
          alt="close"
          onClick={handleClose}
        />
      </div>
    </div>
  );
};

export default AddTask;