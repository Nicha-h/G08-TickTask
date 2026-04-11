import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import overviewTotaltask from '../assets/overviewTotaltask.svg';
import overviewCompleted from '../assets/overviewCompleted.svg';
import overviewinComplete from '../assets/overviewIncomplete.svg';
import plus from '../assets/plus.svg';
import { apiClient } from '../util/apiClient';
const Overview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState({
    today: { total: 0, completed: 0, inComplete: 0 },
    month: { total: 0, completed: 0, inComplete: 0 },
    year: { total: 0, completed: 0, inComplete: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const animationRefs = useRef({});
  const donutRef = useRef(null);

  // Mock data สำหรับกรณีที่ API ไม่พร้อม
  const getMockData = () => ({
    today: { total: 12, completed: 8, incomplete: 4 },
    month: { total: 145, completed: 89, incomplete: 56 },
    year: { total: 1250, completed: 890, incomplete: 360 },
  });

  // Fetch data from backend
  const fetchTaskData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get(`/api/tasks/overview`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // ตรวจสอบว่า response เป็น JSON หรือไม่
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('API did not return JSON, using mock data');
        const mockData = getMockData();
        const transformedData = {
          today: {
            total: mockData.today.total,
            completed: mockData.today.completed,
            inComplete: mockData.today.incomplete,
          },
          month: {
            total: mockData.month.total,
            completed: mockData.month.completed,
            inComplete: mockData.month.incomplete,
          },
          year: {
            total: mockData.year.total,
            completed: mockData.year.completed,
            inComplete: mockData.year.incomplete,
          },
        };
        setData(transformedData);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Transform backend data to match component structure
      const transformedData = {
        today: {
          total: result.today?.total || 0,
          completed: result.today?.completed || 0,
          inComplete: result.today?.inComplete || 0,
        },
        month: {
          total: result.month?.total || 0,
          completed: result.month?.completed || 0,
          inComplete: result.month?.inComplete || 0,
        },
        year: {
          total: result.year?.total || 0,
          completed: result.year?.completed || 0,
          inComplete: result.year?.inComplete || 0,
        },
      };

      setData(transformedData);
    } catch (err) {
      console.error('Error fetching task data:', err);

      // ใช้ mock data เมื่อเกิด error
      console.log('Using mock data due to API error');
      const mockData = getMockData();
      const transformedData = {
        today: {
          total: mockData.today.total,
          completed: mockData.today.completed,
          inComplete: mockData.today.incomplete,
        },
        month: {
          total: mockData.month.total,
          completed: mockData.month.completed,
          inComplete: mockData.month.incomplete,
        },
        year: {
          total: mockData.year.total,
          completed: mockData.year.completed,
          inComplete: mockData.year.incomplete,
        },
      };
      setData(transformedData);
      setError(`API Error: ${err.message} (Using sample data)`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  useEffect(() => {
    return () => {
      Object.values(animationRefs.current).forEach((ref) => {
        if (ref) cancelAnimationFrame(ref);
      });
    };
  }, []);

  const animateValue = (
    element,
    target,
    duration = 800,
    isPercentage = false,
  ) => {
    if (!element) return;

    const id = element.id || Math.random().toString(36).substring(7);
    element.id = id;

    if (animationRefs.current[id]) {
      cancelAnimationFrame(animationRefs.current[id]);
    }

    const start = parseFloat(element.textContent.replace(/%|,/g, '')) || 0;
    const startTime = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * (target - start) + start);

      if (isPercentage) {
        element.textContent = `${value}%`;
      } else {
        element.textContent = value.toLocaleString();
      }

      if (progress < 1) {
        animationRefs.current[id] = requestAnimationFrame(step);
      }
    };

    animationRefs.current[id] = requestAnimationFrame(step);
  };

  const initDonutChart = (currentData) => {
    if (!donutRef.current) return;

    const { completed, _inComplete, total } = currentData;
    const completedPercent =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    donutRef.current.style.background = `
      conic-gradient(
        #E7F1A8 0% ${completedPercent}%,
        #95B1EE ${completedPercent}% 100%
      )
    `;
  };

  const animateDonutChart = (targetData) => {
    if (!donutRef.current) return;

    const currentStyle = window.getComputedStyle(donutRef.current);
    const background = currentStyle.backgroundImage;

    let currentCompleted = 0;

    if (background.includes('conic-gradient')) {
      const matches = background.match(/#E7F1A8 0% (\d+)%, #95B1EE \1% 100%/);
      if (matches && matches.length >= 2) {
        currentCompleted = parseInt(matches[1]);
      }
    }

    const { completed, total } = targetData;
    const targetCompletedPercent =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    const duration = 800;
    const startTime = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const completedPercent = Math.floor(
        progress * (targetCompletedPercent - currentCompleted) +
          currentCompleted,
      );

      donutRef.current.style.background = `
        conic-gradient(
          #E7F1A8 0% ${completedPercent}%,
          #95B1EE ${completedPercent}% 100%
        )
      `;

      if (progress < 1) {
        animationRefs.current.donut = requestAnimationFrame(step);
      }
    };

    animationRefs.current.donut = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!loading && data.today.total > 0) {
      initDonutChart(data.today);
    }
  }, [loading, data]);

  useEffect(() => {
    if (loading) return;

    const currentData =
      activeTab === 0 ? data.today : activeTab === 1 ? data.month : data.year;
    const { total, completed, inComplete } = currentData;

    const completedPercent =
      total > 0 ? Math.round((completed / total) * 100) : 0;
    const inCompletePercent =
      total > 0 ? Math.round((inComplete / total) * 100) : 0;

    // Animate donut and numbers
    animateValue(document.getElementById('total-tasks'), total);
    animateValue(
      document.getElementById('completed-percent'),
      completedPercent,
      800,
      true,
    );
    animateValue(
      document.getElementById('inComplete-percent'),
      inCompletePercent,
      800,
      true,
    );

    animateValue(document.getElementById('summary-total'), total);
    animateValue(document.getElementById('summary-completed'), completed);
    animateValue(document.getElementById('summary-inComplete'), inComplete);

    animateDonutChart(currentData);
  }, [activeTab, data, loading]);

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveTab((prev) => (prev + 1) % 3),
    onSwipedRight: () => setActiveTab((prev) => (prev - 1 + 3) % 3),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const OverviewCard = ({ type }) => {
    const titles = ['Today', 'This Month', 'This Year'];
    const title = titles[type];
    const currentData =
      type === 0 ? data.today : type === 1 ? data.month : data.year;

    const getFontSize = (num) => {
      const length = num.toString().length;
      if (length <= 3) return 'text-[40px] sm:text-[50px]';
      if (length <= 5) return 'text-[32px] sm:text-[40px]';
      if (length <= 7) return 'text-[24px] sm:text-[32px]';
      return 'text-[20px] sm:text-[24px]';
    };

    if (loading) {
      return (
        <div className="bg-white bg-clip-border inset-shadow-sm shadow-md rounded-4xl w-full max-w-md mx-auto p-6 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex-shrink-0">
              <h2 className="font-poppins text-[22px] font-bold text-center mb-4">
                {title}
              </h2>
              <div className="relative w-[200px] h-[200px] sm:w-[225px] sm:h-[225px]">
                <div className="w-full h-full rounded-full bg-gray-200 animate-pulse"></div>
                <div
                  className="absolute top-1/2 left-1/2 w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] 
                  bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                >
                  <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center p-2 gap-3 sm:gap-5 mt-1 sm:mt-8 ml-0 sm:ml-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 sm:w-5 sm:h-5 mr-3 rounded-full bg-gray-200 animate-pulse"></span>
                <div>
                  <div className="w-12 h-6 bg-gray-200 animate-pulse rounded mb-1"></div>
                  <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 sm:w-5 sm:h-5 mr-3 rounded-full bg-gray-200 animate-pulse"></span>
                <div>
                  <div className="w-12 h-6 bg-gray-200 animate-pulse rounded mb-1"></div>
                  <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white bg-clip-border inset-shadow-sm shadow-md rounded-4xl w-full max-w-md mx-auto p-6 pb-8">
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex-shrink-0">
            <h2 className="font-poppins text-[22px] font-bold text-center mb-4">
              {title}
            </h2>
            <div className="relative w-[200px] h-[200px] sm:w-[225px] sm:h-[225px]">
              <div
                ref={donutRef}
                className="w-full h-full rounded-full border-1 donut-chart"
                style={{
                  background: `conic-gradient(
                    #E7F1A8 0% 0%,
                    #95B1EE 0% 100%
                  )`,
                }}
              ></div>
              <div
                className="absolute border-1 top-1/2 left-1/2 w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] 
                bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center overflow-hidden px-1"
              >
                <div className="w-full">
                  <p
                    id="total-tasks"
                    className={`font-fredoka font-reg leading-none p-1 ${getFontSize(currentData.total)}`}
                    style={{ wordBreak: 'break-word' }}
                  >
                    0
                  </p>
                  <p className="font-poppins text-[13px] sm:text-[15px] font-bold leading-none p-1">
                    Total task
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-2 gap-3 sm:gap-5 mt-1 sm:mt-8 ml-0 sm:ml-3">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 sm:w-5 sm:h-5 mr-3 rounded-full bg-[#E7F1A8] border-1"></span>
              <div>
                <p
                  id="completed-percent"
                  className="font-fredoka text-[24px] font-reg"
                >
                  0%
                </p>
                <p className="font-poppins text-[14px] font-bold">Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 sm:w-5 sm:h-5 mr-3 rounded-full bg-[#95B1EE] border-1"></span>
              <div>
                <p
                  id="inComplete-percent"
                  className="font-fredoka text-[24px] font-reg"
                >
                  0%
                </p>
                <p className="font-poppins text-[14px] font-bold">Incomplete</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`w-2 h-2 mx-1 rounded-full transition-colors ${i === activeTab ? 'bg-black' : 'bg-[#A7A7A7]'}`}
              aria-label={`Show ${titles[i]} view`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 min-h-screen overflow-x-hidden">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="flex text-[24px] font-poppins font-bold">Overview</h1>
        <button
          onClick={fetchTaskData}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      <div className="space-y-6 sm:space-y-8">
        <div {...handlers} className="relative overflow-visible">
          <div className="transition-opacity duration-300">
            {activeTab === 0 && <OverviewCard type={0} />}
            {activeTab === 1 && <OverviewCard type={1} />}
            {activeTab === 2 && <OverviewCard type={2} />}
          </div>
        </div>

        <div className="grid grid-cols-1 font-poppins gap-3 max-w-md mx-auto">
          <div className="flex items-center bg-white rounded-lg inset-shadow-sm shadow-md p-3 sm:p-4">
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain mr-3 sm:mr-5"
              src={overviewTotaltask}
              alt="overviewTotaltask"
            />
            <div className="flex items-center justify-between w-full">
              <p className="text-[14px] sm:text-[16px] font-bold">Total task</p>
              <p
                id="summary-total"
                className="text-[18px] sm:text-[20px] text-[#A7A7A7] font-reg"
              >
                {loading ? '...' : '0'}
              </p>
            </div>
          </div>
          <div className="flex items-center bg-white rounded-lg inset-shadow-sm shadow-md p-3 sm:p-4">
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain mr-3 sm:mr-5"
              src={overviewCompleted}
              alt="overviewCompleted"
            />
            <div className="flex items-center justify-between w-full">
              <p className="text-[14px] sm:text-[16px] font-bold">Completed</p>
              <p
                id="summary-completed"
                className="text-[18px] sm:text-[20px] text-[#A7A7A7] font-reg"
              >
                {loading ? '...' : '0'}
              </p>
            </div>
          </div>
          <div className="flex items-center bg-white rounded-lg inset-shadow-sm shadow-md p-3 sm:p-4">
            <img
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain mr-3 sm:mr-5"
              src={overviewinComplete}
              alt="overviewinComplete"
            />
            <div className="flex items-center justify-between w-full">
              <p className="text-[14px] sm:text-[16px] font-bold">Incomplete</p>
              <p
                id="summary-inComplete"
                className="text-[18px] sm:text-[20px] text-[#A7A7A7] font-reg"
              >
                {loading ? '...' : '0'}
              </p>
            </div>
          </div>
        </div>

        <div>
          <Link to="/add">
            <button className="fixed bottom-[60px] right-[76px] w-[87px] h-[87px] rounded-full border-2 bg-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
              <img src={plus} alt="add" className="w-8 h-8" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;
