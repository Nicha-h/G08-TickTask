import React, { useState, useEffect } from 'react';
import WeeklyCalendar from '../components/WeeklyCalendar';
import {format} from 'date-fns';
import AddTask from '../components/AddTask';
import CategoryBox from '../components/CategoryBox';
import { NavLink } from 'react-router-dom';

function Home() {
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(format(date, 'yyyy-MM-dd'));
  
  const [day, year] = [date.getUTCDate(), date.getFullYear()];
  const weekday = date.toLocaleString('default', { weekday: 'long' });
  const month = date.toLocaleString('default', { month: 'long' });
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).format(date);

  const [userID, setUserID] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
    if (userID) {
      fetchUsername();
    }
}, [userID]);
  
    const fetchUsername = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/users/profile/${userID}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
    
        if (!response.ok) throw new Error('Failed to fetch user profile');
        const data = await response.json();
        
        setUsername(data.username); // Adjust according to your actual response shape
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  return (
    <>
      {/*Clock + User Greetings*/}
      <div className="flex grid-cols-2 justify-center gap-[249px] items-center w-full font-poppins">
        <div className="font-bold text-2xl">Welcome, ${fetchUsername}</div>
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
      />

      <div className="flex justify-center">
        <div className="w-[1078px] my-4 border-t border-1 border-gray"></div>
      </div>

      {/*Category*/}
      <div className='flex flex-col justify-start items-center'>
        <div className='ml-50 mt-8 flex flex-col font-poppins font-bold text-2xl w-full'>Category
        <div className="w-[1008px] flex justify-end mb-2">
        <NavLink to="/taskList" className="flex justify-end text-xs underline cursor-pointer hover:text-blue-600">
            view all
        </NavLink>
        </div>
      </div>
      
        <CategoryBox/>
      </div>
      <AddTask/>
    </>

  );
}

export default Home;