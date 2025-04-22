import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import uncheck from '@iconify-icons/mdi/check-circle-outline';
import check from '@iconify-icons/mdi/check-circle';
import setting from '@iconify-icons/mdi/settings-outline';
import add from '@iconify-icons/mdi/add-circle-outline';
function PomoTask () {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);
  
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/pomodoroTask', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const result = await response.json();
      setTasks(result.data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center py-4">Loading tasks...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>;

  return (
    <div className="flex flex-col justify-center items-center space-y-4 mt-4 w-full">
      <div className='flex flex-row w-[708px] h-[40px]'>
        <div className='flex justify-start items-center mt-1 text-2xl font-poppins  '>Task</div>
        <div className='flex justify-end items-end ml-[620px]'>
          <Icon icon={add} className='w-9 h-9 hover:cursor-pointer hover:scale-105'></Icon>
        </div>
      </div>
      {tasks.map((task, index) => (
        <div key={task.id} className={`border-2 rounded-[10px] p-4 w-full max-w-[708px] h-[70px] flex items-center ${index === tasks.length - 1 ? 'bg-amber-200' : 'bg-blue-200'}`}>
          <div className="w-full flex items-center justify-between">
            <div className="flex justify-center items-center">
              <div className="ml-4 flex flex-row justify-start items-start w-[600px] h-auto">
                <Icon icon={uncheck} className='w-9 h-9 hover:cursor-pointer hover:scale-105'></Icon>
                <h3 className="mt-1.5 ml-5 text-base font-bold">{task.Pomo_Task_Title}</h3>
                <Icon icon={setting} className='flex items-end w-9 h-9'></Icon>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PomoTask;
