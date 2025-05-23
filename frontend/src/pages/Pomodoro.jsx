/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PomoTask from '../components/PomoTask';
import axios from 'axios';

function Pomodoro() {
  const [activeMode, setActiveMode] = useState('Pomodoro');
  const [timer, setTimer] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  
  const API_URL = 'http://localhost:3000/api/pomodoro';
  const TASK_API_URL = 'http://localhost:3000/api/pomodoroTask';

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const modes = {
  'Pomodoro': 25 * 60,
  'Short - Break': activeTask?.Pomo_Task_Short ? activeTask.Pomo_Task_Short * 60 : 5 * 60,
  'Long - Break': activeTask?.Pomo_Task_Long ? activeTask.Pomo_Task_Long * 60 : 15 * 60,
};


  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIsRunning(false);
      setIntervalId(null);
    }
    setTimer(modes[activeMode]);
  }, [activeMode]);
  
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  useEffect(() => {
    const fetchCurrentSession = async () => {
      try {
        const res = await axios.get(`${API_URL}/current`, getAuthHeader());
        if (res.data) {
          const { mode, remaining, running } = res.data;
          setActiveMode(mode);
          setTimer(remaining);
          setIsRunning(running);
        }
      } catch (err) {
        console.error('Error fetching current session:', err);
      }
    };
    fetchCurrentSession();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(TASK_API_URL, getAuthHeader());
      if (response.data && response.data.data) {
        const fetchedTasks = response.data.data;
        setTasks(fetchedTasks);
        
        // Set the first incomplete task as active
        const firstIncompleteTask = fetchedTasks.find(task => !task.Pomo_Task_Status);
        if (firstIncompleteTask && !activeTask) {
          setActiveTask(firstIncompleteTask);
        }
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const startTimer = async () => {
    if (isRunning) {
      // Pause the timer
      clearInterval(intervalId);
      setIsRunning(false);
      setIntervalId(null);
      try {
        await axios.post(`${API_URL}/pause`, {}, getAuthHeader());
      } catch (err) {
        console.error('Pause error:', err);
      }
    } else {
      // Start/resume the timer
      try {
        await axios.post(`${API_URL}/start`, {
          mode: activeMode,
          duration: modes[activeMode],
          taskId: activeTask?.Pomo_TaskId
        }, getAuthHeader());
      } catch (err) {
        console.error('Start error:', err);
      }
  
      const id = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(id);
            setIsRunning(false);
            completeSession(); // Auto complete session
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
  
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  const completeSession = async () => {
    try {
      await axios.post(`${API_URL}/complete`, {}, getAuthHeader());
      
      if (activeMode === 'Pomodoro' && activeTask) {
        const updatedCompletedCount = activeTask.Pomo_Completed_Count + 1;
        const shouldMarkCompleted = updatedCompletedCount >= activeTask.Pomo_Target_Count;
        
        await updateTaskProgress(
          activeTask.Pomo_TaskId, 
          updatedCompletedCount, 
          shouldMarkCompleted
        );
        
        if (shouldMarkCompleted) {
          const nextTask = tasks.find(task => 
            !task.Pomo_Task_Status && task.Pomo_TaskId !== activeTask.Pomo_TaskId
          );
          setActiveTask(nextTask || null);
        }
      }
      
      // After completing a Pomodoro, switch to break mode
      if (activeMode === 'Pomodoro') {
        setActiveMode('Short - Break');
      } else {
        // After break, go back to Pomodoro mode
        setActiveMode('Pomodoro');
      }
      
      // Refresh tasks to get updated data
      fetchTasks();
    } catch (err) {
      console.error('Complete error:', err);
    }
  };
  
  const updateTaskProgress = async (taskId, completedCount, markCompleted) => {
    try {
      const response = await axios.put(
        `${TASK_API_URL}/${taskId}/complete`, 
        {
          Pomo_Task_Status: markCompleted,
          Pomo_Completed_Count: completedCount,
        },
        getAuthHeader()
      );
      
      if (response.data) {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.Pomo_TaskId === taskId 
              ? { 
                  ...task, 
                  Pomo_Completed_Count: completedCount,
                  Pomo_Task_Status: markCompleted
                }
              : task
          )
        );
        
        if (activeTask && activeTask.Pomo_TaskId === taskId) {
          setActiveTask(prev => ({ 
            ...prev, 
            Pomo_Completed_Count: completedCount,
            Pomo_Task_Status: markCompleted
          }));
        }
      }
    } catch (err) {
      console.error('Error updating task progress:', err);
    }
  };
  
  const resetTimer = () => {
    if (intervalId) clearInterval(intervalId);
    setIsRunning(false);
    setIntervalId(null);
    setTimer(modes[activeMode]);
  };
  
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleTaskChange = (task) => {
    if (!isRunning) {
      setActiveTask(task);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full min-h-screen px-4'>
      <div className="w-full max-w-2xl border-2 flex flex-col items-center font-fredoka rounded-lg shadow-md">
        {/* Header */}
        <div className="w-full py-4 flex justify-center items-center border-b-2">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Pomodoro!</h1>
        </div>

        {/* Body */}
        <div className="w-full flex flex-col items-center justify-between p-4 md:p-6">
          {/* Mode buttons */}
          <div className="flex flex-wrap justify-center gap-2 w-full">
            {Object.keys(modes).map((mode) => (
              <button
                key={mode}
                onClick={() => !isRunning && setActiveMode(mode)}
                disabled={isRunning}
                className={`px-2 py-1 md:px-4 md:py-2 border rounded-lg text-sm md:text-base transition-transform ${
                  activeMode === mode
                    ? 'bg-green text-black border-2'
                    : 'bg-white'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}>
                {mode}
              </button>
            ))}
          </div>

          {/* Timer */}
          <div className="border rounded-md mt-6 px-6 py-4 md:px-12 md:py-8 lg:px-16 lg:py-10">
            <p className="text-4xl md:text-6xl lg:text-8xl font-bold">{formatTime(timer)}</p>
          </div>

          {/* Active Task Info */}
          {activeTask && (
            <div className="mt-4 text-center">
              <p className="text-xl font-fredoka">{activeTask.Pomo_Task_Title}</p>
              <p className="text-lg">Progress: {activeTask.Pomo_Completed_Count}/{activeTask.Pomo_Target_Count}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 mb-6">
            <button 
              onClick={startTimer}
              disabled={!activeTask && activeMode === 'Pomodoro'}
              className={`text-sm md:text-base px-4 md:px-8 py-2 rounded border-2 transition-all ${
                isRunning 
                  ? 'bg-red-500 hover:bg-red-400 text-black border-2 hover:scale-105 hover:cursor-pointer' 
                  : 'bg-greensubmit hover:bg-green-400 text-black hover:cursor-pointer hover:scale-105' +
                    (!activeTask && activeMode === 'Pomodoro' ? ' opacity-50 cursor-not-allowed' : '')
              }`}
            >
              {isRunning ? 'STOP !' : 'START !'}
            </button>
            
            <button 
              onClick={resetTimer}
              disabled={isRunning}
              className={`text-sm md:text-base px-4 md:px-8 py-2 rounded border-2 transition-all
                bg-gray-200 hover:bg-gray-300 ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              RESET
            </button>
          </div>
        </div>
      </div>

      {/* Task Component */}
      <div className="flex flex-col justify-center items-center w-full max-w-2xl font-poppins font-black text-base md:text-lg mt-4 h-auto">
        <div className="w-full">
          <PomoTask onTaskSelect={handleTaskChange} activeTaskId={activeTask?.Pomo_TaskId} />
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
