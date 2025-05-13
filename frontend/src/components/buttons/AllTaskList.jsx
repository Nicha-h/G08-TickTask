import {React, useState, useEffect} from 'react'
import { format } from 'date-fns';
import WeeklyCalendar from '../components/WeeklyCalendar';

function AllTaskList() {
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(format(date, 'yyyy-MM-dd'));
  const [tasks, setTasks] = useState({});
  
      return (
        <div className="h-[80vh] overflow-y-auto scrollbar-medium scrollbar-thumb-graycancle scrollbar-track-gray">
          <WeeklyCalendar 
            selectedDate={selectedDate} 
            onDateSelect={setSelectedDate}
            tasks={tasks}
          />
        </div>
      )
  }

export default AllTaskList
