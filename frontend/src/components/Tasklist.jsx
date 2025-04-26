import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
//import editIcon from '@iconify-icons/mdi/pencil';
//import deleteIcon from '@iconify-icons/mdi/delete';
import { useLocation, NavLink } from 'react-router-dom';
import briefcase from '@iconify-icons/mdi/briefcase-outline';

const TaskList = ({ tasks: initialTasks, selectedDate = null }) => {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const simplifiedTasks = isHomePage ? tasks.slice(0, 4) : tasks;


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
        simplifiedTasks.map((task, index) => (
          <div 
            key={task.id || index} 
            className={`border-2 rounded-[10px] p-4 w-full max-w-[708px] h-[70px] flex items-center ${index === simplifiedTasks.length - 1 ? 'bg-amber-200' : 'bg-blue-200'}`}
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex justify-center items-center">
                <div className="ml-4 flex flex-row justify-start items-start w-[600px] h-auto">
                  <Icon icon={briefcase} className='w-10 h-10'/>
                  <div className='ml-4 flex flex-col justify-start items-start w-[600px] h-auto'>
                    <h3 className="text-base font-bold">{task.Task_Title}</h3>
                    <p className="text-xs text-gray-700">{task.Task_Description}</p>
                  </div>
                  
                </div>
                {task.time && (   
                  <p className="flex justify-end items-end text-xs font-bold">{task.Task_Start_Time}</p>
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