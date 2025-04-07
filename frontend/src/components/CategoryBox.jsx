import React from 'react';

import { Icon } from '@iconify/react';
import deleteIcon from '@iconify-icons/mdi/delete';
import gameIcon from '@iconify-icons/mdi/gamepad-variant';
import skullIcon from '@iconify-icons/mdi/skull-outline';
import meatIcon from '@iconify-icons/mdi/meat';

function CategoryBox() {

  return (
    <>
    <div className='ml-10 mt-7 flex flex-row justify-center items-center font-poppins'>
      <div className='flex flex-row gap-6'>
        <div className='w-[140px] h-[140px] border-2 rounded-lg bg-violet-300 p-3'>
          <div className=''>
            <Icon icon={deleteIcon} className='w-10 h-10'/>
          </div>
          <div className='mt-4 ml-3'>
            <p className='text-xl'>All</p>
            <p className='mt-2 text-base'>Tasks</p>
          </div>
          
        </div>
        <div className='w-[140px] h-[140px] border-2 rounded-lg bg-green p-3'>
          <div className=''>
            <Icon icon={skullIcon} className='w-10 h-10'/>
          </div>
          <div className='mt-4 ml-3'>
            <p className='text-xl'>Deceased</p>
            <p className='mt-2 text-base'>1 Tasks</p>
          </div>
          
        </div>
        <div className='w-[140px] h-[140px] border-2 rounded-lg bg-blue-200 p-3'>
          <div className=''>
            <Icon icon={gameIcon} className='w-10 h-10'/>
          </div>
          <div className='mt-4 ml-3'>
            <p className='text-xl font-black'>Gaming</p>
            <p className='mt-2 text-base'>21 Tasks</p>
          </div>
          
        </div>
        <div className='w-[140px] h-[140px] border-2 rounded-lg bg-yellow-200 p-3'>
          <div className=''>
            <Icon icon={meatIcon} className='w-10 h-10'/>
          </div>
          <div className='mt-4 ml-3'>
            <p className='text-xl'>Eat</p>
            <p className='mt-2 text-base'>2 Tasks</p>
          </div>
          
        </div>

        <div className='w-[140px] h-[140px] border-2 rounded-lg bg-yellow-200 p-3'>
          <div className=''>
            <Icon icon={meatIcon} className='w-10 h-10'/>
          </div>
          <div className='mt-4 ml-3'>
            <p className='text-xl'>Eat part 2</p>
            <p className='mt-2 text-base'>22 Tasks</p>
          </div>
          
        </div>

      </div>
    </div>
    </>
  )
}

export default CategoryBox
