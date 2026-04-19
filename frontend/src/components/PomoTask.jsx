import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import uncheck from '@iconify-icons/mdi/check-circle-outline';
import check from '@iconify-icons/mdi/check-circle';
import setting from '@iconify-icons/mdi/settings-outline';
import add from '@iconify-icons/mdi/add-circle-outline';
import PomoSetting from '../components/modals/PomoSetting'
import PomoAdd from './modals/PomoAdd';
import { apiClient } from '../util/apiClient';
function PomoTask({ onTaskSelect, activeTaskId, tasks, setTasks, fetchTasks }) {
  const [loading, _setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTask, setSelectedTask] = useState(null); 
  const [isAdding, setIsAdding] = useState(false);

  const handleTaskCompletion = async (pomo_TaskId, currentStatus) => {
    try {
      const taskToUpdate = tasks.find(task => task.Pomo_TaskId === pomo_TaskId);
      if (!taskToUpdate) {
        throw new Error('Task not found');
      }
      
      const completedCount = !currentStatus ? taskToUpdate.Pomo_Target_Count : 0;
      
      await apiClient.put(
        `/api/pomodoroTask/${pomo_TaskId}`, 
        {
          Pomo_Task_Status: !currentStatus,
          Pomo_Completed_Count: completedCount,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );
  
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.Pomo_TaskId === pomo_TaskId
            ? { 
                ...task, 
                Pomo_Task_Status: !currentStatus,
                Pomo_Completed_Count: completedCount
              }
            : task
        )
      );
  
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleUpdateTask = (updatedTask) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.Pomo_TaskId === updatedTask.Pomo_TaskId ? updatedTask : task
      )
    );
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

  const handleDelete = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.Pomo_TaskId !== taskId));
  };
  
  const handleTaskSelect = (task) => {
    if (onTaskSelect) {
      onTaskSelect(task);
    }
  };
  
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.Pomo_Task_Status && !b.Pomo_Task_Status) return 1;
    if (!a.Pomo_Task_Status && b.Pomo_Task_Status) return -1;
    
    // For tasks that are active, prioritize the one selected as active
    if (!a.Pomo_Task_Status && !b.Pomo_Task_Status) {
      if (a.Pomo_TaskId === activeTaskId) return -1;
      if (b.Pomo_TaskId === activeTaskId) return 1;
    }
    
    return 0;
  });
  
  if (loading) return (
    <div className="flex justify-center py-4 w-full">
      <div className="animate-pulse text-center px-4">Loading tasks...</div>
    </div>
  );
  
  if (error) return (
    <div className="text-red-500 text-center py-4 px-4 w-full">
      <p>Error: {error}</p>
      <button 
        onClick={() => {
          setError('');
          if (fetchTasks) fetchTasks();
        }} 
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

      {/* Task list - now using sortedTasks instead of tasks */}
      <div className="w-full space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {sortedTasks.map((task, index) => (
          <div 
            key={task.Pomo_TaskId}
            className={`border-2 rounded-lg p-3 sm:p-4 w-full max-w-md sm:max-w-xl md:max-w-2xl flex items-center min-h-14 sm:min-h-16 md:min-h-18 
            ${task.Pomo_Task_Status 
              ? 'bg-gray-100 sm:bg-gray-200 opacity-75'
              : task.Pomo_TaskId === activeTaskId
                ? 'bg-green-100 sm:bg-green-200 border-green-700 border-4'
                : index === sortedTasks.filter(t => !t.Pomo_Task_Status).length - 1 
                  ? 'bg-amber-100 sm:bg-amber-200' 
                  : 'bg-blue-100 sm:bg-blue-200' 
            }
            transition-all duration-200 hover:shadow-md hover:cursor-pointer`}
            onClick={() => !task.Pomo_Task_Status && handleTaskSelect(task)}
          >
            <div className="w-full flex items-center justify-between">
              {/* Left part of task */}
              <div className="flex items-center flex-1 min-w-0">
                <Icon 
                  icon={task.Pomo_Task_Status ? check : uncheck} 
                  className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex-shrink-0 hover:cursor-pointer hover:scale-105 transition-transform' 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTaskCompletion(task.Pomo_TaskId, task.Pomo_Task_Status);
                  }} 
                />

                <h3 className={`ml-2 sm:ml-3 md:ml-4 text-sm sm:text-base font-semibold truncate 
                  ${task.Pomo_Task_Status ? 'line-through text-gray-500' : ''}`}>
                  {task.Pomo_Task_Title}
                </h3>
              </div>
              
              {/* Progress counter */}
              <div className="mr-2">{task.Pomo_Completed_Count}/{task.Pomo_Target_Count}</div>
              
              {/* Settings icon */}
              <Icon 
                icon={setting} 
                className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex-shrink-0 ml-2 hover:cursor-pointer hover:scale-105 transition-transform' 
                onClick={(e) => {
                  e.stopPropagation();
                  handleSettings(task);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Settings modal */}
      {selectedTask && (
        <PomoSetting 
          task={selectedTask}
          onClose={handleCloseSettings}
          onDelete={handleDelete}
          onUpdate={handleUpdateTask}
        />
      )}

      {/* Add task modal */}
      {isAdding && (
        <PomoAdd
          onClose={handleCloseAdd} 
          onAdd={(newTask) => setTasks(prev => [newTask, ...prev])}
        /> 
      )}
    </div>
  );
}

export default PomoTask;    
