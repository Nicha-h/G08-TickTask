import { useEffect, useState } from "react";
import ColorPickerModal from "./ColorPickerModal.jsx";
import IconPickerModal from "./IconPickerModal.jsx";
import DatePickerModal from "./DatePickerModal.jsx";
import TimePickerModal from "./TimePickerModal.jsx";
import close from "../../assets/close.svg";
import AddToCate from "../../assets/AddToCate.svg";
import CustomColor from "../../assets/CustomColor.svg";
import iconSmile from "../../assets/iconSmile.svg";
import axios from "axios";
import DeleteTask from "./DeleteTask.jsx";
import { iconComponents } from "./icon.jsx"; 

const TaskSettingModal = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState(task?.Task_Title || "");
  const [startDate, setStartDate] = useState(task?.Task_Start_Date || "");
  const [endDate, setEndDate] = useState(task?.Task_End_Date || "");
  const [startTime, setStartTime] = useState(task?.Task_Start_Time || "");
  const [endTime, setEndTime] = useState(task?.Task_End_Time || "");
  const [color, setColor] = useState(task?.Task_Color || null);
  const [description, setDescription] = useState(task?.Task_Description || "");
  const [category, setCategory] = useState([]); 
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(task?.Task_Icon || iconSmile);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showColorPickerModal, setShowColorPickerModal] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  
  const colorOptions = [
    null,
    "#F24726",
    "#FAA810",
    "#FEF445",
    "#CEE741",
    "#0CA789",
    "#2D9BF0",
    "#8948E1",
  ];

  // Load categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/category", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategory(response.data || []); 
      } catch (err) {
        console.error("Failed to fetch categories", err);
        setError("Failed to load categories");
      }
    };

    if (token) {
      fetchCategories();
    }
  }, [token]);

  // Initialize existing category if task has one
  useEffect(() => {
    if (task?.CategoryId && category.length > 0) {
      const existingCategory = category.find(cat => cat.CategoryId === task.CategoryId);
      if (existingCategory) {
        setSelectedCategoryId(existingCategory.CategoryId);
        setSelectedCategoryName(existingCategory.Category_Name);
        setCategoryColor(existingCategory.Category_Color);
      }
    }
  }, [task, category]);
   
  const formatTimeDisplay = (time) => {
    if (!time) return "HH:MM";
    const [hours, minutes] = time.split(":");
    const period = parseInt(hours) >= 12 ? "PM" : "AM";
    const formattedHours = parseInt(hours) % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    
    if (dateStr.includes('/')) {
      const [dd, mm, yyyy] = dateStr.split('/');
      if (!dd || !mm || !yyyy) return null;
      return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
    }
    
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateStr;
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    setLoading(true);
    setError("");

    try {

      console.log("Full task object:", task);
      console.log("Available task properties:", Object.keys(task || {}));
    
      const taskId = task?.TaskID ||  
                    task?.taskId || 
                    task?.Task_ID || 
                    task?.id || 
                    task?.ID || 
                    task?.TaskId ||
                    task?.task_id;
      
      console.log("Extracted Task ID:", taskId);
      
      if (!taskId) {
        console.error("Task ID not found. Task object:", task);
        throw new Error(`Task ID is missing. Available properties: ${Object.keys(task || {}).join(', ')}`);
      }
      
      const taskData = {
        Task_Title: title.trim(),
        Task_Description: description.trim(),
        Task_Start_Date: formatDate(startDate),
        Task_End_Date: formatDate(endDate),
        Task_Start_Time: startTime || null,
        Task_End_Time: endTime || null,
        Task_Color: color,
        Task_Icon: selectedIcon,
      };

      const response = await axios.put(
        `http://localhost:3000/api/tasks/${taskId}`, 
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Task updated successfully:", response.data);
      if (selectedCategoryId) {
        try {
          await axios.put(
            `http://localhost:3000/api/category/${taskId}/assign`,
            { CategoryId: selectedCategoryId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          console.log("Category assigned successfully");
        } catch (categoryError) {
          console.error("Error assigning category:", categoryError);
        
        }
      }

 
      setShowIconPicker(false);
      setShowColorPickerModal(false);
      
       if (onSave) {
        const updatedTask = {
          ...task, 
          TaskID: taskId,
          Task_Title: title.trim(),
          Task_Description: description.trim(),
          Task_Start_Date: formatDate(startDate),
          Task_End_Date: formatDate(endDate),
          Task_Start_Time: startTime,
          Task_End_Time: endTime,
          Task_Color: color,
          Task_Icon: selectedIcon,
          CategoryID: selectedCategoryId,
        };
        onSave(updatedTask);
      }
      
      if (onClose) {
        onClose();
      }
    
      if (onClose) {
        onClose();
      }

    } catch (error) {
      console.error("Error saving task:", error);
      
      let errorMessage = "Failed to save task";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
  setLoading(true);
  setError("");

  try {
    const taskId = task?.TaskID ||  
                  task?.taskId || 
                  task?.Task_ID || 
                  task?.id || 
                  task?.ID || 
                  task?.TaskId ||
                  task?.task_id;
    
    if (!taskId) {
      throw new Error(`Task ID is missing. Available properties: ${Object.keys(task || {}).join(', ')}`);
    }

    await axios.delete(`http://localhost:3000/api/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Task deleted successfully");

    if (onSave) {
      onSave(null);
    }

    if (onClose) {
      onClose();
    }
    setShowDeleteModal(false);

  } catch (error) {
    console.error("Error deleting task:", error);
    
    let errorMessage = "Failed to delete task";
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};

  const handleColorSelect = (selectedColor) => {
    setColor(selectedColor);
  };

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const selectCategory = (selectedCategory) => {
    setSelectedCategoryId(selectedCategory.CategoryId); 
    setSelectedCategoryName(selectedCategory.Category_Name); 
    setCategoryColor(selectedCategory.Category_Color); 
    setShowCategoryDropdown(false);
  };

  const parseDateFromPicker = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  // Don't render if task is not provided
  if (!task) {
    return null;
  }

  return (
    <div className="text-black-900 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-poppins font-bold">Edit Task</h1>
        <img
          className="w-5 h-5 sm:w-7 sm:h-7 object-contain cursor-pointer"
          src={close}
          alt="close"
          onClick={onClose}
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className="w-30 h-30 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              backgroundColor: color || "#E5E7EB",
              border: color ? "none" : "1px solid #9CA3AF",
            }}
            onClick={() => setShowIconPicker(true)}
          >
            <img
              src={iconComponents?.[selectedIcon] || selectedIcon}
              alt="Task Icon"
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <p className="flex text-[15px] sm:text-[16px] font-poppins font-bold">
            TITLE *
          </p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg text-[14px] border-[1.5px] border-black"
            required
          />
        </div>

        {/* Start Date/Time */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <p className="text-[15px] sm:text-[16px] font-poppins font-bold">
              START DATE
            </p>
            <div
              className="p-3 rounded-lg border-[1.5px] cursor-pointer"
              onClick={() => setShowStartDatePicker(true)}
            >
              {startDate
                ? startDate.split("-").reverse().join("/")
                : "Select date"}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[15px] sm:text-[16px] font-poppins font-bold">
              START TIME
            </p>
            <div
              className="p-3 rounded-lg border-[1.5px] cursor-pointer"
              onClick={() => setShowStartTimePicker(true)}
            >
              {startTime ? formatTimeDisplay(startTime) : "Select time"}
            </div>
          </div>
        </div>

        {/* End Date/Time */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <p className="text-[15px] sm:text-[16px] font-poppins font-bold">
              END DATE
            </p>
            <div
              className="p-3 rounded-lg border-[1.5px] cursor-pointer"
              onClick={() => setShowEndDatePicker(true)}
            >
              {endDate ? endDate.split("-").reverse().join("/") : "Select date"}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-[15px] sm:text-[16px] font-poppins font-bold">
              END TIME
            </p>
            <div
              className="p-3 rounded-lg border-[1.5px] cursor-pointer"
              onClick={() => setShowEndTimePicker(true)}
            >
              {endTime ? formatTimeDisplay(endTime) : "Select time"}
            </div>
          </div>
        </div>

        {/* Color Picker */}
        <div className="mb-4">
          <p className="text-[16px] font-poppins font-bold">COLOR</p>
          <div className="flex gap-3 mt-2">
            {colorOptions.map((c, idx) => (
              <button
                key={idx}
                type="button"
                className={`w-6 h-6 rounded-full ${
                  color === c ? "ring-2 ring-black" : ""
                }`}
                style={{
                  backgroundColor: c || "transparent",
                  border: !c ? "1px dashed #9CA3AF" : "none",
                }}
                onClick={() => handleColorSelect(c)}
              />
            ))}
            <button
              type="button"
              onClick={() => setShowColorPickerModal(true)}
              className="w-6 h-6 flex items-center justify-center"
            >
              <img src={CustomColor} alt="Custom Color" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Description & Category */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[16px] font-poppins font-bold">DESCRIPTION</p>
            <div className="flex items-center relative">
              <p className="text-[16px] font-poppins font-bold mr-2">
                CATEGORY
              </p>
              <img
                src={AddToCate}
                alt="Add Category"
                className="w-5 h-5 cursor-pointer"
                onClick={toggleCategoryDropdown}
              />

              {showCategoryDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white border rounded shadow-lg z-10 max-h-40 overflow-y-auto">
                  {category.length > 0 ? (
                    category.map((cat) => (
                      <div
                        key={cat.CategoryId}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectCategory(cat)}
                      >
                        {cat.Category_Name} 
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No categories available</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {selectedCategoryName && (
            <div className="flex items-center mb-2">
              <span 
                className="px-2 py-1 rounded mr-2 text-sm"
                style={{ backgroundColor: categoryColor || "#E5E7EB" }}
              >
                {selectedCategoryName}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategoryId(null);
                  setSelectedCategoryName("");
                  setCategoryColor("");
                }}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          )}

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border-[1.5px] border-black rounded-lg min-h-[100px]"
            placeholder="Enter description..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex">
          <button
            type="button"
            onClick={handleDelete}
            className="flex justify-start px-4 py-2 bg-[#ff6868] rounded-lg border border-black font-bold hover:bg-red-400 ml-4"
            disabled={loading}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded-lg border border-black font-bold hover:bg-gray-200 ml-auto"
            disabled={loading}
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#E7FFAE] rounded-lg border border-black font-bold hover:bg-lime-200 ml-4 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "SAVING..." : "SAVE"}
          </button>
        </div>
      </form>

      {/* Modals */}
      {showIconPicker && (
        <IconPickerModal
          selectedIcon={selectedIcon}
          onSelect={(icon) => setSelectedIcon(icon)}
          onClose={() => setShowIconPicker(false)}
        />
      )}

      {showColorPickerModal && (
        <ColorPickerModal
          currentColor={color}
          onSelect={handleColorSelect}
          onClose={() => setShowColorPickerModal(false)}
        />
      )}

      {showStartDatePicker && (
        <DatePickerModal
          initialDate={
            startDate ? startDate.split("-").reverse().join("/") : ""
          }
          onSelect={(date) => setStartDate(parseDateFromPicker(date))}
          onClose={() => setShowStartDatePicker(false)}
        />
      )}

      {showEndDatePicker && (
        <DatePickerModal
          initialDate={endDate ? endDate.split("-").reverse().join("/") : ""}
          onSelect={(date) => setEndDate(parseDateFromPicker(date))}
          onClose={() => setShowEndDatePicker(false)}
        />
      )}

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

      {showDeleteModal && (
        <DeleteTask
          onClose={() => setShowDeleteModal(false)}
          task={task}
          onDelete={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default TaskSettingModal;