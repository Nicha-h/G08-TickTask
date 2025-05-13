import { useState, useEffect } from "react";
import addcate from "../assets/addcate.svg";
import iconAll from "../assets/iconAll.svg";
import iconPet from "../assets/iconPet.svg";
import iconStudy from "../assets/iconStudy.svg";
import iconWork from "../assets/iconWork.svg";
import iconWorkout from "../assets/iconWorkout.svg";
import edit from "../assets/edit.svg";
import iconFilter from "../assets/iconFilter.svg";
import iconTickWH from "../assets/iconTickWH.svg";
import iconComputer from "../assets/iconComputer.svg";
import iconArt from "../assets/iconArt.svg";
import iconSmile from "../assets/iconSmile.svg";
import iconStar from "../assets/iconStar.svg";
import iconHeart from "../assets/iconHeart.svg";
import iconGame from "../assets/iconGame.svg";
import iconScience from "../assets/iconScience.svg";
import iconCode from "../assets/iconCode.svg";
import iconBook from "../assets/iconBook.svg";
import iconHeartbeat from "../assets/iconHeartbeat.svg";
import iconUmbrella from "../assets/iconUmbrella.svg";
import { useMediaQuery } from "react-responsive";
import DeleteCategoryModal from "../components/modals/DeleteCategoryModal.jsx";
import AddCategoryModal from "../components/modals/AddCategoryModal.jsx";
import EditCategoryModal from "../components/modals/EditCategoryModal.jsx";
import TaskSettingModal from "../components/modals/TaskSettingModal.jsx";
const initialCategories = [
  {
    name: "All",
    color: "#D4B4FF",
    progress: 40,
    icon: iconAll,
    tasksCount: 9,
  },
  {
    name: "Pet",
    color: "#FFBEBE",
    progress: 70,
    icon: iconPet,
    tasksCount: 5,
  },
  {
    name: "Study",
    color: "#FFECB4",
    progress: 88,
    icon: iconStudy,
    tasksCount: 3,
  },
  {
    name: "Work",
    color: "#D1F4FF",
    progress: 20,
    icon: iconWork,
    tasksCount: 2,
  },
  {
    name: "Workout",
    color: "#FFC6F0",
    progress: 60,
    icon: iconWorkout,
    tasksCount: 1,
  },
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
];

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

const initialTasks = [
  // All Tasks
  {
    id: 1,
    title: "TASK 1",
    description: "Description of task 1",
    startTime: "08:00",
    endTime: "09:00",
    startDate: "2025-05-01",
    endDate: "2025-05-01",
    color: "#D4B4FF",
    icon: iconSmile,
    category: "All",
    completed: false,
  },
  {
    id: 2,
    title: "TASK 2",
    description: "Description",
    startTime: "00:00",
    endTime: "09:00",
    startDate: "2025-05-01",
    endDate: "2025-05-01",
    color: "#D4B4FF",
    icon: iconSmile,
    category: "All",
    completed: false,
  },
  {
    id: 3,
    title: "TASK 3",
    description: "Description",
    startTime: "00:00",
    endTime: "00:00",
    startDate: "2025-05-01",
    endDate: "2025-05-01",
    color: "#D4B4FF",
    icon: iconSmile,
    category: "All",
    completed: false,
  },
  {
    id: 4,
    title: "TASK 4",
    description: "Description",
    startTime: "08:00",
    endTime: "12:00",
    startDate: "2025-05-01",
    endDate: "2025-05-01",
    color: "#D4B4FF",
    icon: iconSmile,
    category: "All",
    completed: false,
  },
  {
    id: 5,
    title: "TASK 5",
    description: "Description",
    startTime: "07:00",
    endTime: "09:00",
    startDate: "2025-05-01",
    endDate: "2025-05-01",
    color: "#D4B4FF",
    icon: iconSmile,
    category: "All",
    completed: false,
  },
  {
    id: 6,
    title: "TASK 6",
    description: "Description",
    startTime: "18:00",
    endTime: "19:00",
    startDate: "2025-05-01",
    endDate: "2025-05-01",
    color: "#D4B4FF",
    icon: iconSmile,
    category: "All",
    completed: false,
  },
  // Pet Tasks
  {
    id: 7,
    title: "PET TASK 1",
    description: "Pet care",
    startTime: "08:00",
    endTime: "09:00",
    startDate: "2025-05-01",
    endDate: "2025-05-01",
    color: "#FFBEBE",
    icon: iconPet,
    category: "Pet",
    completed: false,
  },
  {
    id: 8,
    title: "PET TASK 2",
    description: "Feeding",
    startTime: "08:00",
    endTime: "09:00",
    startDate: "2025-05-01",
    endDate: "2025-05-01",
    color: "#FFBEBE",
    icon: iconPet,
    category: "Pet",
    completed: false,
  },
  {
    id: 9,
    title: "PET TASK 3",
    description: "Grooming",
    startTime: "08:00",
    endTime: "09:00",
    startDate: "2025-05-01",
    endDate: "2025-05-01",
    color: "#FFBEBE",
    icon: iconPet,
    category: "Pet",
    completed: false,
  },

  // Study Tasks
  {
    id: 10,
    title: "STUDY TASK 1",
    description: "Math homework",
    startTime: "08:00",
    endTime: "09:00",
    startDate: "2025-05-01",
    endDate: "2025-05-01",
    color: "#FFECB4",
    icon: iconStudy,
    category: "Study",
    completed: false,
  },
  {
    id: 11,
    title: "STUDY TASK 2",
    description: "Reading",
    startTime: "08:00",
    endTime: "09:00",
    startDate: "2025-05-01",
    endDate: "2025-05-01",
    color: "#FFECB4",
    icon: iconStudy,
    category: "Study",
    completed: false,
  },
  {
    id: 12,
    title: "STUDY TASK 3",
    description: "Research",
    startTime: "08:00",
    endTime: "09:00",
    startDate: "2025-05-01",
    endDate: "2025-05-01",
    color: "#FFECB4",
    icon: iconStudy,
    category: "Study",
    completed: true,
  },

  // Work Tasks
  {
    id: 13,
    title: "WORK TASK 1",
    description: "Meeting",
    startTime: "08:00",
    endTime: "09:00",
    startDate: "2025-05-01",
    endDate: "2025-05-01",
    color: "#D1F4FF",
    icon: iconWork,
    category: "Work",
    completed: false,
  },
  {
    id: 14,
    title: "WORK TASK 2",
    description: "Report",
    startTime: "08:00",
    endTime: "09:00",
    startDate: "2025-05-01",
    endDate: "2025-05-01",
    color: "#D1F4FF",
    icon: iconWork,
    category: "Work",
    completed: true,
  },

  // Workout Tasks
  {
    id: 15,
    title: "WORKOUT TASK 1",
    description: "Morning run",
    startTime: "08:00",
    endTime: "09:00",
    startDate: "2025-05-01",
    endDate: "2025-05-01",
    color: "#FFC6F0",
    icon: iconWorkout,
    category: "Workout",
    completed: false,
  },
];

export default function Category() {
  const [categories, setCategories] = useState(initialCategories);
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterType, setFilterType] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  
  // Mobile state
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [showCategorySelection, setShowCategorySelection] = useState(isMobile);
  const [showTasks, setShowTasks] = useState(!isMobile);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterOpen && !event.target.closest(".filter-container")) {
        setFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterOpen]);

  // Handle mobile/desktop layout changes
  useEffect(() => {
    if (isMobile) {
      setShowCategorySelection(true);
      setShowTasks(false);
    } else {
      // Desktop - show both
      setShowCategorySelection(true);
      setShowTasks(true);
    }
  }, [isMobile]);

  const toggleMenu = (categoryName, e) => {
    e.stopPropagation();
    setMenuOpen(menuOpen === categoryName ? null : categoryName);
  };

  const closeMenu = () => {
    setMenuOpen(null);
  };

  // Handler Functions
  const handleAddCategory = () => {
    setAddModalOpen(true);
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((cat) => cat.name !== categoryToDelete));
      if (selectedCategory === categoryToDelete) {
        setSelectedCategory("All");
      }
    }
    setDeleteModalOpen(false);
  };

  const calculateProgress = (categoryName) => {
    const categoryTasks = tasks.filter(
      (task) => task.category === categoryName
    );
    if (categoryTasks.length === 0) return 0;
    const completedTasks = categoryTasks.filter((task) => task.completed);
    return Math.round((completedTasks.length / categoryTasks.length) * 100);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setEditModalOpen(true);
  };

  const handleSaveTask = (updatedTask) => {
    setTasks(
      tasks.map((t) =>
        t.id === updatedTask.id
          ? {
              ...t,
              title: updatedTask.title,
              description: updatedTask.description,
              startTime: updatedTask.startTime,
              endTime: updatedTask.endTime,
              startDate: updatedTask.startDate,
              endDate: updatedTask.endDate,
              category: updatedTask.category,
              icon: updatedTask.icon,
            }
          : t
      )
    );
    setEditingTask(null);
  };

  const handleDeleteCategory = (categoryName) => {
    if (categoryName === "All") return;
    setCategoryToDelete(categoryName);
    setDeleteModalOpen(true);
  };

  // Mobile-specific handlers
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    if (isMobile) {
      setShowCategorySelection(false);
      setShowTasks(true);
    }
  };

  const handleBackToCategories = () => {
    if (isMobile) {
      setShowCategorySelection(true);
      setShowTasks(false);
    }
  };

  // Filtered Tasks
  const filteredTasks = tasks
    .filter((task) => selectedCategory === "All" || task.category === selectedCategory)
    .filter((task) => {
      if (filterType === "all") return true;
      if (filterType === "incomplete") return !task.completed;
      if (filterType === "complete") return task.completed;
      return true;
    })
    .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));

  const selected = categories.find((cat) => cat.name === selectedCategory);
  const otherCategories = categories.filter(
    (cat) => cat.name !== selectedCategory
  );

  return (
    <div className="flex h-screen overflow-hidden bg-white font-sans">
      {/* Sidebar - shown on desktop or when category selection is active on mobile */}
      {(showCategorySelection || !isMobile) && (
        <div className={`${isMobile ? 'w-full' : 'w-[300px]'} px-6 py-4 overflow-y-auto`}>
          <div className="flex items-center justify-between mb-6 pb-2">
            <h2 className="text-xl font-bold">Category</h2>
            {!isMobile && (
              <button onClick={handleAddCategory}
              className="transition-all duration-200 hover:scale-110 ">
                <img src={addcate} alt="Add Category" className="w-10 h-10 " />
              </button>
            )}
          </div>

          {isMobile && (
            <button 
              onClick={handleBackToCategories}
              className="mb-4 flex items-center text-sm font-medium"
              style={{ display: showTasks ? 'flex' : 'none' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Categories
            </button>
          )}

          {selected && !isMobile && (
            <div className="mb-8 w-full">
              {/* Selected Category Card Ontop */}
              <div
                onClick={() => handleCategorySelect(selected.name)}
                style={{ backgroundColor: selected.color }}
                className="relative rounded-lg p-6 aspect-square w-54 h-54 shadow-sm border border-black cursor-pointer 
                          transition-transform duration-200 hover:scale-105 hover:shadow-md translate-x-4"
              >
                <button
                  onClick={(e) => toggleMenu(selected.name, e)}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100/50"
                >
                  <img src={edit} alt="Menu" className="w-5 h-5" />
                </button>
                {menuOpen === selected.name && (
                  <div className="absolute top-10 right-2 bg-white border border-black rounded-md shadow-lg z-10 w-24">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(selected);
                        closeMenu();
                      }}
                      className="flex items-center px-3 py-2 hover:bg-gray-100 w-full text-sm"
                    >
                      <span className="w-full text-left">Edit</span>
                    </button>
                  </div>
                )}
                <img
                  src={selected.icon}
                  alt={`${selected.name} icon`}
                  className="w-12 h-12 mb-4"
                />
                <div className="mt-4">
                  <div className="font-bold text-xl">{selected.name}</div>
                  <div className="text-sm text-black/70">
                    {tasks.filter((t) => t.category === selected.name).length}{" "}
                    Tasks
                  </div>
                </div>
                <div className="mt-6 h-2 bg-white rounded-full overflow-hidden border border-black">
                  <div
                    className="h-2 bg-black rounded-full"
                    style={{ width: `${calculateProgress(selected.name)}%` }}
                  />
                </div>
                <div className="text-sm text-right mt-1 text-black/60">
                  {calculateProgress(selected.name)}%
                </div>
              </div>
            </div>
          )}

          {!isMobile && <div className="h-px bg-gray-300 my-6"></div>}

          {/* otherCategories */}
          <div className={`${isMobile ? 'grid-cols-2' : 'grid-cols-2'} grid gap-4`}>
            {isMobile && (
              <div
                key="All"
                onClick={() => handleCategorySelect("All")}
                style={{ backgroundColor: "#D4B4FF" }}
                className="relative rounded-lg p-3 h-[120px] shadow-sm border border-black cursor-pointer
                          transition-transform duration-200 hover:scale-105 hover:shadow-md"
              >
                <img
                  src={iconAll}
                  alt="All icon"
                  className="absolute top-3 left-3 w-7 h-7"
                />
                <div className="mt-7">
                  <div className="font-semibold text-sm">All</div>
                  <div className="text-xs text-black/70">
                    {tasks.length} Tasks
                  </div>
                </div>
                <div className="mt-2 h-2 bg-white rounded-full overflow-hidden border border-black">
                  <div
                    className="h-2 bg-black rounded-full"
                    style={{ width: `${calculateProgress("All")}%` }}
                  />
                </div>
              </div>
            )}

            {categories
              .filter(cat => isMobile ? cat.name !== "All" : true)
              .filter(cat => !isMobile ? cat.name !== selected?.name : true)
              .map((cat) => (
                <div
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  style={{ backgroundColor: cat.color }}
                  className="relative rounded-lg p-3 h-[120px] shadow-sm border border-black cursor-pointer
                            transition-transform duration-200 hover:scale-105 hover:shadow-md"
                >
                  <button
                    onClick={(e) => toggleMenu(cat.name, e)}
                    className="absolute top-1 right-1 p-1 rounded-full hover:bg-gray-100/50"
                  >
                    <img src={edit} alt="Menu" className="w-4 h-4" />
                  </button>
                  {menuOpen === cat.name && (
                    <div className="absolute top-8 right-1 bg-white border border-black rounded-lg shadow-lg z-10 w-24">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(cat);
                          closeMenu();
                        }}
                        className="font-bold w-full px-2 py-1 hover:bg-gray-200 "
                      >
                        Edit
                      </button>
                      {cat.name !== "All" && (
                        <>
                          <div className="border-t border-gray-300"></div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCategory(cat.name);
                              closeMenu();
                            }}
                            className="font-bold w-full px-2 py-1 hover:bg-gray-200"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  <img
                    src={cat.icon}
                    alt={`${cat.name} icon`}
                    className="absolute top-3 left-3 w-7 h-7"
                  />
                  <div className="mt-7">
                    <div className="font-semibold text-sm">{cat.name}</div>
                    <div className="text-xs text-black/70">
                      {tasks.filter((t) => t.category === cat.name).length} Tasks
                    </div>
                  </div>
                  <div className="mt-2 h-2 bg-white rounded-full overflow-hidden border border-black">
                    <div
                      className="h-2 bg-black rounded-full"
                      style={{ width: `${calculateProgress(cat.name)}%` }}
                    />
                  </div>
                </div>
              ))}

            {isMobile && (
              <div
                onClick={handleAddCategory}
                className="relative rounded-lg p-3 h-[120px] shadow-sm border-2 border-dashed border-gray-400 cursor-pointer 
                          flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105 hover:shadow-md"
              >
                <img src={addcate} alt="Add Category" className="w-8 h-8 mb-2 " />
                <div className="font-semibold text-sm">Add Category</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Task List - shown on desktop or when tasks are active on mobile */}
      {(showTasks || !isMobile) && (
        <div className={`${isMobile ? 'w-full' : 'flex-1'} px-6 md:px-12 py-4 overflow-y-auto border-l border-gray`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{selectedCategory}</h2>
            <div className="relative filter-container">
              <button
                className="flex items-center"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <span className="mr-2 text-lg font-medium">Filter</span>
                <img
                  src={iconFilter}
                  alt="Filter"
                  className="w-6 h-6 cursor-pointer"
                />
              </button>

              {filterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-800 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => {
                        setFilterType("all");
                        setFilterOpen(false);
                      }}
                    >
                      <span
                        className={`mr-2 ${
                          filterType === "all" ? "font-bold" : ""
                        }`}
                      >
                        Show All
                      </span>
                    </button>
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => {
                        setFilterType("incomplete");
                        setFilterOpen(false);
                      }}
                    >
                      <span
                        className={`mr-2 ${
                          filterType === "incomplete" ? "font-bold" : ""
                        }`}
                      >
                        Incomplete
                      </span>
                    </button>
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => {
                        setFilterType("complete");
                        setFilterOpen(false);
                      }}
                    >
                      <span
                        className={`mr-2 ${
                          filterType === "complete" ? "font-bold" : ""
                        }`}
                      >
                        Complete
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2 group">
                  <div
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="flex-shrink-0"
                  >
                    <div
                      className={`w-6 h-6 rounded border border-black flex items-center justify-center cursor-pointer 
                                group-hover:border-2 ${task.completed ? "bg-black" : "bg-white"}`}
                    >
                      {task.completed && (
                        <img src={iconTickWH} alt="Completed" className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() => setEditingTask(task)}
                    style={{
                      backgroundColor:
                        categories.find((c) => c.name === task.category)?.color ||
                        "#D4B4FF", filter: task.completed ? "grayscale(100%)" : "none"
                    }}
                    className={`relative rounded-lg px-4 md:px-6 py-4 flex justify-between items-center shadow-sm border border-black cursor-pointer flex-grow  transition-all duration-200 hover:brightness-90 ${
                      categories.find((c) => c.name === task.category)?.color ||
                      selected?.color
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <img src={task.icon} alt="icon" className="w-6 h-6 md:w-7 md:h-7 mt-1" />
                      <div>
                        <div
                          className={`font-bold text-sm uppercase ${
                            task.completed ? "line-through" : ""
                          }`}
                        >
                          {task.title}
                        </div>
                        <div
                          className={`text-xs text-black/80 ${
                            task.completed ? "line-through" : ""
                          }`}
                        >
                          {task.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-right leading-tight">
                      {task.time ||
                        `${task.startTime || "00:00"}-${task.endTime || "00:00"}`}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No tasks found in this category
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <DeleteCategoryModal
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        confirmDeleteCategory={confirmDeleteCategory}
      />

      <AddCategoryModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        colorOptions={colorOptions}
        iconOptions={iconOptions}
        saveNewCategory={(newCategory) => {
          setCategories([...categories, newCategory]);
          setAddModalOpen(false);
        }}
        existingCategories={categories}
      />

      <EditCategoryModal
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        editingCategory={editingCategory}
        colorOptions={colorOptions}
        iconOptions={iconOptions}
        saveCategory={(updatedCategory) => {
          const oldName = editingCategory?.name;
          const newName = updatedCategory.name;

          // Update categories
          const updatedCategories = categories.map((cat) =>
            cat.name === oldName ? updatedCategory : cat
          );

          // Update tasks that use the old category
          const updatedTasks = tasks.map((task) =>
            task.category === oldName ? { ...task, category: newName } : task
          );

          setCategories(updatedCategories);
          setTasks(updatedTasks);

          // If the edited category is the currently selected one
          if (selectedCategory === oldName) {
            setSelectedCategory(newName);
          }

          setEditModalOpen(false);
        }}
      />
      
      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-gray-800/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[85vh] h-auto overflow-y-auto shadow-2xl p-6">
            <TaskSettingModal
              task={editingTask}
              onSave={handleSaveTask}
              onClose={() => setEditingTask(null)}
              categories={categories.map((cat) => cat.name)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
