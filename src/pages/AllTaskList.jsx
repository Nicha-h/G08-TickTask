import {React, useState} from 'react'
//import TaskList from '../components/Tasklist';
import { format } from 'date-fns';
import WeeklyCalendar from '../components/WeeklyCalendar';

function AllTaskList() {
    const date = new Date();
      const [selectedDate, setSelectedDate] = useState(format(date, 'yyyy-MM-dd'));
      const tasks = {
        '2025-04-04': [
          { id: 1, taskname: 'Code Home Page', description: 'I have to finish this shite', time: '01:00 - 12:00' },
          { id: 2, taskname: 'Code Pomo Page', description: 'i also have to do this one ffs', time: '12:00 - 23:00' },
          { id: 3, taskname: 'bruh2', description: 'i also have to do this one ffs', time: '12:00 - 23:00' },
          { id: 4, taskname: 'brush3', description: 'i also have to do this one ffs', time: '12:00 - 23:00' },
          { id: 5, taskname: 'ksoadwaw', description: 'i also have to do this one ffs', time: '12:00 - 23:00' },
          { id: 6, taskname: 'ksoadwaw', description: 'i also have to do this one ffs', time: '12:00 - 23:00' },
          { id: 7, taskname: 'ksoadwaw', description: 'i also have to do this one ffs', time: '12:00 - 23:00' },
          { id: 8, taskname: 'ksoadwaw', description: 'i also have to do this one ffs', time: '12:00 - 23:00' },
          { id: 9, taskname: 'ksoadwaw', description: 'i also have to do this one ffs', time: '12:00 - 23:00' },


        ],
      };

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
