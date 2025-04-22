import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import overviewTotaltask from '../assets/overviewTotaltask.svg';
import overviewCompleted from '../assets/overviewCompleted.svg';
import overviewInprogress from '../assets/overviewInprogress.svg';
import overviewNotstarted from '../assets/overviewNotstarted.svg';

const Overview = () => {
  const [activeTab, setActiveTab] = useState(0); // 0: Today, 1: Month, 2: Year
  const [data, setData] = useState({
    today: { total: 125, completed: 75, inProgress: 15, notStarted: 10 },
    month: { total: 842, completed: 68, inProgress: 22, notStarted: 10 },
    year: { total: 10250, completed: 72, inProgress: 18, notStarted: 10 }
  });
 
  
  // Refs for animation cleanup
  const animationRefs = useRef({
    total: null,
    completed: null,
    inProgress: null,
    notStarted: null
  });

  // Clean up animations on unmount
  useEffect(() => {
    return () => {
      Object.values(animationRefs.current).forEach(ref => {
        if (ref) clearInterval(ref);
      });
    };
  }, []);

  // Animate number transition
  const animateValue = (element, start, end, duration = 800) => {
    const startTime = performance.now();
    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value;
      if (progress < 1) {
        animationRefs.current[element.id] = requestAnimationFrame(step);
      }
    };
    animationRefs.current[element.id] = requestAnimationFrame(step);
  };

  // Animate percentage transition
  const animatePercentage = (element, start, end, duration = 800) => {
    const startTime = performance.now();
    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = `${value}%`;
      if (progress < 1) {
        animationRefs.current[element.id] = requestAnimationFrame(step);
      }
    };
    animationRefs.current[element.id] = requestAnimationFrame(step);
  };

  // Trigger animations when tab changes
  useEffect(() => {
    const currentData = activeTab === 0 ? data.today : activeTab === 1 ? data.month : data.year;
    
    // Animate total tasks
    const totalElement = document.getElementById('total-tasks');
    if (totalElement) {
      animateValue(totalElement, parseInt(totalElement.textContent) || 0, currentData.total);
    }
    
    // Animate percentages
    const completedElement = document.getElementById('completed-percent');
    if (completedElement) {
      animatePercentage(completedElement, parseInt(completedElement.textContent) || 0, currentData.completed);
    }
    
    const inProgressElement = document.getElementById('inprogress-percent');
    if (inProgressElement) {
      animatePercentage(inProgressElement, parseInt(inProgressElement.textContent) || 0, currentData.inProgress);
    }
    
    const notStartedElement = document.getElementById('notstarted-percent');
    if (notStartedElement) {
      animatePercentage(notStartedElement, parseInt(notStartedElement.textContent) || 0, currentData.notStarted);
    }
    
    // Animate summary boxes
    const summaryValues = {
      total: document.getElementById('summary-total'),
      completed: document.getElementById('summary-completed'),
      inProgress: document.getElementById('summary-inprogress'),
      notStarted: document.getElementById('summary-notstarted')
    };
    
    if (summaryValues.total) {
      animateValue(summaryValues.total, parseInt(summaryValues.total.textContent) || 0, currentData.total);
    }
    if (summaryValues.completed) {
      animateValue(summaryValues.completed, parseInt(summaryValues.completed.textContent) || 0, 
        Math.floor(currentData.total * currentData.completed / 100));
    }
    if (summaryValues.inProgress) {
      animateValue(summaryValues.inProgress, parseInt(summaryValues.inProgress.textContent) || 0, 
        Math.floor(currentData.total * currentData.inProgress / 100));
    }
    if (summaryValues.notStarted) {
      animateValue(summaryValues.notStarted, parseInt(summaryValues.notStarted.textContent) || 0, 
        Math.floor(currentData.total * currentData.notStarted / 100));
    }
    
    // Update donut chart
    updateDonutChart(currentData);
  }, [activeTab, data]);

  // Update donut chart colors based on percentages
  const updateDonutChart = (currentData) => {
    const donut = document.querySelector('.donut-chart');
    if (donut) {
      donut.style.background = `conic-gradient(
        #E7F1A8 0% ${currentData.completed}%,
        #95B1EE ${currentData.completed}% ${currentData.completed + currentData.inProgress}%,
        #FFFDF5 ${currentData.completed + currentData.inProgress}% 100%
      )`;
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveTab((prev) => (prev + 1) % 3),
    onSwipedRight: () => setActiveTab((prev) => (prev - 1 + 3) % 3),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const OverviewCard = ({ type }) => {
    const titles = ['Today', 'This Month', 'This Year'];
    const title = titles[type];
    const currentData = type === 0 ? data.today : type === 1 ? data.month : data.year;

    // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Determine font size based on number length
  const getFontSize = (num) => {
    const length = num.toString().length;
    if (length <= 3) return "text-[40px] sm:text-[50px]";
    if (length <= 5) return "text-[32px] sm:text-[40px]";
    if (length <= 7) return "text-[24px] sm:text-[32px]";
    return "text-[20px] sm:text-[24px]";
  };
    
  return (
    <div className="bg-white bg-clip-border inset-shadow-sm shadow-md rounded-4xl w-full max-w-md mx-auto p-6 pb-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {/* Donut Chart */}
        <div className="flex-shrink-0">
          <h2 className="font-poppins text-[22px] font-bold text-center mb-4">{title}</h2>
          <div className="relative w-[200px] h-[200px] sm:w-[225px] sm:h-[225px]">             
            <div className="w-full h-full rounded-full border-1 donut-chart"
                  style={{ background: `conic-gradient(
                    #E7F1A8 0% ${currentData.completed}%,
                    #95B1EE ${currentData.completed}% ${currentData.completed + currentData.inProgress}%,
                    #FFFDF5 ${currentData.completed + currentData.inProgress}% 100%
                  )`}}></div>
            {/* inside */}
            <div className="absolute border-1 top-1/2 left-1/2 w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] 
            bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center overflow-hidden px-1"
            >
              <div className="w-full">
                <p 
                  id="total-tasks" 
                  className={`font-fredoka font-reg leading-none p-1 ${getFontSize(currentData.total)}`}
                  style={{ wordBreak: "break-word" }}
                >
                  {formatNumber(currentData.total)}
                </p>
                <p className="font-poppins text-[13px] sm:text-[15px] font-bold leading-none p-1">Total task</p>
              </div>
            </div>
          </div>
        </div>

          {/* Status Text */}
          <div className="flex flex-col justify-center p-2 gap-3 sm:gap-5 mt-1 sm:mt-8 ml-0 sm:ml-3">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 sm:w-5 sm:h-5 mr-3 rounded-full bg-[#E7F1A8] border-1"></span>
              <div>
                <p id="completed-percent" className="font-fredoka text-[24px] font-reg">00%</p>
                <p className="font-poppins text-[14px] font-bold">Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 sm:w-5 sm:h-5 mr-3 rounded-full bg-[#95B1EE] border-1"></span>
              <div>
                <p id="inprogress-percent" className="font-fredoka text-[24px] font-reg">00%</p>
                <p className="font-poppins text-[14px] font-bold">In progress</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 sm:w-5 sm:h-5 mr-3 rounded-full bg-[#FFFDF5] border-1"></span>
              <div>
                <p id="notstarted-percent" className="font-fredoka text-[24px] font-reg">00%</p>
                <p className="font-poppins text-[14px] font-bold">Not started</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Indicator Dots */}
        <div className="flex justify-center mt-4">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`w-2 h-2 mx-1 rounded-full transition-colors ${i === activeTab ? 'bg-black' : 'bg-[#A7A7A7]'}`}
              aria-label={`Show ${['Today', 'Month', 'Year'][i]} view`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 min-h-screen overflow-x-hidden">
      {/* Header */}
      <div className="mb-4">
        <h1 className="flex text-[24px] font-poppins font-bold">Overview</h1>
      </div>

      {/* Main Dashboard */}
      <div className="space-y-6 sm:space-y-8">
        {/* Swipeable Area */}
        <div {...handlers} className="relative overflow-visible">
          {/* Overview Cards */}
          <div className="transition-opacity duration-300">
            {activeTab === 0 && <OverviewCard type={0} />}
            {activeTab === 1 && <OverviewCard type={1} />}
            {activeTab === 2 && <OverviewCard type={2} />}
          </div>     
        </div>

        {/* Summary Boxes */}
        <div className="grid grid-cols-1 font-poppins gap-3 max-w-md mx-auto">
          <div className="flex items-center bg-white rounded-lg inset-shadow-sm shadow-md p-3 sm:p-4">
            <img className="w-8 h-8 sm:w-10 sm:h-10 object-contain mr-3 sm:mr-5" src={overviewTotaltask} alt="overviewTotaltask"/>
              <div className="flex items-center justify-between w-full">
                <p className="text-[14px] sm:text-[16px] font-bold">Total task</p>
                <p id="summary-total" className="text-[18px] sm:text-[20px] text-[#A7A7A7] font-reg">00</p>
              </div>
          </div>
          <div className="flex items-center bg-white rounded-lg inset-shadow-sm shadow-md p-3 sm:p-4">
            <img className="w-8 h-8 sm:w-10 sm:h-10 object-contain mr-3 sm:mr-5" src={overviewCompleted} alt="overviewCompleted"/>
              <div className="flex items-center justify-between w-full">
                <p className="text-[14px] sm:text-[16px] font-bold">Completed</p>
                <p id="summary-completed" className="text-[18px] sm:text-[20px] text-[#A7A7A7] font-reg">00</p>
              </div>
          </div>
          <div className="flex items-center bg-white rounded-lg inset-shadow-sm shadow-md p-3 sm:p-4">
            <img className="w-8 h-8 sm:w-10 sm:h-10 object-contain mr-3 sm:mr-5" src={overviewInprogress} alt="ooverviewInprogress"/>
              <div className="flex items-center justify-between w-full">
                <p className="text-[14px] sm:text-[16px] font-bold">In progress</p>
                <p id="summary-inprogress" className="text-[18px] sm:text-[20px] text-[#A7A7A7] font-reg">00</p>
              </div>
          </div>
          <div className="flex items-center bg-white rounded-lg inset-shadow-sm shadow-md p-3 sm:p-4">
            <img className="w-7.5 h-7.5 sm:w-10 sm:h-9.5 object-contain mr-3 sm:mr-5" src={overviewNotstarted} alt="overviewNotstarted"/>
              <div className="flex items-center justify-between w-full">
                <p className="text-[14px] sm:text-[16px] font-bold">Not started</p>
                <p id="summary-notstarted" className="text-[18px] sm:text-[20px] text-[#A7A7A7] font-reg">00</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;