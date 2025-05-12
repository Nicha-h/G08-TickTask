import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ColorPickerModal from '../components/modals/ColorPickerModal.jsx';
import IconPickerModal from '../components/modals/IconPickerModal.jsx';
import DatePickerModal from '../components/modals/DatePickerModal.jsx';
import TimePickerModal from '../components/modals/TimePickerModal.jsx';
import close from '../assets/close.svg';
import AddToCate from '../assets/AddToCate.svg';
import CustomColor from '../assets/CustomColor.svg';
import iconSmile from '../assets/iconSmile.svg';

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
  const [selectedIcon, setSelectedIcon] = useState(iconSmile);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showColorPickerModal, setShowColorPickerModal] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const colorOptions = [
    null,
    "#F24726", "#FAA810", "#FEF445", "#CEE741",
    "#0CA789", "#2D9BF0", "#8948E1",
  ];

  const categories = [
    "Study", "Pet", "Work", "Workout", "Personal"
  ];

  const navigate = useNavigate();

  const saveTask = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTask();
  };

  const handleClose = () => {
    navigate(-1);
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

  return (
    <div className="text-black-900 p-4">
      {/* Header Row with Close Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-poppins font-bold leading-snug">
          Add a new <br /> task!
        </h1>
        <img
          className="w-5 h-5 sm:w-7 sm:h-7 object-contain cursor-pointer"
          src={close}
          alt="close"
          onClick={handleClose}
        />
      </div>

      {/* Icon Picker Modal */}
      {showIconPicker && (
        <IconPickerModal
          selectedIcon={selectedIcon}
          onSelect={(icon) => setSelectedIcon(icon)}
          onClose={() => setShowIconPicker(false)}
        />
      )}

      {/* Color Picker Modal */}
      {showColorPickerModal && (
        <ColorPickerModal
          currentColor={color}
          onSelect={handleColorSelect}
          onClose={() => setShowColorPickerModal(false)}
        />
      )}

      {/* Date Picker Modals */}
      {showStartDatePicker && (
        <DatePickerModal
          initialDate={startDate}
          onSelect={(date) => setStartDate(date)}
          onClose={() => setShowStartDatePicker(false)}
        />
      )}
      {showEndDatePicker && (
        <DatePickerModal
          initialDate={endDate}
          onSelect={(date) => setEndDate(date)}
          onClose={() => setShowEndDatePicker(false)}
        />
      )}

      {/* Time Picker Modals */}
      {showStartTimePicker && (
        <TimePickerModal
          initialTime={startTime}
          onSelect={(time) => setStartTime(time)}
          onClose={() => setShowStartTimePicker(false)}
        />
      )}
      {showEndTimePicker && (
        <TimePickerModal
          initialTime={endTime}
          onSelect={(time) => setEndTime(time)}
          onClose={() => setShowEndTimePicker(false)}
        />
      )}

      {/* Main Form */}
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
            <p className="flex text-[15px] sm:text-[16px] font-poppins font-bold">TITLE</p>
            <div className="flex text-[14px] justify-center font-poppins font-reg">
              <input
                type="text"
                placeholder="What is your title?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg text-[14px] border-[1.5px] border-black placeholder:text-[#A7A7A7]"
              />
            </div>
          </div>

          {/* Start Date/Time */}
          <div className="flex flex-cols items-center justify-center gap-3 mb-4">
            <div>
              <p className="text-[15px] sm:text-[16px] font-poppins font-bold">START DATE</p>
              <div
                className="relative w-33 sm:w-56 p-3 rounded-lg border-[1.5px] cursor-pointer"
                onClick={() => setShowStartDatePicker(true)}
              >
                <div className={`font-poppins text-[14px] ${startDate ? "text-black" : "text-[#A7A7A7]"}`}>
                  {startDate || "DD/MM/YYYY"}
                </div>
              </div>
            </div>
            <div>
              <p className="text-[15px] sm:text-[16px] font-poppins font-bold">START TIME</p>
              <div
                className="relative w-33 sm:w-56 p-3 rounded-lg border-[1.5px] cursor-pointer"
                onClick={() => setShowStartTimePicker(true)}
              >
                <div className={`font-poppins text-[14px] ${startTime ? "text-black" : "text-[#A7A7A7]"}`}>
                  {startTime ?
                    `${parseInt(startTime.split(':')[0]) % 12 || 12}:${startTime.split(':')[1]} ${parseInt(startTime.split(':')[0]) >= 12 ? 'PM' : 'AM'}` :
                    "HH:MM"}
                </div>
              </div>
            </div>
          </div>

          {/* End Date/Time */}
          <div className="flex flex-cols items-center justify-center gap-3 mb-4">
            <div>
              <p className="text-[15px] sm:text-[16px] font-poppins font-bold">END DATE</p>
              <div
                className="relative w-33 sm:w-56 p-3 rounded-lg border-[1.5px] cursor-pointer"
                onClick={() => setShowEndDatePicker(true)}
              >
                <div className={`font-poppins text-[14px] ${endDate ? "text-black" : "text-[#A7A7A7]"}`}>
                  {endDate || "DD/MM/YYYY"}
                </div>
              </div>
            </div>
            <div>
              <p className="text-[15px] sm:text-[16px] font-poppins font-bold">END TIME</p>
              <div
                className="relative w-33 sm:w-56 p-3 rounded-lg border-[1.5px] cursor-pointer"
                onClick={() => setShowEndTimePicker(true)}
              >
                <div className={`font-poppins text-[14px] ${endTime ? "text-black" : "text-[#A7A7A7]"}`}>
                  {endTime ?
                    `${parseInt(endTime.split(':')[0]) % 12 || 12}:${endTime.split(':')[1]} ${parseInt(endTime.split(':')[0]) >= 12 ? 'PM' : 'AM'}` :
                    "HH:MM"}
                </div>
              </div>
            </div>
          </div>

          {/* Color Picker */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-evenly mb-4 sm:gap-0">
            <label className="text-[16px] font-poppins font-bold">COLOR</label>
            <div className="flex gap-3 flex-wrap justify-center sm:justify-start">
              {colorOptions.map((c, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border ${color === c ? "ring-[1.5px] ring-black" : ""}`}
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
                className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
              >
                <img
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  src={CustomColor}
                  alt="CustomColor"
                />
              </button>
            </div>
          </div>

          {/* Description & Category */}
          <div className="mb-10">
            <div className="flex items-center justify-between gap-2 ">
              <label className="text-[15px] sm:text-[16px] font-poppins font-bold">DESCRIPTION</label>
              <div className="flex items-center gap-1 relative">
                <span className="text-[15px] sm:text-[16px] font-poppins font-bold">ADD TO CATEGORY</span>
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

            {category && (
              <div className="flex mb-2 items-center font-poppins font-bold">
                <span className="bg-gray-200 text-[15px] px-2 py-1 rounded mr-2">
                  {category}
                </span>
                <button
                  onClick={() => setCategory("")}
                  className="flex text-[10px] mt-2 underline font-poppins font-reg text-red-500"
                >
                  Remove
                </button>
              </div>
            )}

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-70 sm:w-115 sm:h-40 text-[14px] font-poppins font-reg p-2 border-black border-[1.5px] rounded-xl placeholder:text-[#A7A7A7]"
              placeholder="Your description"
            ></textarea>
          </div>

          {/* Save Button */}
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={() => {
                saveTask();
                navigate(-1);
              }}
              className="w-35 h-10 text-[14px] font-bold bg-[#E7FFAE] hover:bg-lime-300 p-2 border-black border-[1.5px] rounded-lg"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;