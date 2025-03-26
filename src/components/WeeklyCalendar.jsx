// src/components/WeeklyCalendar.js
import React, { useState, useRef, useEffect } from 'react';
import { addWeeks, subWeeks, format, startOfWeek, eachDayOfInterval, isSameWeek } from 'date-fns';
import ArrowLeft from '../assets/ArrowLeft.svg';
import ArrowRight from '../assets/ArrowRight.svg';

const WeeklyCalendar = ({ selectedDate, onDateSelect, tasks }) => {
  const date = new Date();
  const calendarRef = useRef(null);
  const [selectedDateElement, setSelectedDateElement] = useState(null);
  const [boxPosition, setBoxPosition] = useState({ left: 0, width: 0 });
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(date, { weekStartsOn: 0 }));

  const weekDays = eachDayOfInterval({
    start: currentWeekStart,
    end: new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000) // Sunday to Saturday
  });

  const handleDateClick = (date, element) => {
    onDateSelect(format(date, 'yyyy-MM-dd'));
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

  const isSelectedDateInView = selectedDate && 
    isSameWeek(new Date(selectedDate), currentWeekStart);

  useEffect(() => {
    if (calendarRef.current && isSelectedDateInView) {
      const element = calendarRef.current.querySelector(
        `[data-date="${selectedDate}"]`
      );
      if (element) {
        updateBoxPosition(element);
        setSelectedDateElement(element);
      }
    } else {
      setSelectedDateElement(null);
    }
  }, [currentWeekStart, selectedDate, isSelectedDateInView]);

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
    <div className="flex justify-center items-center">
      <button onClick={handlePrevWeek} className="p-2 mb-7 cursor-pointer hover:scale-105 transition-all duration-200">
        <img src={ArrowLeft} alt="Previous Week" className='w-[20px] h-[20px]'/>
      </button>
      <div ref={calendarRef} className="p-4 relative mx-4">
        {isSelectedDateInView && selectedDateElement && (
          <div
            className="absolute border-2 border-blue-500 rounded-lg transition-all duration-300"
            style={{
              left: `${boxPosition.left}px`,
              width: `${boxPosition.width}px`,
              height: '50%',
              top: '10%',
            }}
          ></div>
        )}

        <div className="flex justify-center grid-cols-7 gap-3 text-center font-bold">
          {weekDays.map((day, index) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const isSelected = isSelectedDateInView && dateStr === selectedDate;
            
            return (
              <div
                key={index}
                data-date={dateStr}
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
      <button onClick={handleNextWeek} className="p-2 mb-7 hover:scale-105 transition-all duration-200">
        <img src={ArrowRight} alt="Next Week" className='w-[20px] h-[20px]'/>
      </button>
    </div>
  );
};

export default WeeklyCalendar;