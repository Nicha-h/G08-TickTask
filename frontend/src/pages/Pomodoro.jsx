import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PomoTask from '../components/PomoTask';

function Pomodoro() {
  return (
    <div className='flex flex-col justify-center items-center max-w-screen max-h-screen'>
      <div className="w-[746px] h-[500px] border-2 flex flex-col items-center font-fredoka">
        {/* Header */}
        <div className="w-full h-[86px] flex justify-center items-center border-b-2">
          <h1 className="text-3xl font-bold">Pomodoro!</h1>
        </div>

        {/* Body */}
        <div className="w-full h-[381px] flex flex-col items-center justify-around">
          {/* Mode buttons */}
          <div className="flex space-x-4 mt-4">
            <button className="px-4 py-2 bg-[#EEF1C9] border rounded-lg">Pomodoro</button>
            <button className="px-4 py-2 bg-white border rounded-lg">Short - Break</button>
            <button className="px-4 py-2 bg-white border rounded-lg">Long - Break</button>
          </div>

          {/* Timer */}
          <div className="border rounded-md mt-8 px-16 py-10">
            <p className="text-[90px] font-bold">25:00</p>
          </div>

          {/* Start Button */}
          <button className="text-normal mt-7 px-9 py-2 mb-10 bg-greensubmit hover:bg-[#6ed864] rounded border-2 ">
            START !
          </button>
        </div>
      </div>
      {/*Task Name */}
      <div className="flex flex-col *:justify-center items-center w-[746px] font-poppins font-black text-[18px] mt-3.5 h-auto">
        <div>#1</div>
        <div>Task</div>
        <PomoTask/>
      </div>
    </div>
  )
}

export default Pomodoro
