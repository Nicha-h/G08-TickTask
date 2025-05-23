import { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { iconComponents } from './modals/icon';

const TaskList = ({ tasks: initialTasks, selectedDate = null }) => {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  
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
  const simplifiedTasks = isHomePage ? sortedTasks.slice(0, 4) : sortedTasks;
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
            className={`border-2 rounded-[10px] p-4 w-full max-w-[708px] h-[70px] flex items-center 
               transition duration-300 hover:brightness-90 hover:scale-105 hover:cursor-pointer`} 
            style={{ backgroundColor: task.Task_Color || '#A7A7A7' }}
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex justify-center items-center">
                <div className="ml-4 flex flex-row justify-start items-start w-[600px] h-auto">
                  <img src={iconComponents[task.Task_Icon]} alt={task.Task_Title} className='w-10 h-10'/>
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
