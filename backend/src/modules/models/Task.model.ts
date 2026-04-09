import { PrismaClient, type task } from '../../generated/prisma/index.js';
import type { Context } from 'hono';
import type { TaskStatus, UpdateTaskData } from '../types/index.js';
import * as dotenv from 'dotenv';
import { handlePrismaError } from '../../errors/prisma.js';
dotenv.config();

const prisma = new PrismaClient();

const now = new Date();

const formattedDate = now.toISOString().split('T')[0];
const currentTime = now.toTimeString().split(' ')[0];

export async function getTasksByDate(date: string, userId: number): Promise<task[]> {
  const cleanedDate = date.trim();
  const tasks = await prisma.task.findMany({
    where: {
      Task_Start_Date: cleanedDate,
      UserID: userId 
    },
    orderBy: {
      Task_Start_Time: 'asc'
    }
  });
  return tasks;
}


export async function getTasksByUser(userId: number, date?: string): Promise<task[]> {
  const whereClause: any = { UserID: userId };

  if (date) {
    
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      const isoDate = parsedDate.toISOString().split('T')[0];
      whereClause.Task_Start_Date = isoDate;
      whereClause.Task_End_Date = isoDate;
    } else {
      throw new Error('Invalid date format');
    }
  }

  const tasks = await prisma.task.findMany({
    where: whereClause,
    orderBy: [
      { Task_Start_Date: 'asc' },
      { Task_Start_Time: 'asc' }
    ]
  });

  return tasks;
}

export async function getTaskById(TaskID: number): Promise<task | null> {
  const task = await prisma.task.findUnique({
    where: {
      TaskID: TaskID,
    },
  });
  return task;
}

export async function createTask(taskData: {
  UserID: number;
  Task_Title: string;
  Task_Description?: string | null;
  Task_Start_Date?: string;
  Task_End_Date?: string;
  Task_Status?: TaskStatus;
  Task_Color?: string;
  Task_Icon?: string;
  Task_Start_Time?: string;
  Task_End_Time?: string;
}): Promise<task> {
  const taskToInsert = {
    Task_Title: taskData.Task_Title,
    Task_Description: taskData.Task_Description ?? '',
    Task_Icon: taskData.Task_Icon ?? 'default.svg',
    Task_Start_Date: taskData.Task_Start_Date ?? formattedDate,
    Task_End_Date: taskData.Task_End_Date ?? formattedDate,
    Task_Status: taskData.Task_Status ?? 'Incomplete',
    Task_Color: taskData.Task_Color ?? '#A7A7A7',
    Task_Start_Time: taskData.Task_Start_Time ?? currentTime,
    Task_End_Time: taskData.Task_End_Time ?? '23:59:59',
    user: {
      connect: {
        UserID: taskData.UserID
      }
    }
  };

  const allCategory = await prisma.category.findFirst({
    where: {
      userId: taskData.UserID,
      Category_Name: 'All',
      Category_icon: 'iconAll'
    }
  });

  if (!allCategory) {
    throw new Error(`'All' category not found for user ${taskData.UserID}`);
  }


  const task = await prisma.task.create({
    data: taskToInsert
  });

  await prisma.task_category.create({
    data: {
      TaskID: task.TaskID,
      CategoryId: allCategory.CategoryId
    }
  });

  return task;
}


export const updateTask = async (data: UpdateTaskData, TaskID: number) => {
  try {
    const task = await prisma.task.findUnique({
      where: { TaskID: TaskID },
    });
    if(!task) {
      throw new Error('Task not found');
    }
    return await prisma.task.update({
      where: { TaskID: TaskID },
      data: data,
      include: {
        user: true,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const deleteTask = async (TaskID: number) => {
  try {
    await prisma.task_category.deleteMany({
      where: {
        TaskID: TaskID
      }
    });

    await prisma.task.deleteMany({
      where: {
        TaskID: TaskID,
      }
    });

  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Failed to delete task');
  }
};