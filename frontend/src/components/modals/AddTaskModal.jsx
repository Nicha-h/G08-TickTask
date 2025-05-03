import {React, useState} from 'react';

// eslint-disable-next-line no-unused-vars
const TaskModal = ({ isOpen, onClose, onSave }) => {

    const[taskname, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [starttime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="flex flex-col justify-center items-center bg-white p-2 rounded-lg w-[700px] h-[691px] font-poppins">
      <div className='flex justify-center items-center h-[118px] w-[118px] bg-[#D3D3D3] rounded-full' > :D
      </div>
        {/*Input boxes */}
        <div className="mb-4">
          <label className="block text-base font-black mb-1">Title</label>
          <input
            type="text"
            value={taskname}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-[622px] h-[40px] p-2 border-2 rounded-lg"
            placeholder="Enter your task title"
          />
        </div>

        <div className="flex flex-row gap-4 mb-4">
            <div className="flex flex-col ml-3">
                <label className="block text-base font-black mb-1">START DATE </label>
                <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-[293px] h-[40px] p-2 border-2 rounded-lg"
                    placeholder="DD/MM/YYYY"
                />
          
            </div>
          

            <div className="flex flex-col ml-8">
                <label className="block text-base font-black mb-1">START TIME </label>
                <input
                    type="text"
                    value={starttime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-[293px] h-[40px] p-2 border-2 rounded-lg"
                    placeholder="HH:MM"
                />
          
            </div>

        </div>

        <div className="flex flex-row gap-4 mb-4">
            <div className="flex flex-col ml-3">
                <label className="block text-base font-black mb-1">END DATE </label>
                <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-[293px] h-[40px] p-2 border-2 rounded-lg"
                    placeholder="DD/MM/YYYY"
                />
          
            </div>
          

            <div className="flex flex-col ml-8">
                <label className="block text-base font-black mb-1">END TIME </label>
                <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-[293px] h-[40px] p-2 border-2 rounded-lg"
                    placeholder="HH:MM"
                />
          
            </div>

        </div>
        <div className= 'flex flex-row justify-start items-start font-black'>
            <p>COLOR</p>

        </div>
        
        <div className="mb-4">
          <label className="block text-base font-black mb-1">DESCRIPTION</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-[622px] h-[120px] p-2 border-2 rounded-lg"
            placeholder="Enter task description"
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
                
            //   onSave({ description, time });
            //   setDescription('');
            //   setTime('');
            }}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;