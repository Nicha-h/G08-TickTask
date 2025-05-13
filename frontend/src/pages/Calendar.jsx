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

dayjs.extend(weekday);
dayjs.extend(isoWeek);

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs().date());
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      day: "FRI",
      date: "07",
      name: "CSC122 Quiz#2",
      title: "CSC122 Quiz#2",
      startTime: "09:00",
      endTime: "10:30",
      color: "#FFECB4",
      category: "Study",
      description: "Prepare for chapter 5-8",
      startDate: "2025-05-08",
      endDate: "2025-05-07",
      icon: iconSmile,
    },
    {
      id: 2,
      day: "TUE",
      date: "11",
      name: "Midterm #209",
      title: "Midterm #209",
      startTime: "13:00",
      endTime: "15:00",
      color: "#FFECB4",
      category: "Study",
      description: "Midterm exam for Computer Science",
      startDate: "2025-03-11",
      endDate: "2025-03-11",
      icon: iconSmile,
    },
    {
      id: 3,
      day: "THU",
      date: "13",
      name: "Frog-Catching",
      title: "Frog-Catching",
      startTime: "07:00",
      endTime: "13:00",
      color: "#D1F4FF",
      category: "Personal",
      description: "Annual frog-catching competition",
      startDate: "2025-03-13",
      endDate: "2025-03-13",
      icon: iconSmile,
    },
    {
      id: 4,
      day: "SUN",
      date: "23",
      name: "Run for Life",
      title: "Run for Life",
      startTime: "09:00",
      endTime: "12:00",
      color: "#FFC6F0",
      category: "Workout",
      description: "Charity marathon 10km",
      startDate: "2025-03-23",
      endDate: "2025-03-23",
      icon: iconSmile,
    },
  ]);

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

  const handleTaskUpdate = (updatedTask) => {
    const updatedDate = dayjs(updatedTask.startDate);
    const updatedDay = updatedDate.format("ddd").toUpperCase();
    const updatedDateNum = updatedDate.format("DD");

    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id
          ? {
              ...updatedTask,
              name: updatedTask.title,
              day: updatedDay,
              date: updatedDateNum,
            }
          : task
      )
    );
    setSelectedTask(null);
  };

  const handleTaskDelete = (taskToDelete) => {
    setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
    setSelectedTask(null);
  };
  

  const closeModal = () => {
    setSelectedTask(null);
  };

  // Render calendar cells with events
  const renderCalendarCell = (date, currentMonth) => {
    const fullDate = currentDate.date(date).format("YYYY-MM-DD");
    const taskForDate = tasks.find((task) => task.startDate === fullDate);

    return (
      <td
        key={`${date}-${currentMonth}`}
        className={`border-2 border-gray-400 align-top h-20 sm:h-24 p-0.5 sm:p-1 text-[10px] sm:text-xs relative cursor-pointer ${
          !currentMonth ? "text-gray-400" : ""
        }`}
        onClick={() => currentMonth && setSelectedDate(date)}
      >
        <div
          className={`ml-0.5 sm:ml-1 font-semibold inline-block px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-sm ${
            date === selectedDate && currentMonth ? "bg-green-100" : ""
          }`}
        >
          {date}
        </div>
        {taskForDate && currentMonth && (
          <div
            className="text-[8px] font-semibold h-6 w-full sm:text-xs p-1 text-center truncate"
            style={{ backgroundColor: taskForDate.color || "#FEF445" }}
          >
            {taskForDate.name}
          </div>
        )}
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
        <h2 className="text-2xl font-bold uppercase tracking-wide">
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
                  className="bg-[#e7f1a8] text-[10px] sm:text-sm md:text-base font-medium text-black border-2 border-gray p-1 sm:p-2 w-[14.28%]"
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
        <h3 className="text-lg font-semibold mb-3">Upcoming Tasks</h3>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border border-black w-full rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer hover:brightness-95 transition"
              style={{ backgroundColor: task.color || "#FEF445" }}
              onClick={() => handleSettingClick(task)}
            >
              <div className="text-center mr-4">
                <div className="text-xs font-bold">{task.day}</div>
                <div className="text-lg font-bold">{task.date}</div>
              </div>

              <div className="flex-1 text-sm font-bold underline">
                {task.name}
              </div>

              <div className="flex items-center gap-2">
                {task.startTime && task.endTime && (
                  <div className="text-[12px] font-semibold whitespace-nowrap">
                    {task.startTime} - {task.endTime}
                  </div>
                )}
              </div>
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
                      (task) => task.startDate === fullDate
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
                            <div className="w-2 h-2 bg-black rounded-full mt-0.5"></div>
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
        <h3 className="text-lg font-semibold mb-3">Upcoming Tasks</h3>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={`mobile-${task.id}`}
              className="border border-black rounded-lg p-3 flex items-center cursor-pointer"
              style={{ backgroundColor: task.color || "#FEF445" }}
            >
              <div className="text-center mr-3 min-w-14">
                <div className="text-xs font-bold">{task.day}</div>
                <div className="text-lg font-bold">{task.date}</div>
              </div>

              <div className="flex-1 font-bold underline text-sm">
                {task.name}
              </div>

              <div className="flex items-center">
                {task.startTime && task.endTime && (
                  <div className="text-xs font-medium mr-2 hidden sm:block">
                    {task.startTime} - {task.endTime}
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSettingClick(task);
                  }}
                  className="p-1"
                >
                  <img src={setting} alt="settings" className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="p-4 max-w-5xl mx-auto font-poppins relative">
      {/* Desktop or Mobile View */}
      {isMobileView ? renderMobileCalendar() : renderDesktopCalendar()}

      {/* Add Task Button */}
      <button
        onClick={() => navigate("/addtask")}
        className="fixed bottom-6 right-6 sm:bottom-12 sm:right-16 bg-[#D7D9FF] border border-black rounded-full w-14 h-14 sm:w-16 sm:h-16 shadow-lg flex items-center justify-center hover:bg-[#c0c2ff] transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        <img src={plus} alt="add" className="w-6 h-6" />
      </button>

      {selectedTask && (
        <div className="fixed inset-0 bg-gray-800/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[85vh] h-auto overflow-y-auto shadow-2xl p-6">
            <TaskSettingModal
              task={selectedTask}
              onSave={handleTaskUpdate}
              onDelete={handleTaskDelete}
              onClose={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
