import React, { useState, useEffect } from "react";
import ColorPickerModal from "./ColorPickerModal";
import IconPickerModal from "./IconPickerModal";
import DatePickerModal from "./DatePickerModal";
import TimePickerModal from "./TimePickerModal";
import close from "../../assets/close.svg";
import AddToCate from "../../assets/AddToCate.svg";
import CustomColor from "../../assets/CustomColor.svg";
import iconSmile from "../../assets/iconSmile.svg";

// Import all icons
import iconAll from "../../assets/iconAll.svg";
import iconPet from "../../assets/iconPet.svg";
import iconStudy from "../../assets/iconStudy.svg";
import iconWork from "../../assets/iconWork.svg";
import iconWorkout from "../../assets/iconWorkout.svg";
import iconComputer from "../../assets/iconComputer.svg";
import iconArt from "../../assets/iconArt.svg";
import iconStar from "../../assets/iconStar.svg";
import iconHeart from "../../assets/iconHeart.svg";
import iconGame from "../../assets/iconGame.svg";
import iconScience from "../../assets/iconScience.svg";
import iconCode from "../../assets/iconCode.svg";
import iconBook from "../../assets/iconBook.svg";
import iconHeartbeat from "../../assets/iconHeartbeat.svg";
import iconUmbrella from "../../assets/iconUmbrella.svg";

const EditTaskModal = ({ task, categories, onSave, onClose }) => {
  // Initialize state with task data
  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    category: task.category || "",
    color: task.color || null,
    icon: task.icon || iconSmile,
    startTime: task.startTime || "00:00",
    endTime: task.endTime || "00:00",
    startDate: task.startDate || "",
    endDate: task.endDate || ""
  });

  // Modal states
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  // Color options
  const colorOptions = [
    null,
    "#F24726", "#FAA810", "#FEF445", "#CEE741",
    "#0CA789", "#2D9BF0", "#8948E1",
  ];

  // Icon options
  const iconOptions = [
    { id: "iconAll", src: iconAll, alt: "All icon" },
    { id: "iconWork", src: iconWork, alt: "Work icon" },
    { id: "iconPet", src: iconPet, alt: "Pet icon" },
    { id: "iconStudy", src: iconStudy, alt: "Study icon" },
    { id: "iconWorkout", src: iconWorkout, alt: "Workout icon" },
    { id: "iconComputer", src: iconComputer, alt: "Computer icon" },
    { id: "iconArt", src: iconArt, alt: "Art icon" },
    { id: "iconSmile", src: iconSmile, alt: "Smile icon" },
    { id: "iconStar", src: iconStar, alt: "Star icon" },
    { id: "iconHeart", src: iconHeart, alt: "Heart icon" },
    { id: "iconGame", src: iconGame, alt: "Game icon" },
    { id: "iconScience", src: iconScience, alt: "Science icon" },
    { id: "iconCode", src: iconCode, alt: "Code icon" },
    { id: "iconBook", src: iconBook, alt: "Book icon" },
    { id: "iconHeartbeat", src: iconHeartbeat, alt: "Heartbeat icon" },
    { id: "iconUmbrella", src: iconUmbrella, alt: "Umbrella icon" },
  ];

  // Format time display
  const formatTimeDisplay = (time) => {
    if (!time || time === "00:00") return "HH:MM";
    const [hours, minutes] = time.split(':');
    const period = parseInt(hours) >= 12 ? 'PM' : 'AM';
    const formattedHours = parseInt(hours) % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      ...formData,
      time: `${formData.startTime}-${formData.endTime}`, // Combined time for display
    };
    onSave(updatedTask);
  };

  // Select category
  const selectCategory = (selectedCategory) => {
    handleInputChange('category', selectedCategory);
    setShowCategoryDropdown(false);
  };

  // Select color
  const handleColorSelect = (selectedColor) => {
    handleInputChange('color', selectedColor);
    setShowColorPicker(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold"></h2>
          <button onClick={onClose}>
            <img src={close} alt="Close" className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Icon Picker */}
          <div className="flex justify-center mb-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: formData.color || "#E5E7EB",
                border: formData.color ? 'none' : '1px solid #9CA3AF'
              }}
              onClick={() => setShowIconPicker(true)}
            >
              <img 
                src={formData.icon} 
                alt="Task Icon" 
                className="w-12 h-12 object-contain" 
              />
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block font-bold mb-2">TITLE</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Date & Time Section */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Start Date */}
            <div>
              <label className="block font-bold mb-2">START DATE</label>
              <div
                className="p-3 border border-gray-300 rounded-lg cursor-pointer"
                onClick={() => setShowStartDatePicker(true)}
              >
                {formData.startDate || "Select date"}
              </div>
            </div>
            
            {/* Start Time */}
            <div>
              <label className="block font-bold mb-2">START TIME</label>
              <div
                className="p-3 border border-gray-300 rounded-lg cursor-pointer"
                onClick={() => setShowStartTimePicker(true)}
              >
                {formatTimeDisplay(formData.startTime)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* End Date */}
            <div>
              <label className="block font-bold mb-2">END DATE</label>
              <div
                className="p-3 border border-gray-300 rounded-lg cursor-pointer"
                onClick={() => setShowEndDatePicker(true)}
              >
                {formData.endDate || "Select date"}
              </div>
            </div>
            
            {/* End Time */}
            <div>
              <label className="block font-bold mb-2">END TIME</label>
              <div
                className="p-3 border border-gray-300 rounded-lg cursor-pointer"
                onClick={() => setShowEndTimePicker(true)}
              >
                {formatTimeDisplay(formData.endTime)}
              </div>
            </div>
          </div>

          {/* Color Picker */}
          <div className="mb-4">
            <label className="block font-bold mb-2">COLOR</label>
            <div className="flex gap-2">
              {colorOptions.map((c, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`w-6 h-6 rounded-full ${formData.color === c ? "ring-2 ring-black" : ""}`}
                  style={{ 
                    backgroundColor: c || "transparent", 
                    border: !c ? "1px dashed #9CA3AF" : "none" 
                  }}
                  onClick={() => handleInputChange('color', c)}
                />
              ))}
              <button
                type="button"
                onClick={() => setShowColorPicker(true)}
                className="w-6 h-6 flex items-center justify-center"
              >
                <img src={CustomColor} alt="Custom Color" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block font-bold mb-2">CATEGORY</label>
            <div className="relative">
              <div
                className="p-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <span>{formData.category || "Select category"}</span>
                <img src={AddToCate} alt="Add category" className="w-5 h-5" />
              </div>
              
              {showCategoryDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectCategory(cat)}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block font-bold mb-2">DESCRIPTION</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg min-h-[100px]"
              placeholder="Enter description..."
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-[#E7FFAE] text-black py-3 px-4 rounded-lg border border-black font-bold hover:bg-[#D4F58D] transition"
          >
            SAVE CHANGES
          </button>
        </form>
      </div>

      {/* Modals */}
      {showIconPicker && (
        <IconPickerModal
          selectedIcon={formData.icon}
          onSelect={(icon) => {
            handleInputChange('icon', icon);
            setShowIconPicker(false);
          }}
          onClose={() => setShowIconPicker(false)}
          iconOptions={iconOptions}
        />
      )}

      {showColorPicker && (
        <ColorPickerModal
          currentColor={formData.color}
          onSelect={handleColorSelect}
          onClose={() => setShowColorPicker(false)}
          colorOptions={colorOptions}
        />
      )}

      {showStartDatePicker && (
        <DatePickerModal
          initialDate={formData.startDate}
          onSelect={(date) => {
            handleInputChange('startDate', date);
            setShowStartDatePicker(false);
          }}
          onClose={() => setShowStartDatePicker(false)}
        />
      )}

      {showEndDatePicker && (
        <DatePickerModal
          initialDate={formData.endDate}
          onSelect={(date) => {
            handleInputChange('endDate', date);
            setShowEndDatePicker(false);
          }}
          onClose={() => setShowEndDatePicker(false)}
        />
      )}

      {showStartTimePicker && (
        <TimePickerModal
          initialTime={formData.startTime}
          onSelect={(time) => {
            handleInputChange('startTime', time);
            setShowStartTimePicker(false);
          }}
          onClose={() => setShowStartTimePicker(false)}
        />
      )}

      {showEndTimePicker && (
        <TimePickerModal
          initialTime={formData.endTime}
          onSelect={(time) => {
            handleInputChange('endTime', time);
            setShowEndTimePicker(false);
          }}
          onClose={() => setShowEndTimePicker(false)}
        />
      )}
    </div>
  );
};

export default EditTaskModal;