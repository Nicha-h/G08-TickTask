import { useState } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import next from "../assets/next.svg";
import prev1 from "../assets/prev1.svg";
import setting from "../assets/setting.svg";
import plus from "../assets/plus.svg";

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

  const getCalendarDays = () => {
    let days = [];

    // วันที่จากเดือนก่อนหน้า
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        currentMonth: false,
      });
    }

    // วันที่ของเดือนปัจจุบัน
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        currentMonth: true,
      });
    }

    // วันที่ของเดือนถัดไป
    while (days.length % 7 !== 0) {
      days.push({
        date: days.length - (startDay + daysInMonth) + 1,
        currentMonth: false,
      });
    }

    return days;
  };

  const events = {
    // 7: "CSC122 Quiz#2",
    // 11: "Midterm #209",
  };

  const eventColors = {
    // "CSC122 Quiz#2": "bg-yellow-200",
    // "Midterm #209": "bg-yellow-200",
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
        <table className="table-fixed border-collapse w-full">
          <thead>
            <tr>
              {daysOfWeek.map((day) => (
                <th key={day} className="bg-[#e7f1a8] text-sm font-medium font-semibold text-black border-2 border-gray p-2 w-[14.28%]">
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
                  {week.map(({ date, currentMonth }, j) => (
                    <td
                      key={j}
                      className={`border-2 border-gray-400 align-top h-24 p-1 text-xs relative cursor-pointer ${
                        !currentMonth ? "text-gray-400" : ""
                      }`}
                      onClick={() => currentMonth && setSelectedDate(date)}
                    >
                      <div
                        className={`ml-1 font-semibold inline-block px-2 py-1 rounded-full text-sm ${
                          date === selectedDate && currentMonth ? "bg-green-100" : ""
                        }`}
                      >
                        {date}
                      </div>
                      {events[date] && currentMonth && (
                        <div className={`${eventColors[events[date]]} text-xs p-1 mt-1 rounded`}>
                          {events[date]}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

       {/* Upcoming Tasks */}
        <div className="mt-5">
        <h3 className="text-lg font-semibold mb-3">Upcoming Tasks</h3>

        <div className="space-y-3">
          {[{ day: "FRI", date: "07", name: "CSC122 Quiz#2" }, { day: "TUE", date: "11", name: "Midterm #209" }].map((task, idx) => (
            <div key={idx} className="border border-black w-full bg-[#FFECB4] rounded-md px-6 py-3 flex justify-between items-center cursor-pointer hover:bg-[#f3e4a4] transition">
              <div className="text-center mr-4">
                <div className="text-xs font-bold">{task.day}</div>
                <div className="text-lg font-bold">{task.date}</div>
              </div>
              <div className="flex-1 text-sm font-semibold">{task.name}</div>
             {/* ทำให้ setting คลิกได้ */}
              <button
                onClick={() => handleSettingClick(task)}
                className="ml-2 p-1 hover:scale-105 transition"
              >
                <img src={setting} alt="setting" className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-8 right-8 bg-[#D7D9FF] rounded-full w-14 h-14 shadow-lg flex items-center justify-center hover:bg-[#c0c2ff] transition">
        <img src={plus} alt="add" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Calendar;