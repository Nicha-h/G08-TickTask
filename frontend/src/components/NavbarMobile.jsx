import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";
import homeIcon from "@iconify-icons/lucide/home";
import timerIcon from "@iconify-icons/lucide/timer";
import plusIcon from "@iconify-icons/lucide/plus";
import calendarIcon from "@iconify-icons/lucide/calendar";
import barChartIcon from "@iconify-icons/lucide/bar-chart";

function NavbarMobile() {
  const [activeButton, setActiveButton] = useState("Home");

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="fixed bottom-0 w-full h-20 bg-primary shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] z-10 border-2">
        <div className="flex justify-around w-full items-center h-full px-2">
          {/* Home Button */}
          <NavLink
            to="/home"
            end
            onClick={() => handleClick("Home")}
            className={({ isActive }) =>
              `p-2 rounded-full ${isActive ? "bg-white" : ""}`
            }
          >
            <Icon icon={homeIcon} className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </NavLink>

          {/* Pomodoro/Timer Button */}
          <NavLink
            to="/pomodoro"
            onClick={() => handleClick("Pomodoro")}
            className={({ isActive }) =>
              `p-2 rounded-full ${isActive ? "bg-white" : ""}`
            }
          >
            <Icon icon={timerIcon} className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </NavLink>

          {/* Add/Plus Button */}
          <NavLink
            to="/add"
            onClick={() => handleClick("Add")}
            className="p-4 bg-white rounded-xl border-2 shadow-md -mt-13"
          >
            <Icon icon={plusIcon} className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </NavLink>

          {/* Calendar Button */}
          <NavLink
            to="/calendar"
            onClick={() => handleClick("Calendar")}
            className={({ isActive }) =>
              `p-2 rounded-full ${isActive ? "bg-white" : ""}`
            }
          >
            <Icon icon={calendarIcon} className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </NavLink>

          {/* Chart/Overview Button */}
          <NavLink
            to="/overview"
            onClick={() => handleClick("Overview")}
            className={({ isActive }) =>
              `p-2 rounded-full ${isActive ? "bg-white" : ""}`
            }
          >
            <Icon icon={barChartIcon} className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </NavLink>
        </div>
      </div>

      
      {/* Page Content */}
      <div className="mb-32 w-full max-w-7xl mx-auto p-4 md-5">
        <Outlet />
      </div>
    </div>
  );
}

export default NavbarMobile;