import { useState, useEffect } from "react";
import addcate from "../assets/addcate.svg";
import iconAll from "../assets/iconAll.svg";
import iconPet from "../assets/iconPet.svg";
import iconStudy from "../assets/iconStudy.svg";
import iconWork from "../assets/iconWork.svg";
import iconWorkout from "../assets/iconWorkout.svg";
import edit from "../assets/edit.svg";
import iconFilter from "../assets/iconFilter.svg";
import close from "../assets/close.svg";
import iconTickWH from "../assets/iconTickWH.svg";
import iconComputer from '../assets/iconComputer.svg';
import iconArt from '../assets/iconArt.svg';
import iconSmile from '../assets/iconSmile.svg';
import iconStar from '../assets/iconStar.svg';
import iconHeart from '../assets/iconHeart.svg';
import iconGame from '../assets/iconGame.svg';
import iconScience from '../assets/iconScience.svg';
import iconCode from '../assets/iconCode.svg';
import iconBook from '../assets/iconBook.svg';
import iconHeartbeat from '../assets/iconHeartbeat.svg';
import iconUmbrella from '../assets/iconUmbrella.svg';
import { useMediaQuery } from 'react-responsive';



const initialCategories = [
  { name: "All", color: "bg-purple-300", progress: 40, icon: iconAll, tasksCount: 9 },
  { name: "Pet", color: "bg-rose-200", progress: 70, icon: iconPet, tasksCount: 5 },
  { name: "Study", color: "bg-yellow-200", progress: 88, icon: iconStudy, tasksCount: 3 },
  { name: "Work", color: "bg-sky-200", progress: 20, icon: iconWork, tasksCount: 2 },
  { name: "Workout", color: "bg-pink-200", progress: 60, icon: iconWorkout, tasksCount: 1 },
];

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


  // Add more icons here as needed
];

const colorOptions = [
  { id: "bg-purple-300", class: "bg-purple-300" },
  { id: "bg-rose-200", class: "bg-rose-200" },
  { id: "bg-yellow-200", class: "bg-yellow-200" },
  { id: "bg-sky-200", class: "bg-sky-200" },
  { id: "bg-pink-200", class: "bg-pink-200" },
  { id: "bg-green-200", class: "bg-green-200" },
  { id: "bg-blue-200", class: "bg-blue-200" },
  { id: "bg-white", class: "bg-white" },
  { id: "bg-orange-200", class: "bg-orange-200" },
];

const initialTasks = [
  // All Tasks
  { id: 1, title: "TASK 1", description: "Description", time: "00:00-00:00", category: "All", completed: false },
  { id: 2, title: "TASK 2", description: "Description", time: "00:00-00:00", category: "All", completed: false },
  { id: 3, title: "TASK 3", description: "Description", time: "00:00-00:00", category: "All", completed: false },
  { id: 4, title: "TASK 4", description: "Description", time: "00:00-00:00", category: "All", completed: false },
  { id: 5, title: "TASK 5", description: "Description", time: "00:00-00:00", category: "All", completed: false },
  { id: 6, title: "TASK 6", description: "Description", time: "00:00-00:00", category: "All", completed: false },
  { id: 7, title: "TASK 7", description: "Description", time: "00:00-00:00", category: "All", completed: true },
  { id: 8, title: "TASK 8", description: "Description", time: "00:00-00:00", category: "All", completed: true },
  { id: 9, title: "TASK 9", description: "Description", time: "00:00-00:00", category: "All", completed: true },
  
  // Pet Tasks
  { id: 10, title: "PET TASK 1", description: "Pet care", time: "08:00-09:00", category: "Pet", completed: false },
  { id: 11, title: "PET TASK 2", description: "Feeding", time: "12:00-12:30", category: "Pet", completed: false },
  { id: 12, title: "PET TASK 3", description: "Grooming", time: "15:00-16:00", category: "Pet", completed: false },
  { id: 13, title: "PET TASK 4", description: "Vet visit", time: "10:00-11:00", category: "Pet", completed: false },
  { id: 14, title: "PET TASK 5", description: "Play time", time: "17:00-18:00", category: "Pet", completed: true },
  
  // Study Tasks
  { id: 15, title: "STUDY TASK 1", description: "Math homework", time: "09:00-11:00", category: "Study", completed: false },
  { id: 16, title: "STUDY TASK 2", description: "Reading", time: "14:00-15:00", category: "Study", completed: false },
  { id: 17, title: "STUDY TASK 3", description: "Research", time: "16:00-17:00", category: "Study", completed: true },
  
  // Work Tasks
  { id: 18, title: "WORK TASK 1", description: "Meeting", time: "09:00-10:00", category: "Work", completed: false },
  { id: 19, title: "WORK TASK 2", description: "Report", time: "13:00-15:00", category: "Work", completed: true },
  
  // Workout Tasks
  { id: 20, title: "WORKOUT TASK 1", description: "Morning run", time: "06:00-07:00", category: "Workout", completed: false }
];

export default function Category() {
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(initialCategories);
  const [tasks, setTasks] = useState(initialTasks);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState("all"); // "all", "incomplete", "complete"
  
  // States for edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryColor, setEditCategoryColor] = useState("");
  const [editCategoryIcon, setEditCategoryIcon] = useState("");
  const [iconSelectorOpen, setIconSelectorOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
const [newCategoryName, setNewCategoryName] = useState("");
const [newCategoryColor, setNewCategoryColor] = useState("bg-purple-300");
const [newCategoryIcon, setNewCategoryIcon] = useState(iconAll);
const [iconSelectorOpenForNew, setIconSelectorOpenForNew] = useState(false);


const handleAddCategory = () => {
  setNewCategoryName("");
  setNewCategoryColor("bg-purple-300");
  setNewCategoryIcon(iconAll);
  setAddModalOpen(true);
};

const saveNewCategory = () => {
  if (newCategoryName.trim() === "") {
    alert("Please enter a category name");
    return;
  }
  if (categories.some(cat => cat.name === newCategoryName)) {
    alert("A category with this name already exists");
    return;
  }
  
  const newCategory = {
    name: newCategoryName,
    color: newCategoryColor,
    progress: 0,
    icon: newCategoryIcon,
    tasksCount: 0
  };
  setCategories(prevCategories => [...prevCategories, newCategory]);
  setAddModalOpen(false);
};

  const handleTaskClick = (taskId) => {
    console.log(`Task ${taskId} clicked`);
  };

  // Toggle task completion status
  const toggleTaskCompletion = (e, taskId) => {
    e.stopPropagation(); // Prevent task click event from firing
    
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle filter option selection
  const handleFilterSelect = (type) => {
    setFilterType(type);
    setFilterOpen(false);
  };

  // Open edit modal
  const openEditModal = (category) => {
    setEditingCategory(category);
    setEditCategoryName(category.name);
    setEditCategoryColor(category.color);
    setEditCategoryIcon(category.icon);
    setEditModalOpen(true);
    setOpenMenu(null);
  };
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  // Handle category deletion
  const handleDeleteCategory = (categoryName) => {
    if (categoryName === "All") {
      return; // Cannot delete "All" category
    }
    
    setCategoryToDelete(categoryName);
    setDeleteModalOpen(true);
    setOpenMenu(null);
  };
  
  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      setCategories(prevCategories => 
        prevCategories.filter(cat => cat.name !== categoryToDelete)
      );
      
      // If the deleted category was selected, switch to "All"
      if (selectedCategory === categoryToDelete) {
        setSelectedCategory("All");
      }
    }
    
    setDeleteModalOpen(false);
    setCategoryToDelete(null);
  };
  
  // Save category changes
  const saveCategory = () => {
    // Store old category name for reference
    const oldCategoryName = editingCategory.name;
    const oldCategoryColor = editingCategory.color;
    
    // For "All" category, only allow color change
    if (oldCategoryName === "All") {
      setCategories(prevCategories => 
        prevCategories.map(cat => 
          cat.name === "All" ? { ...cat, color: editCategoryColor } : cat
        )
      );
    } else {
      setCategories(prevCategories => 
        prevCategories.map(cat => 
          cat.name === oldCategoryName ? { 
            ...cat, 
            name: editCategoryName,
            color: editCategoryColor,
            icon: editCategoryIcon
          } : cat
        )
      );
      
      // Update category name in tasks if changed
      if (editCategoryName !== oldCategoryName) {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.category === oldCategoryName ? { ...task, category: editCategoryName } : task
          )
        );
        
        // If the renamed category was selected, update selection
        if (selectedCategory === oldCategoryName) {
          setSelectedCategory(editCategoryName);
        }
      }
    }
    
    setEditModalOpen(false);
  };

  // Filter tasks based on selected category and filter type
  const filteredTasks = tasks
    .filter(task => task.category === selectedCategory)
    .filter(task => {
      if (filterType === "all") return true;
      if (filterType === "incomplete") return !task.completed;
      if (filterType === "complete") return task.completed;
      return true;
    })
    .sort((a, b) => {
      if (filterType === "all") {
        // Sort completed tasks to the bottom
        if (a.completed === b.completed) {
          return 0; // Keep original order among completed or non-completed tasks
        }
        return a.completed ? 1 : -1; // Move completed tasks to the bottom
      }
      return 0; // Don't change order for other filter types
    });

  // Get the selected category and other categories
  const selected = categories.find(cat => cat.name === selectedCategory);
  const otherCategories = categories.filter(cat => cat.name !== selectedCategory);

  // Update progress based on completed tasks
  const calculateProgress = (categoryName) => {
    const categoryTasks = tasks.filter(task => task.category === categoryName);
    if (categoryTasks.length === 0) return 0;
    
    const completedTasks = categoryTasks.filter(task => task.completed);
    return Math.round((completedTasks.length / categoryTasks.length) * 100);
  };

  // Close filter dropdown and menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterOpen && !event.target.closest('.filter-container')) {
        setFilterOpen(false);
      }
      
      if (openMenu !== null && !event.target.closest('.menu-container')) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterOpen, openMenu]);

  // Function to render a small category card
  const renderCategoryCard = (cat, idx) => {
    const progress = calculateProgress(cat.name);
    const tasksCount = tasks.filter(task => task.category === cat.name).length;
    
    return (
      <div
        key={cat.name}
        className={`relative rounded-lg p-3 h-[120px] ${cat.color} shadow-sm w-full hover:opacity-80 transition-all duration-200 ease-in-out transform hover:scale-105 border border-black`}
        onClick={() => setSelectedCategory(cat.name)}
      >
        {/* Icon */}
        {cat.icon && (
          <img
            src={cat.icon} 
            alt={`${cat.name} icon`}
            className="absolute top-3 left-3 w-7 h-7 opacity-90"
          />
        )}

        {/* Menu toggle */}
        <button
          className="absolute top-3 right-3 text-xl menu-container"
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenu(openMenu === idx ? null : idx);
          }}
        >
          <img src={edit} alt="edit" className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="mt-7">
          <div className="font-semibold text-sm">{cat.name}</div>
          <div className="text-xs text-black/70">
            {tasksCount} Tasks
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-2 bg-white rounded-full overflow-hidden border border-black">
          <div
            className="h-2 bg-black rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-right mt-1 text-black/60">
          {progress}%
        </div>

        {/* Edit/Delete menu dropdown */}
        {openMenu === idx && (
          <div className="absolute top-12 right-4 bg-white border border-black rounded-md shadow-md text-sm z-10 flex flex-col menu-container">
            <button 
              className="font-bold px-3 py-1 hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                openEditModal(cat);
              }}
            >
              Edit
            </button>
            {cat.name !== "All" && (
              <button 
                className="font-bold px-3 py-1 hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCategory(cat.name);
                }}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  // Function to render the large square selected category
  const renderSelectedCategorySquare = (cat) => {
    const progress = calculateProgress(cat.name);
    const tasksCount = tasks.filter(task => task.category === cat.name).length;
    
    return (
      <div
        className={`relative rounded-lg p-6 aspect-square w-54 h-54 ${cat.color} shadow-sm hover:opacity-90 transition-all duration-200 ease-in-out border border-black translate-x-4 hover:-translate-y-1 hover:scale-105`}
      >
        {/* Icon */}
        {cat.icon && (
          <img
            src={cat.icon} 
            alt={`${cat.name} icon`}
            className="w-12 h-12 opacity-90 mb-4"
          />
        )}

        {/* Menu toggle */}
        <button
          className="absolute top-4 right-4 text-xl menu-container"
          onClick={(e) => {
            e.stopPropagation();
            setOpenMenu("selected");
          }}
        >
          <img src={edit} alt="edit" className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="mt-4">
          <div className="font-bold text-xl">{cat.name}</div>
          <div className="text-sm text-black/70">{tasksCount} Tasks</div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-2 bg-white rounded-full overflow-hidden border border-black">
          <div
            className="h-2 bg-black rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-right mt-1 text-black/60">
          {progress}%
        </div>

        {/* Edit/Delete menu dropdown */}
        {openMenu === "selected" && (
          <div className="absolute top-14 right-4 bg-white border border-black rounded-md shadow-md text-sm z-10 flex flex-col menu-container">
            <button 
              className="font-bold px-3 py-1 hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                openEditModal(cat);
              }}
            >
              Edit
            </button>
            {cat.name !== "All" && (
              <button 
                className="font-bold px-3 py-1 hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCategory(cat.name);
                }}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white font-sans">
      {/* Sidebar */}
      <div className="w-[300px] px-6 py-4 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-2">
          <h2 className="text-xl font-bold">Category</h2>
          <button
            onClick={handleAddCategory}
            className="ml-2 p-1 hover:scale-105 transition rounded-md"
          >
            <img src={addcate} alt="addcate" className="w-10 h-10" />
          </button>
        </div>

        {/* Selected Category as a square */}
        {selected && (
          <div className="mb-8 w-full">
            {renderSelectedCategorySquare(selected)}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gray-300 my-6"></div>

        {/* Other Categories */}
        <div className="grid grid-cols-2 gap-4">
          {otherCategories.map((cat, idx) => renderCategoryCard(cat, idx + 1))}

          {/* Placeholder cards */}
          <div className="h-[120px] w-full rounded-lg bg-gray-200 border border-black" />
          <div className="h-[120px] w-full rounded-lg bg-gray-200 border border-black" />
        </div>
      </div>

      {/* Task list */}
      <div className="flex-1 px-12 py-4 overflow-y-auto border-l border-gray">
        {/* Task list header with filter */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{selectedCategory}</h2>
          
          {/* Filter dropdown */}
          <div className="relative filter-container">
            <button 
              className="flex items-center" 
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <span className="mr-2 text-lg font-medium">Filter</span>
              <img src={iconFilter} alt="Filter" className="w-6 h-6 cursor-pointer" />
            </button>
            
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-800 rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleFilterSelect("all")}
                  >
                    <span className={`mr-2 ${filterType === "all" ? "font-bold" : ""}`}>Show All</span>
                  </button>
                  <button 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleFilterSelect("incomplete")}
                  >
                    <span className={`mr-2 ${filterType === "incomplete" ? "font-bold" : ""}`}>Incomplete</span>
                  </button>
                  <button 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleFilterSelect("complete")}
                  >
                    <span className={`mr-2 ${filterType === "complete" ? "font-bold" : ""}`}>Complete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Tasks */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="flex items-center gap-2">
              {/* Checkbox */}
              <div 
                className="flex-shrink-0"
                onClick={(e) => toggleTaskCompletion(e, task.id)}
              >
                <div className={`w-6 h-6 rounded border border-black flex items-center justify-center cursor-pointer ${task.completed ? 'bg-black' : 'bg-white'}`}>
                  {task.completed && (
                    <img src={iconTickWH} alt="Completed" className="w-4 h-4" />
                  )}
                </div>
              </div>
              
              {/* Task Card */}
<div
  className={`relative rounded-lg px-6 py-4 flex justify-between items-center shadow-sm border border-black cursor-pointer hover:opacity-80 transition-opacity flex-grow ${
    task.completed ? 'opacity-60' : ''
  } ${
    categories.find(c => c.name === task.category)?.color || selected.color
  }`}
  onClick={() => handleTaskClick(task.id)}
>
  <div className="flex items-start gap-2">
    {/* Icon - Use specific category icon from the task's original category */}
    <img
      src={categories.find(c => c.name === task.category)?.icon || iconAll}
      alt="icon"
      className="w-7 h-7 mt-1 opacity-90"
    />
    <div>
      <div className={`font-bold text-sm uppercase ${task.completed ? 'line-through' : ''}`}>
        {task.title}
      </div>
      <div className={`text-xs text-black/80 ${task.completed ? 'line-through' : ''}`}>
        {task.description}
      </div>
    </div>
  </div>
  <div className="text-xs font-semibold text-right leading-tight">
    {task.time.split("-")[0]} <br /> {task.time.split("-")[1]}
  </div>
</div>

            </div>
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No {filterType === "incomplete" ? "incomplete" : filterType === "complete" ? "completed" : ""} tasks found
            </div>
          )}
        </div>
      </div>

       {/* Delete Category Modal */}
        {deleteModalOpen && (
        <div className="fixed inset-0 bg-gray-400/40 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-[400px] overflow-hidden">
        <div className="flex justify-end pt-2 pr-2">
        <button 
          onClick={() => setDeleteModalOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <img src={close} alt="Close" className="w-6 h-6 mt-2 " />
        </button>
        </div>
      
        <div className="px-6 pb-5 text-center">
        <h3 className="text-xl font-bold mb-3">Delete this Category?</h3>
        {/* Divider */}
        <div className="w-full my-3 border-t border-gray-300"></div>
        <p className="mb-3 text-lg">it will be gone forever!</p>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setDeleteModalOpen(false)}
            className="px-7 py-2 bg-gray-200 rounded-md border border-black hover:bg-gray-300 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={confirmDeleteCategory}
            className="px-7 py-2 bg-red-400 rounded-md border border-black hover:bg-red-500 font-semibold"
          >
            Yes, delete it
          </button>
        </div>
      </div>
    </div>
  </div>
)}    
{/* Add Category Modal */}
{addModalOpen && (
  <div className="fixed inset-0 bg-gray-400/40 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-[400px] overflow-hidden">
      {/* Modal Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-bold">New Category</h3>
        <button 
          onClick={() => setAddModalOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <img src={close} alt="Close" className="w-6 h-6" />
        </button>
      </div>
      
      {/* Modal Body */}
      <div className="px-8 py-2">
        {/* Category Name and Icon in a flex row */}
        <div className="flex justify-between items-start mb-1">
          {/* Left side - Category Name */}
          <div className="w-1/2 pr-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="What's your category name?"
              className="w-full border border-black rounded py-2 px-3"
            />
          </div>
          
          {/* Right side - Icon */}
          <div className="flex items-center justify-center">
            <div 
              className={`w-24 h-24 rounded-full ${newCategoryColor} flex items-center justify-center border border-black cursor-pointer hover:opacity-80`}
              onClick={() => setIconSelectorOpenForNew(!iconSelectorOpenForNew)}
            >
              <img src={newCategoryIcon} alt="Category icon" className="w-14 h-14" />
            </div>
          </div>
        </div>
        
        {/* Category Color */}
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Color
          </label>
          <div className="flex flex-col gap-2">
            {/* First row - colors 0-3 */}
            <div className="flex gap-3">
              {colorOptions.slice(0, 4).map(color => (
                <div 
                  key={color.id} 
                  className={`w-4 h-4 rounded-full ${color.class} border border-black cursor-pointer hover:scale-110 transition-transform ${newCategoryColor === color.id ? "ring-2 ring-black ring-offset-2" : ""}`}
                  onClick={() => setNewCategoryColor(color.id)}
                ></div>
              ))}
            </div>
            {/* Second row - colors 4-7 */}
            <div className="flex gap-3">
              {colorOptions.slice(4, 8).map(color => (
                <div 
                  key={color.id} 
                  className={`w-4 h-4 rounded-full ${color.class} border border-black cursor-pointer hover:scale-110 transition-transform ${newCategoryColor === color.id ? "ring-2 ring-black ring-offset-2" : ""}`}
                  onClick={() => setNewCategoryColor(color.id)}
                ></div>
              ))}
            </div>
            {/* Third row - colors 8-9 */}
            <div className="flex gap-3">
              {colorOptions.slice(8).map(color => (
                <div 
                  key={color.id} 
                  className={`w-4 h-4 rounded-full ${color.class} border border-black cursor-pointer hover:scale-110 transition-transform ${newCategoryColor === color.id ? "ring-2 ring-black ring-offset-2" : ""}`}
                  onClick={() => setNewCategoryColor(color.id)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
        <button
          onClick={() => setAddModalOpen(false)}
          className="px-6 py-1 bg-gray-300 border border-black font-semibold rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={saveNewCategory}
          className="px-6 py-1 bg-green-500 text-black font-semibold border border-black rounded hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

{/* Icon Selector Modal for New Category (when opened) */}
{iconSelectorOpenForNew && (
  <div className="fixed inset-0 bg-gray-400/40 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-[400px] p-4 overflow-hidden">
      <h4 className="font-bold mb-2">Select Icon</h4>
      <div className="grid grid-cols-4 gap-4">
        {iconOptions.map(icon => (
          <div
            key={icon.id}
            className={`w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 ${newCategoryIcon === icon.src ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => {
              setNewCategoryIcon(icon.src);
              setIconSelectorOpenForNew(false);
            }}
          >
            <img src={icon.src} alt={icon.alt} className="w-10 h-10" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setIconSelectorOpenForNew(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      {/* Edit Category Modal */}
{editModalOpen && editingCategory && (
  <div className="fixed inset-0 bg-gray-400/40 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-[400px] overflow-hidden">
      {/* Modal Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xl font-bold">Edit Category</h3>
        <button 
          onClick={() => setEditModalOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <img src={close} alt="Close" className="w-6 h-6" />
        </button>
      </div>
      
      {/* Modal Body */}
      <div className="px-8 py-2">
        {/* Category Name and Icon in a flex row */}
        <div className="flex justify-between items-start mb-1">
          {/* Left side - Category Name */}
          <div className="w-1/2 pr-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              disabled={editingCategory.name === "All"}
              className={`w-full border border-black rounded py-2 px-3 ${editingCategory.name === "All" ? "bg-gray-100" : ""}`}
            />
          </div>
          
          {/* Right side - Icon */}
          <div className="flex items-center justify-center">
            <div 
              className={`w-24 h-24 rounded-full ${editCategoryColor} flex items-center justify-center border border-black cursor-pointer hover:opacity-80`}
              onClick={() => {
                if (editingCategory.name !== "All") {
                  setIconSelectorOpen(!iconSelectorOpen);
                }
              }}
            >
              <img src={editCategoryIcon} alt="Category icon" className="w-14 h-14" />
            </div>
          </div>
        </div>
        
        {/* Category Color */}
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Color
          </label>
          <div className="flex flex-col gap-2">
    {/* First row - colors 0-3 */}
    <div className="flex gap-3">
      {colorOptions.slice(0, 4).map(color => (
        <div 
          key={color.id} 
          className={`w-4 h-4 rounded-full ${color.class} border border-black cursor-pointer hover:scale-110 transition-transform ${editCategoryColor === color.id ? "ring-2 ring-black ring-offset-2" : ""}`}
          onClick={() => setEditCategoryColor(color.id)}
        ></div>
      ))}
    </div>
    {/* Second row - colors 4-7 */}
    <div className="flex gap-3">
      {colorOptions.slice(4, 8).map(color => (
        <div 
          key={color.id} 
          className={`w-4 h-4 rounded-full ${color.class} border border-black cursor-pointer hover:scale-110 transition-transform ${editCategoryColor === color.id ? "ring-2 ring-black ring-offset-2" : ""}`}
          onClick={() => setEditCategoryColor(color.id)}
        ></div>
      ))}
    </div>
    {/* Third row - colors 8-9 */}
    <div className="flex gap-3">
      {colorOptions.slice(8).map(color => (
        <div 
          key={color.id} 
          className={`w-4 h-4 rounded-full ${color.class} border border-black cursor-pointer hover:scale-110 transition-transform ${editCategoryColor === color.id ? "ring-2 ring-black ring-offset-2" : ""}`}
          onClick={() => setEditCategoryColor(color.id)}
        ></div>
      ))}
      
         </div>
        </div>
      </div>
      </div>
      
      {/* Modal Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
        <button
          onClick={() => setEditModalOpen(false)}
          className="px-6 py-1 bg-gray-300 border-1 border-black font-semibold rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={saveCategory}
          className="px-6 py-1 bg-green-500 text-black font-semibold border-1 border-black rounded hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

{/* Icon Selector Modal (when opened) */}
{iconSelectorOpen && (
  <div className="fixed inset-0 bg-gray-400/40 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-[400px] p-4 overflow-hidden">
      <h4 className="font-bold mb-2">Select Icon</h4>
      <div className="grid grid-cols-4 gap-4">
        {iconOptions.map(icon => (
          <div
            key={icon.id}
            className={`w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 ${editCategoryIcon === icon.src ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => {
              setEditCategoryIcon(icon.src);
              setIconSelectorOpen(false);
            }}
          >
            <img src={icon.src} alt={icon.alt} className="w-10 h-10" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setIconSelectorOpen(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}