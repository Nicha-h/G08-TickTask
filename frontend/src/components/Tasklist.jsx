import React, { useState } from 'react';
import { Icon } from '@iconify/react';
//import editIcon from '@iconify-icons/mdi/pencil';
import deleteIcon from '@iconify-icons/mdi/delete';
import { useLocation, NavLink } from 'react-router-dom';

const TaskList = ({ tasks, onTaskUpdate }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedTime, setEditedTime] = useState('');
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const isTaskListPage = location.pathname === '/taskList';
  const simplyfiedTask = isTaskListPage ? tasks : tasks.slice(0, 4);

  // const handleEdit = (task) => {
  //   setEditingTask(task.id);
  //   setEditedDescription(task.description);
  //   setEditedTime(task.time || '');
  // };
  
  const handleSave = (taskId) => {
    onTaskUpdate(taskId, {
      description: editedDescription,
      time: editedTime || null
    });
    setEditingTask(null);
  };

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
      
      {simplyfiedTask.map((task) => (
        <div key={task.id} className="border-2 rounded-[10px] p-4 w-[708px] h-[70px] flex items-center bg-blue-200 last:bg-amber-200">
          {/* */}
          {editingTask === task.id ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Task description"
              />
              <input
                type="text"
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="00:00 - 00:00 (optional)"
              />
              <button
                onClick={() => handleSave(task.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="w-full flex items-center justify-between">
              <div className="flex justify-center items-center ">
                <div>
                  <Icon icon ={deleteIcon} className='flex justify-center items-center w-[43px] h-[43px]'/>
                </div>
                
                <div className="ml-4 flex flex-col justify-start  items-start w-[600px] h-auto">
                  <h3 className='text-base font-bold'>{task.taskname}</h3>
                  <p className='text-xs text-gray-700'>{task.description}</p>
                  
                  </div>
                  {task.time && (
                  <p className="flex justify-end items-end text-xs font-bold">{task.time}</p>
                  )}
              </div>
              
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;