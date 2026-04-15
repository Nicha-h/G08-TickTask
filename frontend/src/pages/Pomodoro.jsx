/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PomoTask from '../components/PomoTask';
import { apiClient } from '../util/apiClient';
import ErrorBox from '../components/ErrorBox';
function Pomodoro() {
  const [activeMode, setActiveMode] = useState('Pomodoro');
  const [timer, setTimer] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showNoTaskPrompt, setShowNoTaskPrompt] = useState(false);
  const [error, setError] = useState('');
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const API_URL = `${apiClient.defaults.baseURL}/api/pomodoroSession`;
  const TASK_API_URL = `${apiClient.defaults.baseURL}/api/pomodoroTask`;

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
    setCurrentSessionId(null);
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
        // The active-session endpoint expects a userId path parameter.
        const userId = localStorage.getItem('userId');
        if (!userId) {
          return;
        }

        const res = await apiClient.get(`${API_URL}/active/${userId}`, getAuthHeader());
        if (res.data && res.data.SessionId) {
          // Need to map based on backend response which provides timer_type
          // and duration_seconds etc. For now we will rely entirely on local state.
        }
      } catch (err) {
        console.error('Error fetching current session:', err);
        setError('Failed to fetch current session.');
      }
    };
    fetchCurrentSession();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await apiClient.get(TASK_API_URL, getAuthHeader());
      if (response.data && Array.isArray(response.data.data)) {
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
        if (currentSessionId) {
          await apiClient.put(`${API_URL}/${currentSessionId}/pause`, {}, getAuthHeader());
        }
      } catch (err) {
        console.error('Pause error:', err);
      }
    } else {
      if (!activeTask) {
        setShowNoTaskPrompt(true);
        return;
      }
      startTimerExecution();
    }
  };

  const startTimerExecution = async () => {
    // Start/resume the timer
    let finalSessionId = currentSessionId;
    try {
      if (currentSessionId) {
        // Resume the existing paused session
        await apiClient.put(`${API_URL}/${currentSessionId}/resume`, {}, getAuthHeader());
      } else {
        // Create/start a new session
        const timerTypeValue = activeMode === 'Pomodoro' 
          ? 'work' 
          : (activeMode === 'Long - Break' ? 'long' : 'short');

        const res = await apiClient.post(`${API_URL}/start`, {
            duration_seconds: modes[activeMode],
            timer_type: timerTypeValue
        }, getAuthHeader());
        finalSessionId = res.data?.data?.SessionId || res.data?.SessionId;
        setCurrentSessionId(finalSessionId);

        if (activeTask && finalSessionId && activeMode === 'Pomodoro') {
            await apiClient.put(`${TASK_API_URL}/${activeTask.Pomo_TaskId}/assign`, {
                sessionId: finalSessionId
            }, getAuthHeader());
            
            setActiveTask(prev => prev ? { ...prev, SessionId: finalSessionId } : null);
            
            setTasks(prevTasks => prevTasks.map(t => 
                t.Pomo_TaskId === activeTask?.Pomo_TaskId 
                ? { ...t, SessionId: finalSessionId } 
                : t
            ));
        }
      }
    } catch (err) {
      console.error('Start error:', err);
      setError('Failed to start or resume the timer. Please try again.');
      return; // Abort starting the local timer
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
  };

  const completeSession = async () => {
    try {
      if (currentSessionId) {
        await apiClient.put(`${API_URL}/${currentSessionId}/complete`, {}, getAuthHeader());
        setCurrentSessionId(null);
      }
      
      let isLongBreak = false;

      if (activeMode === 'Pomodoro' && activeTask) {
        const updatedCompletedCount = activeTask.Pomo_Completed_Count + 1;
        const shouldMarkCompleted = updatedCompletedCount >= activeTask.Pomo_Target_Count;
        
        if (updatedCompletedCount > 0 && updatedCompletedCount % 4 === 0) {
          isLongBreak = true;
        }

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

      if (activeMode === 'Pomodoro') {
        setActiveMode(isLongBreak ? 'Long - Break' : 'Short - Break');
      } else {
        setActiveMode('Pomodoro');
      }
      
      fetchTasks();
    } catch (err) {
      console.error('Complete error:', err);
      setError('Failed to complete the session. Please try again.');
    }
  };
  
  const updateTaskProgress = async (taskId, completedCount, markCompleted) => {
    try {
      const response = await apiClient.put(
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
    setCurrentSessionId(null);
  };
  
  const skipTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIsRunning(false);
    setIntervalId(null);
    setTimer(0);
    completeSession();
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
    <div className='-mt-32 flex flex-col justify-center items-center w-full min-h-screen px-4'>
      {error && <ErrorBox errorMessage={error} onClose={() => setError('')} />}
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
          <div className="border rounded-md mt-6 px-10 py-5 md:px-12 md:py-8 lg:px-16 lg:py-10">
            <p className="text-6xl md:text-6xl lg:text-8xl font-bold">{formatTime(timer)}</p>
          </div>

          {/* Active Task Info */}
          {activeTask ? (
            <div className="mt-4 text-center">
              <p className="text-xl font-fredoka">{activeTask.Pomo_Task_Title}</p>
              <p className="text-lg">Progress: {activeTask.Pomo_Completed_Count}/{activeTask.Pomo_Target_Count}</p>
            </div>
          ) : (
            <div className="mt-4 text-center">
              <p className="text-xl font-fredoka text-gray-500"></p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 mb-6">
            <button 
              onClick={startTimer}
              className={`text-sm md:text-base px-4 md:px-8 py-2 rounded border-2 transition-all ${
                isRunning 
                  ? 'bg-red-500 hover:bg-red-400 text-black border-2 hover:scale-105 hover:cursor-pointer' 
                  : 'bg-greensubmit hover:bg-green-400 text-black hover:cursor-pointer hover:scale-105'
              }`}
            >
              {isRunning ? 'STOP !' : 'START !'}
            </button>
            
            <button 
              onClick={resetTimer}
              disabled={isRunning}
              className={`text-sm md:text-base px-4 md:px-8 py-2 rounded border-2 transition-all
                bg-gray-200 hover:bg-gray-300 hover:cursor-pointer ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              RESET
            </button>

            <button 
              onClick={skipTimer}
              className={`text-sm md:text-base px-4 md:px-8 py-2 rounded border-2 transition-all bg-yellow-200 hover:bg-yellow-300 hover:cursor-pointer text-black hover:scale-105`}
            >
              SKIP
            </button>
          </div>
        </div>
      </div>

      {/* Task Component */}
      <div className="flex flex-col justify-center items-center w-full max-w-2xl font-poppins font-black text-base md:text-lg mt-4 h-auto">
        <div className="w-full">
          <PomoTask 
            onTaskSelect={handleTaskChange} 
            activeTaskId={activeTask?.Pomo_TaskId} 
            tasks={tasks}
            setTasks={setTasks}
            fetchTasks={fetchTasks}
          />
        </div>
      </div>

      {/* No Task Prompt Modal */}
      {showNoTaskPrompt && (
        <div className="fixed inset-0 bg-gray-400/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full m-4 font-poppins text-center">
            <h2 className="text-xl font-bold mb-4 font-poppins">No Task Selected</h2>
            <p className="mb-6 text-gray-600">
              {tasks.length > 0 
                ? "You haven't selected a task. Would you like to choose one, add a new one, or skip and run the timer anyway?"
                : "You don't have any tasks. Would you like to add one or skip and run the timer anyway?"}
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setShowNoTaskPrompt(false);
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }}
                className="bg-green hover:bg-[#c5cf80] text-black py-2 px-4 rounded border-2 transition-transform hover:scale-105 hover:cursor-pointer font-bold"
              >
                {tasks.length > 0 ? "Choose / Add Task" : "Add Task Below"}
              </button>
              <button 
                onClick={() => {
                  setShowNoTaskPrompt(false);
                  startTimerExecution();
                }}
                className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded border-2 transition-transform hover:scale-105 hover:cursor-pointer font-bold"
              >
                Run timer without task
              </button>
              <button 
                onClick={() => setShowNoTaskPrompt(false)}
                className="text-gray-500 hover:text-gray-700 hover:cursor-pointer py-2 mt-2 underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pomodoro;
