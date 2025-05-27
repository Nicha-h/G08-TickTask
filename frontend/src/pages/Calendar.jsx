import { useState, useEffect } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import next from "../assets/next.svg";
import prev1 from "../assets/prev1.svg";
import setting from "../assets/setting.svg";
import plus from "../assets/plus.svg";
import { useNavigate } from "react-router-dom";
import TaskSettingModal from "../components/modals/TaskSettingModal.jsx";
import iconSmile from "../assets/iconSmile.svg";
import axios from "axios";




dayjs.extend(weekday);
dayjs.extend(isoWeek);

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs().date());
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

const token = localStorage.getItem("token");
  
useEffect(() => {
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
 const response = await axios.get(`http://localhost:3000/api/tasks`, { 
      params: {  
        date: currentDate.format('YYYY-MM-DD')
      },
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
     const processedTasks = response.data.map(task => {
        const taskDate = dayjs(task.Task_Start_Date);
        return {
          ...task,
          day: shortDaysOfWeek[taskDate.day()], 
          date: taskDate.date(), 
          fullDate: taskDate 
        };
      });

      // Sort tasks by start time
       const sortedTasks = processedTasks.sort((a, b) => {
        const dateCompare = a.fullDate - b.fullDate;
        if (dateCompare !== 0) return dateCompare;
        
        const timeA = (a.Task_Start_Time || '00:00').split(':').map(Number);
        const timeB = (b.Task_Start_Time || '00:00').split(':').map(Number);
        return timeA[0] - timeB[0] || timeA[1] - timeB[1];
      });

      setTasks(sortedTasks);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchTasks();
}, [currentDate, token]); // Refetch when month changes
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const shortDaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calendar logic
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = endOfMonth.date();
  const daysInPrevMonth = currentDate.subtract(1, "month").daysInMonth();

  const getCalendarDays = () => {
    let days = [];

    // Days from previous month
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({ date: daysInPrevMonth - i, currentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: i, currentMonth: true });
    }

    // Days from next month to complete the grid
    while (days.length % 7 !== 0) {
      days.push({
        date: days.length - (startDay + daysInMonth) + 1,
        currentMonth: false,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handleSettingClick = (task) => {
    setSelectedTask(task);
  };

 const handleTaskSave = (updatedTask) => {
    console.log("Saving task. Original tasks:", tasks);
    console.log("Updated task:", updatedTask);

    if (updatedTask === null) {
      // Handle delete case
      console.log("Deleting task with TaskID:", selectedTask?.TaskID);
      setTasks(prev => prev.filter(t => t.TaskID !== selectedTask?.TaskID));
    } else {
      // Handle update case - using TaskID instead of id
      console.log("Updating task with TaskID:", updatedTask.TaskID);
      setTasks(prev => {
        const newTasks = prev.map(t => {
          const shouldUpdate = t.TaskID === updatedTask.TaskID;
          console.log(`Task ${t.TaskID}:, shouldUpdate = ${shouldUpdate}`);
          return shouldUpdate ? updatedTask : t;
        });
        console.log("New tasks array:", newTasks);
        return newTasks;
      });
    }
    setSelectedTask(null);
  };


  const closeModal = () => {
    setSelectedTask(null);
  };
  

  // Render calendar cells with events
  const renderCalendarCell = (date, currentMonth) => {
  if (!currentMonth) {
    return (
      <td
        key={`${date}-${currentMonth}`}
        className="border-2 border-gray-400 align-top h-20 sm:h-24 p-0.5 sm:p-1 text-[10px] sm:text-xs text-gray-400"
      >
        <div className="ml-0.5 sm:ml-1 font-semibold inline-block px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-sm">
          {date}
        </div>
      </td>
    );
  }

  const fullDate = currentDate.date(date).format("YYYY-MM-DD");
  const tasksForDate = tasks.filter(task => 
    dayjs(task.Task_Start_Date).isSame(fullDate, 'day')
  );

  return (
    <td
      key={`${date}-${currentMonth}`}
      className="border-2 border-gray-400 align-top h-20 sm:h-24 p-0.5 sm:p-1 text-[10px] sm:text-xs relative cursor-pointer"
      onClick={() => setSelectedDate(date)}
    >
      <div
        className={`ml-0.5 sm:ml-1 font-semibold inline-block px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-sm ${
          date === selectedDate ? "bg-green-100" : ""
        }`}
      >
        {date}
      </div>
      {tasksForDate.map(task => (
        <div
          key={task.Task_Title}
          className="text-[8px] font-poppins font-bold h-6 w-full sm:text-xs p-1 text-center truncate mb-1"
          style={{ backgroundColor: task.Task_Color || "#FEF445" }}
        >
          {task.Task_Title || task.title}
        </div>
      ))}
    </td>
  );
};
  // Desktop View
  const renderDesktopCalendar = () => (
    <>
      <div className="flex justify-start items-center gap-2 mb-4">
        <button onClick={handlePrevMonth}>
          <img src={prev1} alt="prev" />
        </button>
        <h2 className="text-2xl font-bold font-poppins uppercase tracking-wide">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button onClick={handleNextMonth}>
          <img src={next} alt="next" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-fixed border-collapse w-full text-[10px] sm:text-sm md:text-base">
          <thead>
            <tr>
              {daysOfWeek.map((day) => (
                <th
                  key={day}
                  className="bg-[#e7f1a8] text-[10px] sm:text-sm md:text-base font-poppins font-medium text-black border-2 border-gray p-1 sm:p-2 w-[14.28%]"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getCalendarDays()
              .reduce((rows, day, index) => {
                if (index % 7 === 0) rows.push([]);
                rows[rows.length - 1].push(day);
                return rows;
              }, [])
              .map((week, i) => (
                <tr key={i}>
                  {week.map(({ date, currentMonth }) =>
                    renderCalendarCell(date, currentMonth)
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

    <div className="mt-5">
      <h3 className="text-lg font-poppins font-bold mb-3">Upcoming Tasks</h3>
      <div className="space-y-3">
        {tasks
          .filter(task => dayjs(task.Task_Start_Date).isAfter(dayjs().subtract(1, 'day')))
          .map((task) => (
            <div
              key={task.TaskID}
              className="border border-black w-full rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer hover:brightness-95 transition"
              style={{ backgroundColor: task.Task_Color || "#FEF445" }}
              onClick={() => handleSettingClick(task)}
            >
              <div className="text-center mr-4 min-w-[50px]">
                <div className="text-xs font-poppins uppercase font-bold">{task.day}</div>
                <div className="text-lg font-poppins font-bold">{task.date}</div>
              </div>

              <div className="flex-1 font-poppins text-sm font-bold underline">
                {task.Task_Title}
              </div>

              {task.Task_Start_Time && task.Task_End_Time && (
                <div className="text-[13px] font-poppins font-bold whitespace-nowrap">
                  {task.Task_Start_Time} - {task.Task_End_Time}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  </>
);

  // Mobile View
  const renderMobileCalendar = () => (
    <>
      <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-lg">
        <button onClick={handlePrevMonth} className="p-1">
          <img src={prev1} alt="prev" className="w-4 h-4" />
        </button>
        <h2 className="text-xl font-bold tracking-wide">
          {currentDate.format("MMMM YYYY").toUpperCase()}
        </h2>
        <button onClick={handleNextMonth} className="p-1">
          <img src={next} alt="next" className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg">
        <table className="table-fixed border-collapse w-full text-xs">
          <thead>
            <tr>
              {shortDaysOfWeek.map((day) => (
                <th
                  key={day}
                  className="bg-[#e7f1a8] font-medium text-black border border-gray-300 p-1 w-[14.28%]"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getCalendarDays()
              .reduce((rows, day, index) => {
                if (index % 7 === 0) rows.push([]);
                rows[rows.length - 1].push(day);
                return rows;
              }, [])
              .map((week, i) => (
                <tr key={i}>
                  {week.map(({ date, currentMonth }) => {
                    const fullDate = currentDate
                      .date(date)
                      .format("YYYY-MM-DD");
                    const taskForDate = tasks.find(
                      (task) => task.Task_Start_Date === fullDate
                    );

                    return (
                      <td
                        key={`mobile-${date}-${currentMonth}`}
                        className={`border border-gray-300 align-top h-12 p-0.5 text-xs relative cursor-pointer ${
                          !currentMonth ? "text-gray-300" : ""
                        }`}
                        style={
                          taskForDate && currentMonth
                            ? { backgroundColor: taskForDate.color }
                            : {}
                        }
                        onClick={() => currentMonth && setSelectedDate(date)}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <div
                            className={`inline-block rounded-full text-center w-6 h-6 flex items-center justify-center ${
                              date === selectedDate && currentMonth
                                ? "bg-green-100"
                                : ""
                            }`}
                          >
                            {date}
                          </div>
                          {taskForDate && currentMonth && (
                            <div className="w-2 h-2 bg-[#ff5eb5] border-1 rounded-full mt-0.5"></div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

     
    <div className="mt-5">
      <h3 className="text-lg font-poppins font-bold mb-3">Upcoming Tasks</h3>
      <div className="space-y-3">
        {tasks
          .filter(task => dayjs(task.Task_Start_Date).isAfter(dayjs().subtract(1, 'day')))
          .map((task) => (
            <div
              key={`mobile-${task.TaskID}`}
              className="border border-black font-poppins rounded-lg p-3 flex items-center cursor-pointer"
              style={{ backgroundColor: task.Task_Color || "#FEF445" }}
              onClick={() => handleSettingClick(task)}
            >
              <div className="text-center mr-3 min-w-14">
                <div className="text-sm font-poppins uppercase font-bold">{task.day}</div>
                <div className="text-sm font-poppins font-bold">{task.date}</div>
              </div>

              <div className="flex-1 font-bold underline text-sm">
                {task.Task_Title}
              </div>

              {task.Task_Start_Time && task.Task_End_Time && (
                <div className="text-xs font-poppins font-bold mr-2">
                  {task.Task_Start_Time} - {task.Task_End_Time}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  </>
);

  return (
    <div className="p-4 max-w-5xl mx-auto font-poppins relative">
          {error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        {error}
      </div>
    )}
      {/* Desktop or Mobile View */}
      {isMobileView ? renderMobileCalendar() : renderDesktopCalendar()}

      {/* Add Task Button */}
      <button
        onClick={() => navigate("/add")}
        className="fixed bottom-[60px] right-[76px] w-[87px] h-[87px] rounded-full border-2 bg-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
      >
        <img src={plus} alt="add" className="w-6 h-6" />
      </button>

{selectedTask && (
        <div className="fixed inset-0 bg-gray-800/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[85vh] h-auto overflow-y-auto shadow-2xl p-6">
            <TaskSettingModal 
              task={selectedTask}
              onSave={handleTaskSave}
              onClose={() => setSelectedTask(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;