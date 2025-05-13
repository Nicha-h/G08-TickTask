import React, { useState } from "react";
import close from '../../assets/close.svg';

const DatePickerModal = ({ onClose, onSelect, initialDate }) => {
    const currentDate = new Date();

    // Parse initialDate (expected format: dd/mm/yyyy)
    const parseDateStr = (dateStr) => {
        if (!dateStr) return new Date();
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    };

    const initialDateObj = initialDate ? parseDateStr(initialDate) : currentDate;

    const [viewDate, setViewDate] = useState(initialDateObj);
    const [selectedDate, setSelectedDate] = useState(initialDateObj);
    const [viewMode, setViewMode] = useState("days"); // 'days', 'months', or 'years'

    // Month names for display
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Days of week for headers
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Navigate to previous period based on current view mode
    const prevPeriod = () => {
        if (viewMode === "days") {
            setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
        } else if (viewMode === "months") {
            setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1));
        } else if (viewMode === "years") {
            setViewDate(new Date(viewDate.getFullYear() - 10, viewDate.getMonth(), 1));
        }
    };

    // Navigate to next period based on current view mode
    const nextPeriod = () => {
        if (viewMode === "days") {
            setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
        } else if (viewMode === "months") {
            setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1));
        } else if (viewMode === "years") {
            setViewDate(new Date(viewDate.getFullYear() + 10, viewDate.getMonth(), 1));
        }
    };

    // Format date as dd/mm/yyyy
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Get calendar days for current view
    const getCalendarDays = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();

        // First day of the month
        const firstDay = new Date(year, month, 1);
        // Last day of the month
        const lastDay = new Date(year, month + 1, 0);

        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        // Create array for calendar grid
        let days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }

        // Fill remaining cells to complete the grid (optional)
        const remainingCells = 42 - days.length; // 6 rows of 7 days
        for (let i = 0; i < remainingCells; i++) {
            days.push(null);
        }

        return days;
    };

    // Get years for year selection view
    const getYearRange = () => {
        const startYear = Math.floor(viewDate.getFullYear() / 10) * 10;
        return Array.from({ length: 10 }, (_, i) => startYear + i - 1).concat(
            Array.from({ length: 2 }, (_, i) => startYear + 9 + i)
        );
    };

    // Check if a date is today
    const isToday = (date) => {
        if (!date) return false;

        return (
            date.getDate() === currentDate.getDate() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getFullYear() === currentDate.getFullYear()
        );
    };

    // Check if a date is selected
    const isSelected = (date) => {
        if (!date || !selectedDate) return false;

        return (
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear()
        );
    };

    // Handle date selection
    const handleDateSelect = (date) => {
        if (!date) return;
        setSelectedDate(date);
    };

    // Handle month selection
    const handleMonthSelect = (monthIndex) => {
        setViewDate(new Date(viewDate.getFullYear(), monthIndex, 1));
        setViewMode("days");
    };

    // Handle year selection
    const handleYearSelect = (year) => {
        setViewDate(new Date(year, viewDate.getMonth(), 1));
        setViewMode("months");
    };

    // Toggle view mode between days, months, and years
    const toggleViewMode = () => {
        if (viewMode === "days") {
            setViewMode("months");
        } else if (viewMode === "months") {
            setViewMode("years");
        } else {
            setViewMode("days");
        }
    };

    // Handle confirmation
    const handleConfirm = () => {
        onSelect(formatDate(selectedDate));
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-400/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-80 overflow-hidden shadow-lg">
                {/* Header */}
                <div className="flex justify-between p-6 text-center py-4 border-b border-gray-300">
                    <h2 className="text-[20px] sm:text-[22px] font-fredoka font-reg">Select Date</h2>
                    <img
                        className="w-5 w-5 sm:w-6 sm:w-6 object-contain items-center cursor-pointer"
                        src={close}
                        alt="close"
                        onClick={onClose}
                    />
                </div>


                {/* Month navigation */}
                <div className="flex justify-between items-center px-4 py-2">
                    <button
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={prevPeriod}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <button
                        className="font-poppins font-bold text-gray-800 text-[17px] hover:bg-gray-100 px-2 py-1 rounded"
                        onClick={toggleViewMode}
                    >
                        {viewMode === "days" && `${monthNames[viewDate.getMonth()]} ${viewDate.getFullYear()}`}
                        {viewMode === "months" && `${viewDate.getFullYear()}`}
                        {viewMode === "years" && `${Math.floor(viewDate.getFullYear() / 10) * 10}-${Math.floor(viewDate.getFullYear() / 10) * 10 + 9}`}
                    </button>

                    <button
                        className="p-1 rounded-full hover:bg-gray-100"
                        onClick={nextPeriod}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>

                {/* Calendar - Days View */}
                {viewMode === "days" && (
                    <div className="px-4 py-2">
                        {/* Days of week header */}
                        <div className="grid grid-cols-7 text-center font-poppins font-bold text-[14px] text-gray-500 mb-1">
                            {daysOfWeek.map(day => (
                                <div key={day} className="py-1">{day}</div>
                            ))}
                        </div>

                        {/* Calendar days */}
                        <div className="grid grid-cols-7 gap-1">
                            {getCalendarDays().map((day, index) => (
                                <div
                                    key={index}
                                    className={`
                    aspect-square flex items-center justify-center text-sm cursor-pointer
                    ${!day ? 'invisible' : ''}
                    ${isSelected(day) ? 'bg-[#E7F1A8] rounded-full' : ''}
                    ${isToday(day) && !isSelected(day) ? 'border border-black rounded-full' : ''}
                    ${day && !isSelected(day) && !isToday(day) ? 'hover:bg-gray-100 rounded-full' : ''}
                  `}
                                    onClick={() => day && handleDateSelect(day)}
                                >
                                    {day?.getDate()}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Months View */}
                {viewMode === "months" && (
                    <div className="px-4 py-2">
                        <div className="grid grid-cols-3 gap-3">
                            {monthNames.map((month, index) => (
                                <button
                                    key={month}
                                    className={`
                    py-3 rounded-md text-center font-poppins font-medium
                    ${viewDate.getMonth() === index ? 'bg-[#E7F1A8]' : 'hover:bg-gray-100'}
                  `}
                                    onClick={() => handleMonthSelect(index)}
                                >
                                    {month.substring(0, 3)}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Years View */}
                {viewMode === "years" && (
                    <div className="px-4 py-2">
                        <div className="grid grid-cols-4 gap-2">
                            {getYearRange().map((year) => (
                                <button
                                    key={year}
                                    className={`
                    py-3 rounded-md text-center font-poppins font-medium
                    ${viewDate.getFullYear() === year ? 'bg-[#E7F1A8]' : 'hover:bg-gray-100'}
                  `}
                                    onClick={() => handleYearSelect(year)}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Selected date display */}
                <div className="px-4 py-2 text-center font-poppins font-bold text-black text-[16px]">
                    <div className="font-medium">
                        Selected: {selectedDate ? formatDate(selectedDate) : 'None'}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end p-4">
                    <button
                        className="bg-[#D9D9D9] border-[1.5px] border-[#404040] font-poppins font-bold text-[#404040] text-[14px] hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-[#E7FFAE] hover:bg-lime-300 border-[1.5px] border-black font-poppins font-bold text-black text-[14px] hover:bg-green-300 text-gray-800 py-2 px-6 rounded-md"
                        onClick={handleConfirm}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DatePickerModal;