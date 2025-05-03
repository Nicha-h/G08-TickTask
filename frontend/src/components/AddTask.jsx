import {React} from 'react';
import { Icon } from '@iconify/react';
import addIcon from '@iconify-icons/mdi/add';
import TaskModal from './modals/AddTaskModal';
import { useNavigate } from 'react-router-dom';

function AddTask() {
  const navigate = useNavigate();
  return (
    <>
      <div 
        className='fixed bottom-[60px] right-[76px] w-[87px] h-[87px] rounded-full border-2 bg-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer'
        onClick={() => navigate('/add')}>
        <Icon icon={addIcon} className="w-10 h-10 text-black" />
      </div>
      
    </>
  );
}

export default AddTask;