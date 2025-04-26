import React from 'react';

import { Icon } from '@iconify/react';
import deleteIcon from '@iconify-icons/mdi/delete';
import gameIcon from '@iconify-icons/mdi/gamepad-variant';
import skullIcon from '@iconify-icons/mdi/skull-outline';
import meatIcon from '@iconify-icons/mdi/meat';

function CategoryBox() {
  const categories = [
    { icon: deleteIcon, title: 'All', tasks: 'Tasks', bg: 'bg-violet-300' },
    { icon: skullIcon, title: 'Deceased', tasks: '1 Tasks', bg: 'bg-green-300' },
    { icon: gameIcon, title: 'Gaming', tasks: '21 Tasks', bg: 'bg-blue-200' },
    { icon: meatIcon, title: 'Eat', tasks: '2 Tasks', bg: 'bg-yellow-200' },
    { icon: meatIcon, title: 'Eat part 2', tasks: '22 Tasks', bg: 'bg-yellow-200' },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-7 font-poppins">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`w-[120px] h-[140px] sm:w-[140px] sm:h-[140px] md:w-[130px] md:h-[130px] lg:w-[140px] lg:h-[140px] border-2 rounded-lg ${cat.bg} p-3 flex flex-col ${
              (index > 2 && index < 4) ? 'hidden md:flex' : index > 3 ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <Icon icon={cat.icon} className="w-7 h-7 md:w-10 md:h-10" />
            <div className="mt-4 ml-1">
              <p className="text-lg sm:text-xl">{cat.title}</p>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base">{cat.tasks}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryBox;
