import React, { useState, useEffect } from 'react';
import Close from '../../assets/close.svg';
import DeletePomo from './DeletePomo';

function PomoSetting({ task, onClose, onDelete, onUpdate }) {

  const [title, setTitle] = useState(task.Pomo_Task_Title || '');
  const [pomodoro, setPomodoro] = useState(task.Pomo_Target_Count || '');
  const [shortBreak, setShortBreak] = useState(task.Pomo_Task_Short || '');
  const [longBreak, setLongBreak] = useState(task.Pomo_Task_Long || '');

  const [isClosing, setIsClosing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (task) {
      setTitle(task.Pomo_Task_Title || '');
      setPomodoro(task.Pomo_Target_Count !== undefined ? String(task.Pomo_Target_Count) : '');
      setShortBreak(task.Pomo_Task_Short !== undefined ? String(task.Pomo_Task_Short) : '');
      setLongBreak(task.Pomo_Task_Long !== undefined ? String(task.Pomo_Task_Long) : '');
    }
  }, [task]);

  
  const handleSave = async () => {
    const updatedData = {
      title,
      shortBreak: Number(shortBreak),
      longBreak: Number(longBreak),
      targetCount: Number(pomodoro),
      status: task.Pomo_Task_Status,            
      completedCount: task.Pomo_Completed_Count, 
      sessionId: task.SessionId || null,
    };
  
    try {
      const response = await fetch(`http://localhost:3000/api/pomodoroTask/${task.Pomo_TaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save settings');
      }
      
      const result = await response.json();
      console.log('Saved changes:', result);
      onUpdate(result.data)
      onClose();
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save changes.');
    }
  };
  
  

  const handleDeleteClick = () => {
    setShowDeleteModal(true); 
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(false); 
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className={`bg-white p-6 w-[350px] sm:w-[450px] md:w-[480px] lg:w-[500px] max-h-[90vh] overflow-y-auto rounded-lg shadow-lg relative ${
        isClosing ? 'animate-scale-out' : 'animate-scale-in'
      }`}
      >
        <div className="absolute top-4 right-4 cursor-pointer hover:scale-105" onClick={closeModal}>
            <img src={Close} alt="Close" className="h-6 w-6" />
        </div>

        {/* Title */}
        <h2 className=" text-xl sm:text-xl md:text-2xl lg:text-2xl font-fredoka font-light mb-2 sm:mb-2 lg:mb-4 text-center">Setting</h2>

        {/* Divider */}
        <div className="border-t border-gray-300 mb-4"></div>

        {/* Inputs */}
        <div className="flex flex-col justify-center items-center gap-6">
          {/* Pomodoro Inputs */}
          <div className="flex gap-2 sm:gap-4">
            <div className="flex flex-col">
              <label className="block font-fredoka font-light text-sm sm:text-sm md:text-base lg:text-base mb-1">Pomodoro</label>
              <input
                type="number"
                value={pomodoro}
                onChange={(e) => setPomodoro(e.target.value)}
                className="bg-gray-200 w-[85px] sm:w-[120px] h-[40px] p-2 border-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="block font-fredoka font-light text-sm sm:text-sm md:text-base lg:text-base mb-1">Short Break</label>
              <input
                type="number"
                value={shortBreak}
                onChange={(e) => setShortBreak(e.target.value)}
                className="bg-gray-200 w-[85px] sm:w-[120px] h-[40px] p-2 border-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="block font-fredoka font-light text-sm sm:text-sm md:text-base lg:text-base mb-1">Long Break</label>
              <input
                type="number"
                value={longBreak}
                onChange={(e) => setLongBreak(e.target.value)}
                className="bg-gray-200 w-[85px] sm:w-[120px] h-[40px] p-2 border-2 rounded-lg"
              />
            </div>
          </div>

          {/* Title Input */}
          <div className="w-[270px] sm:w-[390px] md:w-[390px] lg:w-[400px] -mt-3">
            <label className="block font-fredoka font-light text-sm sm:text-sm md:text-base lg:text-base mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What would you like to do"
              className="sm:text-sm md:text-base lg:text-base w-full h-[40px] sm:h-[40px] lg:h-[50px] p-2 border-2 rounded-lg"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center w-full -mt-2 gap-4">
            {/* Delete button */}
                <button 
                onClick={handleDeleteClick}
                className="text-sm px-2 py-1 sm:px-4 sm:py-1 md:px-4 md:py-1 lg:px-4 lg:py-2 bg-red-400 text-black border-2 rounded-lg hover:bg-red-600 hover:scale-105 transition"
                >
                Delete
                </button>

                {/* Cancel and Save */}
                <div className="flex gap-3">
                <button 
                    onClick={closeModal} 
                    className="text-sm px-2 py-1 sm:px-4 sm:py-1 md:px-4 md:py-1 lg:px-4 lg:py-2 bg-gray-300 border-2 text-gray-600 rounded-lg hover:bg-gray-400 hover:scale-105 transition"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleSave} 
                    className="text-sm font-poppins px-2 py-1 sm:px-4 sm:py-1 md:px-4 md:py-1 lg:px-4 lg:py-2 bg-greensubmit text-black rounded-lg border-2 border-black hover:bg-green-400 hover:scale-105 transition"
                >
                    Save
                </button>
                </div>

          </div>

        </div>
      </div>
      {showDeleteModal && (
          <DeletePomo
            task={task}
            onClose={handleDeleteClose}
            onDelete={() => {
              onDelete(task.Pomo_TaskId);
            }}
          />
      )}

    </div>
  );
}

export default PomoSetting;
