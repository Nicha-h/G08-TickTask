import React, { useState, useEffect } from 'react';
import iconPet from '../assets/iconPet.svg';
import iconComputer from '../assets/iconComputer.svg';
import iconArt from '../assets/iconArt.svg';
import iconSmile from '../assets/iconSmile.svg';
import iconWorkout from '../assets/iconWorkout.svg';
import iconStar from '../assets/iconStar.svg';
import iconHeart from '../assets/iconHeart.svg';
import iconGame from '../assets/iconGame.svg';
import iconScience from '../assets/iconScience.svg';
import iconCode from '../assets/iconCode.svg';
import iconBook from '../assets/iconBook.svg';
import iconHeartbeat from '../assets/iconHeartbeat.svg';
import iconUmbrella from '../assets/iconUmbrella.svg';
import iconAll from '../assets/iconAll.svg';
import iconStudy from '../assets/iconStudy.svg';
import iconWork from '../assets/iconWork.svg';
import { useLocation, NavLink } from 'react-router-dom';

const TaskList = ({ tasks: initialTasks, selectedDate = null }) => {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const simplifiedTasks = isHomePage ? tasks.slice(0, 4) : tasks;

  const iconMap = {
    pet: iconPet,
    computer: iconComputer,
    art: iconArt,
    smile: iconSmile,
    workout: iconWorkout,
    star: iconStar,
    heart: iconHeart,
    game: iconGame,
    science: iconScience,
    code: iconCode,
    book: iconBook,
    heartbeat: iconHeartbeat,
    umbrella: iconUmbrella,
    all: iconAll,
    study: iconStudy,
    work: iconWork
  };

  useEffect(() => {
    if (!initialTasks && selectedDate) {
      fetchTasks(selectedDate);
    }
  }, [initialTasks, selectedDate]);

  const fetchTasks = async (date) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/tasks/by-date?date=' + date, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();

      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sortedTasks = tasks.sort((a, b) => {
    const timeA = a.Task_Start_Time.split(':').map(Number);
    const timeB = b.Task_Start_Time.split(':').map(Number);
    return timeA[0] - timeB[0] || timeA[1] - timeB[1];  
  });

  if (loading) return <div className="flex justify-center py-4">Loading tasks...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>;

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="w-[708px] flex justify-end mb-2">
        {isHomePage && (
          <NavLink 
            to="/taskList" 
            className="text-xs underline cursor-pointer hover:text-blue-600"
          >
            view all
          </NavLink>
        )}
      </div>

      {simplifiedTasks.length > 0 ? (
        sortedTasks.map((task, index) => (
          <div 
            key={task.id || index} 
            className={`border-2 rounded-[10px] p-4 w-full max-w-[708px] h-[70px] flex items-center 
               transition duration-300 hover:brightness-90 hover:scale-105 hover:cursor-pointer`} 
            style={{ backgroundColor: task.Task_Color || '#A7A7A7' }}
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex justify-center items-center">
                <div className="ml-4 flex flex-row justify-start items-start w-[600px] h-auto">
                  <img src={iconMap[task.Task_Icon]} alt={task.Task_Title} className='w-10 h-10'/>
                  <div className='ml-4 flex flex-col justify-start items-start w-[600px] h-auto'>
                    <h3 className="text-base font-bold">{task.Task_Title}</h3>
                    <p className="text-xs text-gray-700">{task.Task_Description}</p>
                  </div>
                </div>
                {task.Task_Start_Time && (
                  <p className="flex justify-end items-end text-xs pl-2 font-bold">
                    {task.Task_Start_Time} - {task.Task_End_Time || '23:59'}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-4">No tasks to display</div>
      )}
    </div>
  );
};

export default TaskList;
