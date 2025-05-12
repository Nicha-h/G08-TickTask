import { useState } from "react";
import addcate from "../assets/addcate.svg";
import iconAll from "../assets/iconAll.svg";
import iconPet from "../assets/iconPet.svg";
import iconStudy from "../assets/iconStudy.svg";
import iconWork from "../assets/iconWork.svg";
import iconWorkout from "../assets/iconWorkout.svg";
import edit from "../assets/edit.svg";

const categories = [
  { name: "All", color: "bg-purple-300", progress: 40, icon: iconAll, tasksCount: 9 },
  { name: "Pet", color: "bg-rose-200", progress: 70, icon: iconPet, tasksCount: 5 },
  { name: "Study", color: "bg-yellow-200", progress: 88, icon: iconStudy, tasksCount: 3 },
  { name: "Work", color: "bg-sky-200", progress: 20, icon: iconWork, tasksCount: 2 },
  { name: "Workout", color: "bg-pink-200", progress: 60, icon: iconWorkout, tasksCount: 1 },
];

const allTasks = [
  // All Tasks
  { id: 1, title: "TASK 1", description: "Description", time: "00:00-00:00", category: "All" },
  { id: 2, title: "TASK 2", description: "Description", time: "00:00-00:00", category: "All" },
  { id: 3, title: "TASK 3", description: "Description", time: "00:00-00:00", category: "All" },
  { id: 4, title: "TASK 4", description: "Description", time: "00:00-00:00", category: "All" },
  { id: 5, title: "TASK 5", description: "Description", time: "00:00-00:00", category: "All" },
  { id: 6, title: "TASK 6", description: "Description", time: "00:00-00:00", category: "All" },
  { id: 7, title: "TASK 7", description: "Description", time: "00:00-00:00", category: "All" },
  { id: 8, title: "TASK 8", description: "Description", time: "00:00-00:00", category: "All" },
  { id: 9, title: "TASK 9", description: "Description", time: "00:00-00:00", category: "All" },
  
  // Pet Tasks
  { id: 10, title: "PET TASK 1", description: "Pet care", time: "08:00-09:00", category: "Pet" },
  { id: 11, title: "PET TASK 2", description: "Feeding", time: "12:00-12:30", category: "Pet" },
  { id: 12, title: "PET TASK 3", description: "Grooming", time: "15:00-16:00", category: "Pet" },
  { id: 13, title: "PET TASK 4", description: "Vet visit", time: "10:00-11:00", category: "Pet" },
  { id: 14, title: "PET TASK 5", description: "Play time", time: "17:00-18:00", category: "Pet" },
  
  // Study Tasks
  { id: 15, title: "STUDY TASK 1", description: "Math homework", time: "09:00-11:00", category: "Study" },
  { id: 16, title: "STUDY TASK 2", description: "Reading", time: "14:00-15:00", category: "Study" },
  { id: 17, title: "STUDY TASK 3", description: "Research", time: "16:00-17:00", category: "Study" },
  
  // Work Tasks
  { id: 18, title: "WORK TASK 1", description: "Meeting", time: "09:00-10:00", category: "Work" },
  { id: 19, title: "WORK TASK 2", description: "Report", time: "13:00-15:00", category: "Work" },
  
  // Workout Tasks
  { id: 20, title: "WORKOUT TASK 1", description: "Morning run", time: "06:00-07:00", category: "Workout" }
];

export default function Category() {
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddCategory = () => {
    console.log("Add category clicked");
  };

  const handleTaskClick = (taskId) => {
    console.log(`Task ${taskId} clicked`);
    // ยังไม่ได้ใส่ฟังช้น
  };

  const filteredTasks = selectedCategory === "All" 
    ? allTasks.filter(task => task.category === "All")
    : allTasks.filter(task => task.category === selectedCategory);

  return (
    <div className="flex h-screen overflow-hidden bg-white font-sans">
      {/* Sidebar */}
      <div className="w-[300px] px-6 py-4 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b-2 border-gray pb-2">
          <h2 className="text-xl font-bold">Category</h2>
          <button
            onClick={handleAddCategory}
            className="ml-2 p-1 hover:scale-105 transition rounded-md"
          >
            <img src={addcate} alt="addcate" className="w-10 h-10" />
          </button>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-3 h-[120px] ${cat.color} shadow-sm w-full hover:opacity-80 transition-all duration-200 ease-in-out transform hover:scale-105 border border-black `}
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
                className="absolute top-3 right-3 text-xl"
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
                <div className="text-xs text-black/70">{cat.tasksCount} Tasks</div>
              </div>

              {/* Progress bar */}
              <div className="mt-2 h-2 bg-white rounded-full overflow-hidden border border-black">
                <div
                  className="h-2 bg-black rounded-full"
                  style={{ width: `${cat.progress}%` }}
                />
              </div>
              <div className="text-xs text-right mt-1 text-black/60">
                {cat.progress}%
              </div>

              {/* Edit menu */}
              {openMenu === idx && (
                <div className="absolute top-12 right-4 bg-white border-1 border-black rounded-md shadow-md text-sm px-3 py-1 z-10 hover:bg-gray-200">
                  <button className="font-bold">Edit</button>
                </div>
              )}
            </div>
          ))}

          {/* Placeholder cards */}
          <div className="h-[120px] w-full rounded-2xl bg-gray-200 border-1 border-black" />
          <div className="h-[120px] w-full rounded-2xl bg-gray-200 border-1 border-black" />
        </div>
      </div>

      {/* Task list */}
      <div className="flex-1 px-6 py-4 overflow-y-auto border-l border-gray">
        <h2 className="text-xl font-bold mb-4">{selectedCategory}</h2>
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`relative rounded-2xl px-6 py-4 flex justify-between items-center shadow-sm border-1 border-black cursor-pointer  hover:opacity-80 transition-opacity ${
                selectedCategory === "All" ? "bg-purple-300" : 
                selectedCategory === "Pet" ? "bg-rose-200" :
                selectedCategory === "Study" ? "bg-yellow-200" :
                selectedCategory === "Work" ? "bg-sky-200" :
                "bg-pink-200"
              }`}
              onClick={() => handleTaskClick(task.id)}
            >
              <div className="flex items-start gap-2">
                {/* Icon */}
                <img
                  src={categories.find(c => c.name === selectedCategory)?.icon || iconAll}
                  alt="icon"
                  className="w-7 h-7 mt-1 opacity-90"
                />
                <div>
                  <div className="font-bold text-sm uppercase">
                    {task.title}
                  </div>
                  <div className={`text-xs ${
                    selectedCategory === "All" ? "text-purple-800" : 
                    selectedCategory === "Pet" ? "text-rose-800" :
                    selectedCategory === "Study" ? "text-yellow-800" :
                    selectedCategory === "Work" ? "text-sky-800" :
                    "text-pink-800"
                  }`}>
                    {task.description}
                  </div>
                </div>
              </div>
              <div className="text-xs font-semibold text-right leading-tight">
                {task.time.split("-")[0]} <br /> {task.time.split("-")[1]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}