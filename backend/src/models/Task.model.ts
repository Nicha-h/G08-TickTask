import { PrismaClient, type task } from '../generated/prisma/index.js';
import { db } from '../index.js'
import type { Context } from 'hono';
import type { TaskStatus } from '../types/index.js';
import type { Task } from '../schemas/Schemas.js';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

const now = new Date();
const formattedDate = now.toISOString().split('T')[0];
const currentTime = now.toTimeString().split(' ')[0];

export async function getTasksByDate(date: string): Promise<task[]> {
  const tasks = await prisma.task.findMany({
    where: {
      Task_Start_Date: date
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
    whereClause.Task_Start_Date = { lte: date };
    whereClause.Task_End_Date = { gte: date };
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

export async function createTask(taskData: {
  UserID: number;
  Task_Title: string;
  Task_Description?: string | null;
  Task_Start_Date?: string;
  Task_End_Date?: string;
  Task_Status?: TaskStatus;
  Task_Color?: string;
  Task_Icon?: string ;
  Task_Start_Time?: string;
  Task_End_Time?: string;
}): Promise<task> {

  const taskToInsert = {
    Task_Title: taskData.Task_Title,
    Task_Description: taskData.Task_Description ?? null,
    Task_Icon: taskData.Task_Icon ?? 'default.svg',
    Task_Start_Date: taskData.Task_Start_Date ?? formattedDate,
    Task_End_Date: taskData.Task_End_Date ?? formattedDate,
    Task_Status: taskData.Task_Status ?? 'Incomplete',
    Task_Color: taskData.Task_Color ?? '#A7A7A7',
    Task_Start_Time: taskData.Task_Start_Time ?? currentTime,
    Task_End_Time: taskData.Task_End_Time ?? '23:59:59',
    user: {
      connect: {
        id: taskData.UserID
      }
    }
  };

  const task = await prisma.task.create({
    data: taskToInsert
  });

  return task;
}

export const updateTask = async (c: Context) => {
  const id = Number(c.req.param('id'));
  const user = c.get('user') as { id: number };
  const body = await c.req.json();

  try {
    await prisma.task.updateMany({
      where: {
        TaskID: id,
        UserID: user.id
      },
      data: {
        Task_Title: body.Task_Title,
        Task_Description: body.Task_Description,
        Task_Status: body.Task_Status,
        Task_Color: body.Task_Color,
        Task_Icon: body.Task_icon,
        Task_Start_Date: body.Task_Start_Date,
        Task_End_Date: body.Task_End_Date,
        Task_Start_Time: body.Task_Start_Time,
        Task_End_Time: body.Task_End_Time
      }
    });

    return c.json({ message: 'Task updated successfully' });
  } catch (err) {
    console.error('Error updating task:', err);
    return c.json({ error: 'Failed to update task' }, 500);
  }
};

export const deleteTask = async (c: Context) => {
  const id = Number(c.req.param('id'));
  const user = c.get('user') as { id: number };

  try {
    await prisma.task.deleteMany({
      where: {
        TaskID: id,
        UserID: user.id
      }
    });

    return c.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return c.json({ error: 'Failed to delete task' }, 500);
  }
};
