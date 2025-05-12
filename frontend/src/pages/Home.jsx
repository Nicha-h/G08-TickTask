import React, { useState, useEffect } from 'react';
import WeeklyCalendar from '../components/WeeklyCalendar';
import { format } from 'date-fns';
import AddTask from '../components/AddTask';
import CategoryBox from '../components/CategoryBox';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useWindowSize } from '../hooks/useWindowSize';
import Men1 from '../assets/ProfilePics/men1.svg';


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
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const idFromToken = decoded.id || decoded.userId || decoded._id;
      setUserID(idFromToken);
    } catch (err) {
      console.error("Invalid token:", err);
      setError("Authentication failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userID) {
      fetchUsername();
    }
  }, [userID]);

  const fetchUsername = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Profile response:", response.data);
      setUsername(response.data.Username);
    } catch (err) {
      console.error("Error fetching username:", err);
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-6 w-full font-poppins">
      {/* Clock + Greeting */}
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row sm:justify-between items-center gap-4">
        <div className='grid grid-cols-2 justify-center'>
        <div className="font-bold text-2xl sm:text-3xl text-center sm:text-left">Welcome, {username || 'Guest'}!</div>
        {isMobile && <div className='flex justify-center'><img 
              onClick={() => navigate('/profile')}
              className="h-20 w-20 md:h-6 md:w-6 transition-all duration-200 ease-in-out transform" 
              src={Men1} 
              alt="profile"
            />
            </div>}
        
        </div>
        <div className="flex items-center gap-4">
          <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[100px] md:h-[100px] lg:w-[100px] lg:h-[100px] border-2 rounded-xl font-fredoka flex items-center justify-center">
            <div className="text-[50px] sm:text-[50px] md:text-[50px] lg:text-[50px]">{day}</div>
          </div>
          <div className="flex flex-col text-sm sm:text-base font-bold">
            <div>{weekday}, {month} {year}</div>
            <div>{time}</div>
          </div>
        </div>
      </div>
        {/* Divider */}
          {!isMobile &&<div className="w-full my-4 border-t border-gray-300"></div>}

        {/* Search Bar */}
        {isMobile && <div className="mb-6">
          <input 
            type="text"
            placeholder="Search"
            className="mt-3 w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>}
      

      {/* Calendar */}
      <WeeklyCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />

      {/* Divider */}
      <div className="w-full my-4 border-t border-gray-300"></div>
        
      {/* Category */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl sm:text-2xl font-bold">Category</h2>
          <NavLink to="/category" className="text-xs underline hover:text-blue-600">
            View all
          </NavLink>
        </div>
        <CategoryBox />
      </div>

      {/* AddTask - show on desktop only */}
      {!isMobile && <AddTask />}
    </div>
  );
}

export default Home;
