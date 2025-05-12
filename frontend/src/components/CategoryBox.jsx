import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import iconPet from '../assets/iconPet.svg';
import iconComputer from '../assets/iconComputer.svg';
import iconArt from '../assets/iconArt.svg';
import iconSmile from '../assets/iconSmile.svg';
import iconWorkout from '../assets/iconWorkout.svg';
import iconStar from '../assets/iconStar.svg';
import iconHeart from '../assets/iconHeart.svg';
import iconGame from '../assets/iconGame.svg';
import iconScience from '../assets/iconScience.svg';
import iconCode from '../assets/iconCode.svg';
import iconBook from '../assets/iconBook.svg';
import iconHeartbeat from '../assets/iconHeartbeat.svg';
import iconUmbrella from '../assets/iconUmbrella.svg';
import iconAll from '../assets/iconAll.svg';
import iconStudy from '../assets/iconStudy.svg';
import iconWork from '../assets/iconWork.svg';


function CategoryBox() {

  const [userID, setUserID] = useState('');
  const [category, setCategory] = useState([]);
  const [taskCounts, setTaskCounts] = useState({}); // New state to hold task counts for categories
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);

  const iconMap = {
    pet: iconPet,
    computer: iconComputer,
    art: iconArt,
    smile: iconSmile,
    workout: iconWorkout,
    star: iconStar,
    heart: iconHeart,
    game: iconGame,
    science: iconScience,
    code: iconCode,
    book: iconBook,
    heartbeat: iconHeartbeat,
    umbrella: iconUmbrella,
    all: iconAll,
    study: iconStudy,
    work: iconWork
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const idFromToken = decoded.id || decoded.userId || decoded._id;
      setUserID(idFromToken);
    } catch (err) {
      console.error("Invalid token:", err);
      setError("Authentication failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userID) {
      fetchCategory();
    }
  }, [userID]);

  useEffect(() => {
    if (category.length) {
      category.forEach(cat => {
        fetchTaskCount(cat.CategoryId);
      });
    }
  }, [category]);
  
  

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/api/category`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      let categories = response.data;

      categories.sort((a, b) => a.Category_Name.localeCompare(b.Category_Name));

      setCategory(categories);

    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const fetchTaskCount = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/api/category/${categoryId}/count`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const count = response.data.taskCount; 
      
      setTaskCounts(prevState => ({
        ...prevState,
        [String(categoryId)]: count
      }));
      

    } catch (err) {
      console.error("Error fetching task count:", err);
      setError("Failed to fetch task count");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary2"></div>
        <p className="ml-3 text-primary font-medium">Loading categories...</p>
      </div>
    );
  }

  if (!loading && category.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg font-medium">No categories found.</p>
      </div>
    );
  }

  return (
    
    <div className="px-4 sm:px-6 lg:px-8 mt-7 font-poppins">
      
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {category.map((category, index) => (
          
          <div
            key={index}
            className={`w-[120px] h-[140px] sm:w-[140px] sm:h-[140px] md:w-[130px] md:h-[130px] lg:w-[140px] lg:h-[140px] 
              border-2 rounded-lg p-3 flex flex-col 
              transition duration-300 hover:brightness-90 hover:scale-105 ${
              (index > 2 && index < 4) ? 'hidden md:flex' : index > 3 ? 'hidden lg:flex' : 'flex'
            }`}
            style={{ backgroundColor: category.Category_Color }}
          >

            <img src={iconMap[category.Category_icon]} alt={category.Category_Name} className="w-7 h-7 md:w-10 md:h-10" />
            <div className="mt-4 ml-1">
              <p className="text-lg sm:text-xl">{category.Category_Name}</p>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base">
              {taskCounts[String(category.CategoryId)] || 0} Tasks
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryBox;
