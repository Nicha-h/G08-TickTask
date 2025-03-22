import React, { useState, useRef, useEffect } from 'react';
import { addWeeks, subWeeks, format, startOfWeek, eachDayOfInterval } from 'date-fns';
import ArrowLeft from '../assets/ArrowLeft.svg';
import ArrowRight from '../assets/ArrowRight.svg';

function Home() {
  const date = new Date();
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(format(date, 'yyyy-MM-dd')); // Default to today's date
  const [selectedDateElement, setSelectedDateElement] = useState(null);
  const [boxPosition, setBoxPosition] = useState({ left: 0, width: 0 });

  const tasks = {
    '2023-10-23': [
      { id: 1, description: 'Task 1', time: '00:00 - 00:00' },
      { id: 2, description: 'Task 2', time: '00:00 - 00:00' },
    ],
  };

  const [day, year] = [date.getUTCDate(), date.getFullYear()];
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(date));
  const weekday = date.toLocaleString('default', { weekday: 'long' });
  const month = date.toLocaleString('default', { month: 'long' });
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).format(date);

  const weekDays = eachDayOfInterval({
    start: currentWeekStart,
    end: addWeeks(currentWeekStart, 1),
  });

  const handleDateClick = (date, element) => {
    setSelectedDate(format(date, 'yyyy-MM-dd'));
    setSelectedDateElement(element);
    updateBoxPosition(element);
  };

  const updateBoxPosition = (element) => {
    if (element && calendarRef.current) {
      const rect = element.getBoundingClientRect();
      const parentRect = calendarRef.current.getBoundingClientRect();
      setBoxPosition({
        left: rect.left - parentRect.left,
        width: rect.width,
      });
    }
  };

  const handlePrevWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  useEffect(() => {
    if (calendarRef.current) {
      const todayElement = calendarRef.current.querySelector(
        `[data-date="${format(date, 'yyyy-MM-dd')}"]`
      );
      if (todayElement) {
        updateBoxPosition(todayElement);
        setSelectedDateElement(todayElement);
      }
    }
  }, [calendarRef.current, currentWeekStart]); 

  useEffect(() => {
    const handleResize = () => {
      if (selectedDateElement) {
        updateBoxPosition(selectedDateElement);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedDateElement]);

  return (
    <>
      <div className="flex grid-cols-2 justify-center gap-[249px] items-center w-full font-poppins">
        <div className="font-bold text-2xl">Welcome, Inwza0072545!</div>
        <div className="flex flex-row">
          <div className="flex justify-center items-center w-[100px] h-[100px] border-2 rounded-xl font-fredoka">
            <div className="text-[60px]">{day}</div>
          </div>
          <div className="flex flex-col">
            <div className="mt-[25px] ml-[14px] font-bold text-base">
              {weekday}, {month} {year}
            </div>
            <div className="mt-[12px] ml-[14px] font-bold text-base">{time}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[1078px] my-4 border-t border-1 border-gray"></div>
      </div>
      {/* Calendar Area */}
      <div className="flex justify-center items-center">
        <button
          onClick={handlePrevWeek}
          className="p-2 mb-7 hover:scale-105 transition-all duration-200 "
        >
          <img src={ArrowLeft} alt="Previous Week" className='w-[20px] h-[20px]'/>
        </button>
        <div
          ref={calendarRef}
          className="p-4 relative mx-4"
        >
          {/* Blue Border Box */}
          <div
            className="absolute border-2 border-blue-500 rounded-lg transition-all duration-300"
            style={{
              left: `${boxPosition.left}px`,
              width: `${boxPosition.width}px`,
              height: '50%',
              top: '10%',
            }}
          ></div>

          <div className="flex justify-center grid-cols-7 gap-3 text-center font-bold">
            {weekDays.map((day, index) => {
              const isSelected = format(day, 'yyyy-MM-dd') === selectedDate;
              return (
                <div
                  key={index}
                  data-date={format(day, 'yyyy-MM-dd')} 
                  ref={(el) => isSelected && setSelectedDateElement(el)}
                  className={`p-1 ${isSelected ? 'text-blue-500' : ''}`}
                  onClick={(e) => handleDateClick(day, e.currentTarget)}
                >
                  <div className="text-[16px]">{format(day, 'EEE')}</div>
                  <div className="text-[16px]">{format(day, 'd')}</div>
                </div>
              );
            })}
          </div>
          {selectedDate && (
            <div className="mt-4">
              <h3 className="font-bold">Tasks for {selectedDate}</h3>
              {tasks[selectedDate]?.map((task) => (
                <div key={task.id} className="mt-2">
                  <strong>{task.description}</strong> - {task.time}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleNextWeek}
          className="p-2 mb-7 hover:scale-105 transition-all duration-200"
        >
          <img src={ArrowRight} alt="Next Week" className='w-[20px] h-[20px]'/>
        </button>
      </div>

      {/*Category Area */}
      <div className="flex justify-center">
        <div className="w-[1078px] my-4 border-t border-1 border-gray"></div>
      </div>
      <div className='font-poppins font-bold text-2xl'>Category</div>
    </>
  );
}

export default Home;