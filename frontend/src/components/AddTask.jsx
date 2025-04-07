import {React, useState} from 'react';
import { Icon } from '@iconify/react';
import addIcon from '@iconify-icons/mdi/add';
import TaskModal from './modals/AddTaskModal';

function AddTask() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSave = (task) => {

        onAddTask(task);
        setIsModalOpen(false);
    };

  return (
    <>
      <div 
        className='fixed bottom-[60px] right-[76px] w-[87px] h-[87px] rounded-full border-2 bg-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer'
        onClick={() => setIsModalOpen(true)}>
        <Icon icon={addIcon} className="w-10 h-10 text-black" />
      </div>
      
      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}

export default AddTask;