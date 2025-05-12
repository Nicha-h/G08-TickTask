import React, { useState, useEffect } from "react";
import close from '../../assets/close.svg';

const TimePickerModal = ({ onClose, onSelect, initialTime }) => {
    const [selectedHour, setSelectedHour] = useState("07");
    const [selectedMinute, setSelectedMinute] = useState("00");
    const [isPM, setIsPM] = useState(false);
    const [clockMode, setClockMode] = useState("hours"); // "hours" or "minutes"
    const [clockHand, setClockHand] = useState(210); // Initial rotation for 7 o'clock (210 degrees)

    useEffect(() => {
        // Parse initial time if provided
        if (initialTime) {
            const [hour, minute] = initialTime.split(":");
            const hourNum = parseInt(hour);

            setSelectedHour(hourNum > 12 ?
                (hourNum - 12).toString().padStart(2, "0") :
                hourNum.toString().padStart(2, "0"));

            setSelectedMinute(minute.padStart(2, "0"));
            setIsPM(hourNum >= 12);
            setClockHand((hourNum % 12 || 12) * 30);
        }
    }, [initialTime]);

    // Handle hour selection
    const handleHourClick = (hourNum) => {
        // Convert to 24-hour format for internal storage
        const hour = hourNum.toString().padStart(2, "0");
        setSelectedHour(hour);

        // Calculate and set clock hand rotation (30 degrees per hour)
        const hourInt = parseInt(hour);
        setClockHand((hourInt % 12 || 12) * 30);

        // Don't switch to minute selection automatically
        // User must click on minute field to switch
    };

    // Handle minute selection
    const handleMinuteClick = (minute) => {
        const minuteStr = minute.toString().padStart(2, "0");
        setSelectedMinute(minuteStr);

        // Calculate rotation for minute hand (6 degrees per minute)
        setClockHand(minute * 6);
    };

    // Toggle between hour and minute selection
    const toggleClockMode = (mode) => {
        setClockMode(mode);
        if (mode === "hours") {
            const hourInt = parseInt(selectedHour);
            setClockHand((hourInt % 12 || 12) * 30);
        } else {
            const minuteInt = parseInt(selectedMinute);
            setClockHand(minuteInt * 6);
        }
    };

    // Toggle AM/PM
    const toggleAmPm = (value) => {
        setIsPM(value);
    };

    // Handle confirmation
    const handleConfirm = () => {
        // Convert to 24-hour format when returning the result
        let hourInt = parseInt(selectedHour);
        if (isPM && hourInt < 12) {
            hourInt += 12;
        } else if (!isPM && hourInt === 12) {
            hourInt = 0;
        }

        const hour = hourInt.toString().padStart(2, "0");
        // Return time in 24-hour format for internal use
        onSelect(`${hour}:${selectedMinute}`);
        onClose();
    };

    // Generate clock numbers for hours 1-12
    const renderHourNumbers = () => {
        return Array.from({ length: 12 }, (_, i) => {
            const hourNum = i + 1; // 1-12
            const angle = hourNum * 30;
            const radians = ((angle - 90) * Math.PI) / 180;
            const radius = 42; // Percentage from center

            const x = 50 + radius * Math.cos(radians);
            const y = 50 + radius * Math.sin(radians);

            const isSelected = parseInt(selectedHour) % 12 || 12;
            const isActive = hourNum === isSelected;

            return (
                <div
                    key={`hour-${hourNum}`}
                    className={`absolute cursor-pointer flex items-center justify-center text-lg font-fredoka font-reg text-[18px]
            ${isActive ?
                            "bg-[#6A8DD9] text-white rounded-full w-9 h-9" :
                            "font-medium text-black"}`}
                    style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)"
                    }}
                    onClick={() => handleHourClick(hourNum)}
                >
                    {hourNum}
                </div>
            );
        });
    };

    // Generate clock numbers for minutes 0-55 in steps of 5
    const renderMinuteNumbers = () => {
        return Array.from({ length: 12 }, (_, i) => {
            const minuteVal = i * 5; // 0, 5, 10, ..., 55
            const minuteStr = minuteVal.toString().padStart(2, "0");
            const angle = i * 30; // 30 degrees per 5 minutes
            const radians = ((angle - 90) * Math.PI) / 180;
            const radius = 42; // Percentage from center

            const x = 50 + radius * Math.cos(radians);
            const y = 50 + radius * Math.sin(radians);

            const isActive = minuteStr === selectedMinute;

            return (
                <div
                    key={`minute-${minuteStr}`}
                    className={`absolute cursor-pointer flex items-center justify-center font-fredoka font-reg text-[18px]
            ${isActive ?
                            "bg-[#6A8DD9] text-[#FFFDF5] rounded-full w-9 h-9" :
                            "font-medium text-black"}`}
                    style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)"
                    }}
                    onClick={() => handleMinuteClick(minuteVal)}
                >
                    {minuteVal}
                </div>
            );
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-400/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-80 overflow-hidden shadow-lg">
                {/* Header */}
                <div className="flex justify-between p-5 text-center py-4 border-b border-gray-300">
                    <h2 className="text-[20px] sm:text-[22px] font-fredoka font-reg">Select Time</h2>
                    <img
                        className="w-5 w-5 sm:w-6 sm:w-6 object-contain items-center cursor-pointer"
                        src={close}
                        alt="close"
                        onClick={onClose}
                    />

                </div>

                {/* Time Display */}
                <div className="flex justify-center font-fredoka font-reg items-center pt-4 pb-1">
                    <div className="flex items-center text-3xl">
                        <div
                            className={`w-16 h-16 flex items-center justify-center border-[1.5px] border-black rounded-lg cursor-pointer
                ${clockMode === "hours" ? "bg-[#FFFDF5] text-black" : "bg-[#D9D9D9] text-black"}`}
                            onClick={() => toggleClockMode("hours")}
                        >
                            <span className="text-4xl font-bold">{selectedHour}</span>
                        </div>
                        <div className="mx-1 text-2xl font-bold">:</div>
                        <div
                            className={`w-16 h-16 flex items-center justify-center bg-[#D9D9D9] border-[1.5px] border-black rounded-lg cursor-pointer
                ${clockMode === "minutes" ? "bg-[#FFFDF5] text-black" : "bg-[#D9D9D9] text-black"}`}
                            onClick={() => toggleClockMode("minutes")}
                        >
                            <span className="text-4xl font-bold">{selectedMinute}</span>
                        </div>
                        <div className="ml-2 flex flex-col font-fredoka text-[24px]">
                            <button
                                className={`px-2 py-1 border-[1.5px] border-black rounded-t-md ${isPM ? "bg-[#D9D9D9]" : "bg-[#FFFDF5] text-black font-medium"}`}
                                onClick={() => toggleAmPm(false)}
                            >
                                AM
                            </button>
                            <button
                                className={`px-2 py-1 border-[1.5px] border-black rounded-b-md ${!isPM ? "bg-[#D9D9D9]" : "bg-[#FFFDF5] text-black font-medium"}`}
                                onClick={() => toggleAmPm(true)}
                            >
                                PM
                            </button>
                        </div>
                    </div>
                </div>

                {/* Clock UI */}
                <div className="flex justify-center font-fredoka font-reg p-4">
                    <div className="relative w-64 h-64 rounded-full bg-[#E7F1A8]">
                        {/* Clock numbers - display hours or minutes based on mode */}
                        {clockMode === "hours" ? renderHourNumbers() : renderMinuteNumbers()}

                        {/* Clock hand - straight line */}
                        <div
                            className="absolute bg-[#6A8DD9] origin-bottom"
                            style={{
                                width: "1.5px",
                                height: "35%",
                                left: "50%",
                                top: "15%",
                                transform: `translateX(-50%) rotate(${clockHand}deg)`
                            }}
                        />

                        {/* Center dot */}
                        <div className="absolute w-3 h-3 bg-[#6A8DD9] rounded-full"
                            style={{
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)"
                            }}
                        />
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

export default TimePickerModal;