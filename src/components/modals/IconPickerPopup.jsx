import React from 'react';
import PropTypes from 'prop-types';
import iconPet from '../../../assets/iconPet.svg';
import iconComputer from '../../../assets/iconComputer.svg';
import iconArt from '../../../assets/iconArt.svg';
import iconSmile from '../../../assets/iconSmile.svg';
import iconWorkout from '../../../assets/iconWorkout.svg';
import iconStar from '../../../assets/iconStar.svg';
import iconHeart from '../../../assets/iconHeart.svg';
import iconGame from '../../../assets/iconGame.svg';
import iconScience from '../../../assets/iconScience.svg';
import iconCode from '../../../assets/iconCode.svg';
import iconBook from '../../../assets/iconBook.svg';
import iconHeartbeat from '../../../assets/iconHeartbeat.svg';
import iconUmbrella from '../../../assets/iconUmbrella.svg';
import iconAll from '../../../assets/iconAll.svg';
import iconStudy from '../../../assets/iconStudy.svg';
import iconWork from '../../../assets/iconWork.svg';
import close from '../../../assets/close.svg';

const IconPickerPopup = ({ onClose, onSelectIcon }) => {
  const iconOptions = [
    { id: 'pet', icon: iconPet, label: 'Pet' },
    { id: 'computer', icon: iconComputer, label: 'Computer' },
    { id: 'art', icon: iconArt, label: 'Art' },
    { id: 'smile', icon: iconSmile, label: 'Smile' },
    { id: 'workout', icon: iconWorkout, label: 'Workout' },
    { id: 'star', icon: iconStar, label: 'Star' },
    { id: 'heart', icon: iconHeart, label: 'Heart' },
    { id: 'game', icon: iconGame, label: 'Game' },
    { id: 'science', icon: iconScience, label: 'Science' },
    { id: 'code', icon: iconCode, label: 'Code' },
    { id: 'book', icon: iconBook, label: 'Book' },
    { id: 'heartbeat', icon: iconHeartbeat, label: 'Health' },
    { id: 'umbrella', icon: iconUmbrella, label: 'Travel' },
    { id: 'all', icon: iconAll, label: 'All' },
    { id: 'study', icon: iconStudy, label: 'Study' },
    { id: 'work', icon: iconWork, label: 'Work' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Select an Icon</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close icon picker"
          >
            <img src={close} alt="Close" className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 grid grid-cols-4 gap-3">
          {iconOptions.map((option) => (
            <button
              key={option.id}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => {
                onSelectIcon(option.icon);
                onClose();
              }}
              aria-label={option.label}
            >
              <img 
                src={option.icon} 
                alt={option.label} 
                className="w-8 h-8 object-contain" 
              />
              <span className="mt-1 text-xs text-gray-600">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

IconPickerPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSelectIcon: PropTypes.func.isRequired
};

export default IconPickerPopup;