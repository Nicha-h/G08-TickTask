import { taskModel } from '../models/index.js';
import type {
  Task,
  CreateTaskData,
  UpdateTaskData,
} from '../types/index.js';

const getAllTask = async (userId: number): Promise<Task[]> => {
  const tasks = await taskModel.getTasksByUser(userId);
  return tasks.map(task => ({
    ...task,
    Task_Start_Date: task.Task_Start_Date ?? '',
    Task_End_Date: task.Task_End_Date ?? '',
    Task_Start_Time: task.Task_Start_Time ?? '',
    Task_End_Time: task.Task_End_Time ?? '',
    Task_Description: task.Task_Description ?? '',
    Task_Color: task.Task_Color ?? '#D1F4FF',
    Task_Icon: task.Task_Icon ?? 'iconWork.svg',
  }));
}
const getTasksByDate = async (date: string, userId: number): Promise<Task[]> => {
  const tasks = await taskModel.getTasksByDate(date, userId);
  return tasks.map(task => ({
    ...task,
    Task_Start_Date: task.Task_Start_Date ?? '',
    Task_End_Date: task.Task_End_Date ?? '',
    Task_Start_Time: task.Task_Start_Time ?? '',
    Task_End_Time: task.Task_End_Time ?? '',
    Task_Description: task.Task_Description ?? '',
    Task_Color: task.Task_Color ?? '#D1F4FF',
    Task_Icon: task.Task_Icon ?? 'iconWork.svg',
  }));
}
const createTask = async (data: CreateTaskData): Promise<Task> => {
  const task = await taskModel.createTask(data);
    if (!task) {
    throw new Error('Failed to create task');
  }
    return {
    ...task,
    Task_Start_Date: task.Task_Start_Date ?? '',
    Task_End_Date: task.Task_End_Date ?? '',
    Task_Start_Time: task.Task_Start_Time ?? '',
    Task_End_Time: task.Task_End_Time ?? '',
    Task_Description: task.Task_Description ?? '',
    Task_Color: task.Task_Color ?? '#D1F4FF',
    Task_Icon: task.Task_Icon ?? 'iconWork.svg',
  };
}
const updateTask = async (
  data: UpdateTaskData,
  TaskID: number
): Promise<Task> => {
  const updatedTask = await taskModel.updateTask( data, TaskID);
  if (!updatedTask) throw new Error('Failed to update task');
  return {
    ...updatedTask,
    Task_Start_Date: updatedTask.Task_Start_Date ?? '',
    Task_End_Date: updatedTask.Task_End_Date ?? '',
    Task_Start_Time: updatedTask.Task_Start_Time ?? '',
    Task_End_Time: updatedTask.Task_End_Time ?? '',
    Task_Description: updatedTask.Task_Description ?? '',
    Task_Color: updatedTask.Task_Color ?? '#D1F4FF',
    Task_Icon: updatedTask.Task_Icon ?? 'iconWork.svg',
  };
};

const deleteTask = async (TaskID: number) => {
  await taskModel.deleteTask(TaskID);
}

export const TaskServices = {
  getAllTask,
  getTasksByDate,
    createTask,
    updateTask,
    deleteTask
}