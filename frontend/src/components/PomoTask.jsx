import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import uncheck from '@iconify-icons/mdi/check-circle-outline';
import check from '@iconify-icons/mdi/check-circle';
import setting from '@iconify-icons/mdi/settings-outline';
import add from '@iconify-icons/mdi/add-circle-outline';
import PomoSetting from '../components/modals/PomoSetting'
import PomoAdd from './modals/PomoAdd';
function PomoTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTask, setSelectedTask] = useState(null); // State to track selected task for settings
  const [isAdding, setIsAdding] = useState(false);

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

  const handleTaskCompletion = (taskId) => {
    console.log(`Task ${taskId} completion status changed`);
  };

  const handleSettings = (task) => {
    setSelectedTask(task); 
  };

  const handleAddTask = () => {
    setIsAdding(true); 
  };

  const handleCloseAdd = () => {
    setIsAdding(false);
  };

  const handleCloseSettings = () => {
    setSelectedTask(null); 
  };

  if (loading) return (
    <div className="flex justify-center py-4 w-full">
      <div className="animate-pulse text-center px-4">Loading tasks...</div>
    </div>
  );
  
  if (error) return (
    <div className="text-red-500 text-center py-4 px-4 w-full">
      <p>Error: {error}</p>
      <button 
        onClick={fetchTasks} 
        className="mt-2 px-4 py-1 bg-blue-100 rounded-md hover:bg-blue-200 text-sm"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center space-y-4 mt-4 w-full px-4 sm:px-0">
      {/* Header with task title and add button */}
      <div className='flex flex-row w-full max-w-md sm:max-w-xl md:max-w-2xl items-center justify-between px-1'>
        <div className='text-lg sm:text-xl md:text-2xl font-poppins font-semibold'>Task</div>
        <div>
          <Icon 
            icon={add} 
            className='w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 hover:cursor-pointer hover:scale-105 transition-transform' 
            onClick={handleAddTask}
          />
        </div>
      </div>

      {/* Empty state when no tasks */}
      {tasks.length === 0 && !loading && !error && (
        <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl py-8 text-center border-2 border-dashed rounded-lg">
          <p className="text-gray-500">No tasks yet</p>
          <p className="text-sm text-gray-400 mt-1">Click the + button to add your first task</p>
        </div>
      )}

      {/* Task list */}
        <div className="w-full space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {tasks.map((task, index) => (
            <div 
              key={task.id} 
              className={`border-2 rounded-lg p-3 sm:p-4 w-full max-w-md sm:max-w-xl md:max-w-2xl flex items-center min-h-14 sm:min-h-16 md:min-h-18 
              ${index === tasks.length - 1 ? 'bg-amber-100 sm:bg-amber-200' : 'bg-blue-100 sm:bg-blue-200'}
              transition-all duration-200 hover:shadow-md hover:cursor-pointer`}
            >
            <div className="w-full flex items-center justify-between">
              {/* Left part of task */}
              <div className="flex items-center flex-1 min-w-0">
                <Icon 
                  icon={task.completed ? check : uncheck} 
                  className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex-shrink-0 hover:cursor-pointer hover:scale-105 transition-transform' 
                  onClick={() => handleTaskCompletion(task.id)}
                />
                <h3 className="ml-2 sm:ml-3 md:ml-4 text-sm sm:text-base font-semibold truncate">
                  {task.Pomo_Task_Title}
                </h3>
              </div>
              
              {/* Settings icon */}
              <div>??/??</div>
              <Icon 
                icon={setting} 
                className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex-shrink-0 ml-2 hover:cursor-pointer hover:scale-105 transition-transform' 
                onClick={() => handleSettings(task)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Render PomoSetting if a task is selected */}
      {selectedTask && (
        <PomoSetting task={selectedTask} onClose={handleCloseSettings} />
      )}

      {isAdding && (
        <PomoAdd onClose={handleCloseAdd} />
      )}
    </div>
  
  );
}

export default PomoTask;