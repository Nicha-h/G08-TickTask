import { useState } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import next from "../assets/next.svg";
import prev1 from "../assets/prev1.svg";
import setting from "../assets/setting.svg";
import plus from "../assets/plus.svg";
import { useNavigate } from "react-router-dom";


dayjs.extend(weekday);
dayjs.extend(isoWeek);

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs().date());

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day();

  const prevMonth = currentDate.subtract(1, "month");
  const nextMonth = currentDate.add(1, "month");
  const daysInMonth = endOfMonth.date();
  const daysInPrevMonth = prevMonth.daysInMonth();
  const navigate = useNavigate();

  const getCalendarDays = () => {
    let days = [];

    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        currentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        currentMonth: true,
      });
    }

    while (days.length % 7 !== 0) {
      days.push({
        date: days.length - (startDay + daysInMonth) + 1,
        currentMonth: false,
      });
    }

    return days;
  };

  // ✅ ใช้วันที่เต็ม (format: YYYY-MM-DD)
  const events = {
    "2025-04-07": "CSC122 Quiz#2",
    "2025-04-11": "Midterm #209",
    "2025-04-13": "Frog-Catching",
    "2025-04-23": "Run for Life",
  };

  const eventColors = {
    "CSC122 Quiz#2": "bg-yellow-200",
    "Midterm #209": "bg-yellow-200",
    "Frog-Catching": "bg-blue-200",
    "Run for Life": "bg-pink-200",
  };

  const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const handleSettingClick = (task) => {
    console.log("Setting clicked for:", task);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto font-poppins">
      {/* Header */}
      <div className="flex justify-start items-center gap-2 mb-4">
        <button onClick={handlePrevMonth}><img src={prev1} alt="prev" /></button>
        <h2 className="text-2xl font-bold uppercase tracking-wide">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button onClick={handleNextMonth}><img src={next} alt="next" /></button>
      </div>

      {/* Calendar Table */}
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
                  {week.map(({ date, currentMonth }, j) => {
                    const fullDate = currentDate.date(date).format("YYYY-MM-DD");
                    return (
                      <td
                        key={j}
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
                        {events[fullDate] && currentMonth && (
                        <div className={`${eventColors[events[fullDate]] || "bg-yellow-100"} text-[8px] font-semibold h-6 w-full sm:text-xs p-1 text-center`}>
                            {events[fullDate]}
                        </div>
                      )}

                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

{/* Upcoming Tasks */}
<div className="mt-5">
  <h3 className="text-lg font-semibold mb-3">Upcoming Tasks</h3>

  <div className="space-y-3">
    {[
      { day: "FRI", date: "07", name: "CSC122 Quiz#2" },
      { day: "TUE", date: "11", name: "Midterm #209" },
      { day: "THRS", date: "13", name: "Frog-Catching", startTime: "07:00", endTime: "13:00" },
      { day: "SUN", date: "23", name: "Run for Life", startTime: "09:00", endTime: "12:00" },
    ].map((task, idx) => {
      const taskColors = {
        "Frog-Catching": "bg-blue-200",
        "Run for Life": "bg-pink-200",
        "default": "bg-yellow-200"
      };

      const bgColor = taskColors[task.name] || taskColors["default"];

      return (
        <div
          key={idx}
          className={`border border-black w-full ${bgColor} rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer hover:brightness-95 transition`}
        >
          {/* Left Date */}
          <div className="text-center mr-4">
            <div className="text-xs font-bold">{task.day}</div>
            <div className="text-lg font-bold">{task.date}</div>
          </div>

          {/* Center Name */}
          <div className="flex-1 text-sm font-bold underline">
            {task.name}
          </div>

          {/* Right Side (Time + Setting) */}
          <div className="flex items-center gap-2">
            {task.startTime && task.endTime && (
              <div className="text-[12px] font-semibold whitespace-nowrap">
                {task.startTime} - {task.endTime}
              </div>
            )}
            <button
              onClick={() => handleSettingClick(task)}
              className="p-1 hover:scale-105 transition"
            >
              <img src={setting} alt="setting" className="w-5 h-5" />
            </button>
          </div>
        </div>
      );
    })}
  </div>
</div>


      {/* Floating Add Button */}
      <button
        onClick={() => navigate('/addtask')}
        className="fixed bottom-6 right-6 sm:bottom-12 sm:right-16 bg-[#D7D9FF] border-1 border-black rounded-full w-14 h-14 sm:w-20 sm:h-20 shadow-lg flex items-center justify-center hover:bg-[#c0c2ff] transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        <img src={plus} alt="add" className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>
    </div>
  );
};

export default Calendar;
