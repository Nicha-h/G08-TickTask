import React, { useState } from 'react';
import WeeklyCalendar from '../components/WeeklyCalendar';
import {format} from 'date-fns';

function Home() {
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(format(date, 'yyyy-MM-dd'));

  const tasks = {
    '2023-10-23': [
      { id: 1, description: 'Task 1', time: '00:00 - 00:00' },
      { id: 2, description: 'Task 2', time: '00:00 - 00:00' },
    ],
  };

  const [day, year] = [date.getUTCDate(), date.getFullYear()];
  const weekday = date.toLocaleString('default', { weekday: 'long' });
  const month = date.toLocaleString('default', { month: 'long' });
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).format(date);

  return (
    <>
      {/*Clock + User Greetings*/}
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
      
      {/* Calendar*/}
      <WeeklyCalendar 
        selectedDate={selectedDate} 
        onDateSelect={setSelectedDate}
        tasks={tasks}
      />

      <div className="flex justify-center">
        <div className="w-[1078px] my-4 border-t border-1 border-gray"></div>
      </div>
      
      {/*Category*/}
      <div className='font-poppins font-bold text-2xl'>Category</div>
    </>
  );
}

export default Home;