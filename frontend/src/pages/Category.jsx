import { useState, useEffect } from "react";
import addcate from "../assets/addcate.svg";
import { apiClient } from "../util/apiClient";
import edit from "../assets/edit.svg";
import iconFilter from "../assets/iconFilter.svg";
import iconTickWH from "../assets/iconTickWH.svg";
import { useMediaQuery } from "react-responsive";
import DeleteCategoryModal from "../components/modals/DeleteCategoryModal.jsx";
import AddCategoryModal from "../components/modals/AddCategoryModal.jsx";
import EditCategoryModal from "../components/modals/EditCategoryModal.jsx";
import TaskSettingModal from "../components/modals/TaskSettingModal.jsx";
import { iconOptions, iconComponents, defaultIcon } from "../components/modals/icon.jsx";

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

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [filterType, setFilterType] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editingCategory, setEditingCategory] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [_categoryFetchError, setCategoryFetchError] = useState(null);
  const [categoryTaskCounts, setCategoryTaskCounts] = useState({});
  const [categoryProgress, setCategoryProgress] = useState({});
  const token = localStorage.getItem("token");
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

  useEffect(() => {
    if (isMobile) {
      setShowCategorySelection(true);
      setShowTasks(false);
    } else {
      setShowCategorySelection(true);
      setShowTasks(true);
    }
  }, [isMobile]);

  useEffect(() => {
  apiClient.get("/api/tasks", {
    headers: { Authorization: `Bearer ${token}` },
    
  }).then(res => {
    // Normalize tasks to have a categories array (of CategoryId)
    console.log("Raw tasks data:", res.data); 
    const normalizedTasks = res.data.map(task => {
      const taskStatus = task.status || task.Task_Status;
      
      return {
        TaskID: task.id || task.TaskID || task._id,
        Task_Title: task.title || task.Task_Title,
        Task_Description: task.description || task.Task_Description,
        Task_Status: taskStatus,
        completed: taskStatus === "Complete" || taskStatus === "Completed",
        categories: task.categories || 
                 (task.task_category ? task.task_category.map(tc => tc.CategoryId || tc.categoryId) : []) || 
                 (task.CategoryId ? [task.CategoryId] : []) ||
                 [1] 
      };
    });
    console.log("Normalized tasks:", normalizedTasks);
    setTasks(normalizedTasks);
  }).catch(err => {
    console.error("Failed to fetch tasks", err);
  });
}, [token]); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setCategoryFetchError("No authentication token found");
          return;
        }

        const response = await apiClient.get("/api/category", {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        
        if (response.data && Array.isArray(response.data)) {
          const normalized = response.data.map(cat => ({
            Category_Name: cat.name || cat.category_name || cat.title || '',
            Category_Color: cat.color || cat.colour || '#D4B4FF',
            Category_icon: cat.icon || cat.iconUrl || cat.icon_url || '',
            CategoryId: cat.CategoryId || cat.id || cat._id || cat.category_id || Math.random().toString(36),
            ...cat 
          }));
          console.log("Normalized categories:", normalized);
          setCategories(normalized);
          setCategoryFetchError(null);
        } else {
          setCategoryFetchError("Invalid response format");
          console.error("Invalid response format", response.data);
        }
      } catch (error) {
        let msg = "Error fetching categories: ";
        if (error.response) {
          if (error.response.status === 401) {
            msg += "Unauthorized - please login again";
          } else if (error.response.status === 404) {
            msg += "Endpoint not found - check API URL";
          } else {
            msg += error.response.data?.message || error.response.statusText;
          }
        } else if (error.request) {
          msg += "No response received from server.";
        } else {
          msg += error.message;
        }
        setCategoryFetchError(msg);
        console.error(msg, error);
      }
    };

    fetchCategories();
  }, []); 

  useEffect(() => {
    const fetchTasksByCategory = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!selectedCategoryId) {
          // Fetch all tasks /ᐠ｡ꞈ｡ᐟ\
          const response = await apiClient.get("/api/tasks", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            }
          );
          
          if (response.data) {
            // Filter out null/undefined values and format
            const normalizedTasks = response.data
              .filter(task => task != null) // Remove null/undefined tasks
              .map(task => ({
                TaskID: task.id || task.TaskID || task._id,
                Task_Title: task.title || task.Task_Title,
                Task_Description: task.description || task.Task_Description,
                Task_Status: task.status || task.Task_Status,
                categories: task.categories || 
                         (task.task_category ? task.task_category.map(tc => tc.CategoryId || tc.categoryId) : []) || 
                         (task.CategoryId ? [task.CategoryId] : []) ||
                         [1],
                ...task
              }));
            setTasks(normalizedTasks);
          }
          return;
        }
        
        // Fetch tasks for specific category (. ❛ ᴗ ❛.)
        const response = await apiClient.get(`/api/category/${selectedCategoryId}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        
        if (response.data) {
          const normalizedTasks = response.data
            .filter(task => task != null)
            .map(task => ({
              TaskID: task.id || task.TaskID || task._id,
              Task_Title: task.title || task.Task_Title,
              Task_Description: task.description || task.Task_Description,
              Task_Status: task.status || task.Task_Status,
              categories: [selectedCategoryId],
              ...task
            }));
          setTasks(normalizedTasks);
        }
      } catch (error) {
        console.error("Oops error fetching tasks for category (*>_<*):", error);
      }
    };
    
    fetchTasksByCategory();
  }, [selectedCategoryId]);
  
  useEffect(() => {
    const fetchCounts = async () => {
      if (!categories.length) return;
      const counts = {};
      for (const cat of categories) {
        try {
          const res = await apiClient.get(`/api/category/${cat.CategoryId}/count`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          counts[cat.CategoryId] = res.data.taskCount;
        } catch {
          counts[cat.CategoryId] = 0;
        }
      }
      setCategoryTaskCounts(counts);
    };
    fetchCounts();
  }, [categories, token]);

  // Fetch progress 
  useEffect(() => {
    const fetchProgress = async () => {
      if (!categories.length) return;
      const progressObj = {};
      for (const cat of categories) {
        try {
          // Remove the space after "progress"
          const res = await apiClient.get(`/api/category/${cat.CategoryId}/progress`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          progressObj[cat.CategoryId] = res.data.progress ?? 0;
        } catch {
          progressObj[cat.CategoryId] = 0;
        }
      }
      setCategoryProgress(progressObj);
    };
    fetchProgress();
  }, [categories, token]);

  const toggleMenu = (categoryName, e) => {
    e.stopPropagation();
    setMenuOpen(menuOpen === categoryName ? null : categoryName);
  };

  const closeMenu = () => {
    setMenuOpen(null);
  };

  const handleAddCategory = () => {
    setAddModalOpen(true);
  };

  const confirmDeleteCategory = async () => {
  if (!categoryToDelete) {
    setDeleteModalOpen(false);
    return;
  }

  try {
    const token = localStorage.getItem('token');
    await apiClient.delete(`/api/category/${categoryToDelete}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    setCategories(categories.filter((cat) => cat.CategoryId !== categoryToDelete));
    
    
    if (selectedCategoryId === categoryToDelete) {
      setSelectedCategoryId(null); // Deselect if deleted
    }
    
    setDeleteModalOpen(false);
  } catch (error) {
    console.error("Error deleting category @v@: ", error);
    alert(`Failed to delete category: ${error.response?.data?.message || error.message}`);
  }
};

  // Helper function to check if task is completed
  const isTaskCompleted = (task) => {
    return task.Task_Status === "Complete" || task.Task_Status === "Completed" || task.completed === true;
  };

  const calculateProgress = (categoryId) => {
    const categoryTasks = tasks.filter(
      (task) => Array.isArray(task.categories) && task.categories.includes(categoryId)
    );
    if (categoryTasks.length === 0) return 0;
    const completedTasks = categoryTasks.filter((task) => isTaskCompleted(task));
    return Math.round((completedTasks.length / categoryTasks.length) * 100);
  };

  const toggleTaskCompletion = async (taskId) => {
  try {
 
    const taskToUpdate = tasks.find(t => t.TaskID === taskId || t.id === taskId);
    if (!taskToUpdate) {
      console.error("Task not found:", taskId);
      return;
    }


    const actualTaskId = taskToUpdate.TaskID || taskToUpdate.id;
    if (!actualTaskId) {
      console.error("No valid ID found for task:", taskToUpdate);
      return;
    }

    const newStatus = isTaskCompleted(taskToUpdate) ? "Incomplete" : "Completed";
    const updatePayload = {
      Task_Status: newStatus,
    };

    // Remove unused response variable
    await apiClient.patch(`/api/tasks/${actualTaskId}`, updatePayload, {
      headers: {
        Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    setTasks(prevTasks => 
      prevTasks.map(task => 
        (task.TaskID === actualTaskId || task.id === actualTaskId)
          ? { 
              ...task, 
              Task_Status: newStatus, 
              completed: newStatus === "Completed" 
            }
          : task
      )
    );

  } catch (error) {
    console.error("Error updating task:", error);
    
    alert(`Failed to update task: ${error.response?.data?.message || error.message}`);
  }
};

  const openEditModal = (category) => {
    setEditingCategory(category);
    setEditModalOpen(true);
  };

  const handleSaveTask = (updatedTask) => {
    setTasks(
      tasks.map((t) =>
        t.TaskID === updatedTask.TaskID
          ? {
              ...t,
              Task_Title: updatedTask.Task_Title,
              Task_Description: updatedTask.Task_Description,
              Task_Start_Time: updatedTask.Task_Start_Time,
              Task_End_Time: updatedTask.Task_End_Time,
              Task_Start_Date: updatedTask.Task_Start_Date,
              Task_End_Date: updatedTask.Task_End_Date,
              category: updatedTask.category,
              icon: updatedTask.icon,
              Task_Status: updatedTask.Task_Status,
              completed: updatedTask.Task_Status === "Complete" || updatedTask.Task_Status === "Completed"
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

  const handleCategorySelect = (categoryId) => {
    console.log("Selecting category:", categoryId);
    setSelectedCategoryId(categoryId === 1 ? 1 : categoryId);
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

  const filteredTasks = tasks
  .filter((task) => {
    console.log("Task categories:", task.categories); // Add this
    console.log("Selected category:", selectedCategoryId); // Add this
    // For "All" category or no selection, show all tasks -w-
    if (!selectedCategoryId || selectedCategoryId === "All") return true;
    console.log("All category IDs:", categories.map(c => c.CategoryId));
    console.log("First task's categories:", tasks[0]?.categories);
    
    if (Array.isArray(task.categories) && task.categories.length > 0) {
      return task.categories.some(catId => String(catId) === String(selectedCategoryId));
    }
    
    if (task.CategoryId) {
      return String(task.CategoryId) === String(selectedCategoryId);
    }
    
    if (Array.isArray(task.task_category) && task.task_category.length > 0) {
      return task.task_category.some(tc => 
        String(tc.CategoryId || tc.categoryId) === String(selectedCategoryId)
      );
    }
    
    return selectedCategoryId === "1" || selectedCategoryId === 1;
  })
  .filter((task) => {
    if (filterType === "all") return true;
    if (filterType === "incomplete") return !isTaskCompleted(task);
    if (filterType === "complete") return isTaskCompleted(task);
    return true;
  })
  .sort((a, b) => {
    const aCompleted = isTaskCompleted(a);
    const bCompleted = isTaskCompleted(b);
    return aCompleted === bCompleted ? 0 : aCompleted ? 1 : -1;
  });
  console.log("Filtered tasks:", filteredTasks);
  const selected = categories.find((cat) => cat.CategoryId === selectedCategoryId);

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
                onClick={() => handleCategorySelect(selected.CategoryId)}
                style={{ backgroundColor: selected.Category_Color }}
                className="relative rounded-lg p-6 aspect-square w-54 h-54 shadow-sm border border-black cursor-pointer 
                          transition-transform duration-200 hover:scale-105 hover:shadow-md translate-x-4"
              >
                <button
                  onClick={(e) => toggleMenu(selected.CategoryId, e)}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100/50"
                >
                  <img src={edit} alt="Menu" className="w-5 h-5" />
                </button>
                {menuOpen === selected.CategoryId && (
                  <div className="absolute top-10 right-2 bg-white border border-black rounded-md shadow-lg z-10 w-24">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(selected);
                        closeMenu();
                      }}
                      className="flex items-center px-3 py-2 hover:bg-gray-100 w-full "
                    >
                      <span className="w-16 h-7 font-bold text-lg  px-4 hover:bg-gray-200 ">Edit</span>
                    </button>
                  </div>
                )}
                <img
                  src={iconComponents[selected.Category_icon] || iconComponents[defaultIcon]}
                  alt={`${selected.Category_Name} icon`}
                  className="w-12 h-12 mb-4"
                />
                <div className="mt-4">
                  <div className="font-bold text-xl">{selected.Category_Name}</div>
                  <div className="text-sm text-black/70">
                    {tasks.filter((t) => Array.isArray(t.categories) && t.categories.includes(selected.CategoryId)).length}{" "}
                    Tasks
                  </div>
                </div>
                <div className="mt-6 h-2 bg-white rounded-full overflow-hidden border border-black">
                  <div
                    className="h-2 bg-black rounded-full"
                    style={{ width: `${calculateProgress(selected.CategoryId)}%` }}
                  />
                </div>
                <div className="text-sm text-right mt-1 text-black/60">
                  {calculateProgress(selected.CategoryId)}%
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
                  src={iconComponents.iconAll}
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
                    style={{ width: `${categoryProgress["All"]}%` }}
                  />
                </div>
              </div>
            )}

            {categories
              .filter(cat => isMobile ? cat.Category_Name !== "All" : true)
              .filter(cat => !isMobile ? cat.CategoryId !== selected?.CategoryId : true)
              .map((cat) => (
                <div
                  key={cat.CategoryId}
                  onClick={() => handleCategorySelect(cat.CategoryId)}
                  style={{ backgroundColor: cat.Category_Color }}
                  className="relative rounded-lg p-3 h-[120px] shadow-sm border border-black cursor-pointer
                            transition-transform duration-200 hover:scale-105 hover:shadow-md"
                >
                  <button
                    onClick={(e) => toggleMenu(cat.CategoryId, e)}
                    className="absolute top-1 right-1 p-1 rounded-full hover:bg-gray-100/50"
                  >
                    <img src={edit} alt="Menu" className="w-4 h-4" />
                  </button>
                  {menuOpen === cat.CategoryId && (
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
    {cat.CategoryId !== "All" && (
      <>
        <div className="border-t border-gray-300"></div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteCategory(cat.CategoryId);
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
                    src={iconComponents[cat.Category_icon] || iconComponents[defaultIcon]}
                    alt={`${cat.Category_Name} icon`}
                    className="absolute top-3 left-3 w-7 h-7"
                  />
                  <div className="mt-7">
                    <div className="font-semibold text-sm">{cat.Category_Name}</div>
                    <div className="text-xs text-black/70">
                      {categoryTaskCounts[cat.CategoryId] || 0} Tasks
                    </div>
                  </div>
                  <div className="mt-2 h-2 bg-white rounded-full overflow-hidden border border-black">
                    <div
                      className="h-2 bg-black rounded-full"
                      style={{ width: `${categoryProgress[cat.CategoryId] || 0}%` }}
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
      {(showTasks && !isMobile) && (
        <div className={`${isMobile ? 'w-full' : 'flex-1'} px-6 md:px-12 py-4 overflow-y-auto border-l border-gray`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              {selectedCategoryId ? 
                (categories.find(c => c.CategoryId === selectedCategoryId)?.Category_Name || "Tasks")
                : "All Tasks"}
            </h2>
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
                      key="filter-all"
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
                
                <div key={task.TaskID} className="flex items-center gap-2 group">
                  <div
                    onClick={() => toggleTaskCompletion(task.TaskID)}
                    className="flex-shrink-0"
                  >
                    <div
                      className={`w-6 h-6 rounded border border-black flex items-center justify-center cursor-pointer 
      group-hover:border-2 ${isTaskCompleted(task) ? "bg-black" : "bg-white"}`}
                    >
                      {isTaskCompleted(task) && (
                        <img src={iconTickWH} alt="Completed" className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() => setEditingTask(task)}
                    style={{
                      backgroundColor:
                        categories.find((c) => Array.isArray(task.categories) && task.categories.includes(c.CategoryId))?.Category_Color ||
                        "#D4B4FF"
                    }}
                    className="relative rounded-lg px-4 md:px-6 py-4 flex justify-between items-center shadow-sm border border-black cursor-pointer flex-grow  transition-all duration-200 hover:brightness-90"
                  >
                    <div className="flex items-start gap-2">
                      {/* Show all category icons for this task */}
                      {Array.isArray(task.categories) && task.categories.length > 0 && (
                        <div className="flex gap-1 mr-2">
                          {task.categories.map(cid => {
                            const cat = categories.find(c => c.CategoryId === cid);
                            return cat ? (
                              <img
                                key={cid}
                                src={iconComponents[cat.Category_icon] || iconComponents[defaultIcon]}
                                alt={cat.Category_Name}
                                className="w-5 h-5"
                              />
                            ) : null;
                          })}
                        </div>
                      )}
                      <div>
                        <div
                          className={`font-bold text-sm uppercase ${
                            isTaskCompleted(task) ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {task.Task_Title}
                        </div>
                        <div
                          className={`text-xs ${
                            isTaskCompleted(task) ? "line-through text-gray-400" : "text-black/80"
                          }`}
                        >
                          {task.Task_Description}
                        </div>
                      </div>
                    </div>
                    <div className={`text-xs font-semibold text-right leading-tight ${
                      isTaskCompleted(task) ? "text-gray-400" : ""
                    }`}>
                      {task.Task_Start_Time || "00:00"}-{task.Task_End_Time || "00:00"}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No tasks found in this category
                <div className="text-xs mt-2 text-gray-400">
                  Selected: "{selectedCategoryId}" | Total tasks: {categoryTaskCounts[selectedCategoryId] || 0}
                </div>
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
          setCategories([...categories, {
            ...newCategory,
            CategoryId: newCategory.CategoryId || Math.random().toString(36),
          }]);
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
          const oldId = editingCategory?.CategoryId;
          const newId = updatedCategory.CategoryId;
          // Update categories
          const updatedCategories = categories.map((cat) =>
            cat.CategoryId === oldId ? updatedCategory : cat
          );
          // Update tasks that use the old category
          const updatedTasks = tasks.map((task) =>
            task.CategoryId === oldId ? { ...task, CategoryId: newId } : task
          );
          setCategories(updatedCategories);
          setTasks(updatedTasks);
          if (selectedCategoryId === oldId) {
            setSelectedCategoryId(newId);
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
              categories={categories.map((cat) => cat.Category_Name)}
            />
          </div>
        </div>
      )}
    </div>
  );
}