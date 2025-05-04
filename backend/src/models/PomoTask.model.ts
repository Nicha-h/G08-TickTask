import * as dotenv from 'dotenv';
dotenv.config();
import { Prisma, PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export async function getAllPomoTask(userId: number) {
    return prisma.pomodoro_task.findMany({
      where: {
        session: {
          UserID: userId,
        },
      },
      orderBy: {
        Pomo_TaskId: 'desc',
      },
    });
  }
  
  export async function findBySession(sessionId: number) {
    return prisma.pomodoro_task.findMany({
      where: { SessionId: sessionId },
    });
  }
  
  export async function findByUserId(userId: number) {
    const task = await prisma.pomodoro_task.findFirst({
      where: {
        session: {
          UserID: userId,
        },
      },
    });
    return task;
  }
  
  export async function findById(taskId: number) {
    return prisma.pomodoro_task.findUnique({
      where: { Pomo_TaskId: taskId },
    });
  }
  
  export async function CreatePomoTask(data: Prisma.pomodoro_taskCreateInput) {
    return prisma.pomodoro_task.create({
      data: {
        Pomo_Task_Title: data.Pomo_Task_Title,
        Pomo_Task_Short: data.Pomo_Task_Short ?? 5,
        Pomo_Task_Long: data.Pomo_Task_Long ?? 15,
        Pomo_Task_Status: false,
        Pomo_Completed_Count: 0,
        Pomo_Target_Count: data.Pomo_Target_Count ?? 0,
        session: data.session, 
      },
    });
  }
  
  
  
  export async function updatePomoTask(taskId: number, data: Prisma.pomodoro_taskUpdateInput) {
    return prisma.pomodoro_task.update({
      where: { Pomo_TaskId: taskId },
      data: {
        ...data,
        session: data.SessionId ? {
          connect: { SessionId: data.SessionId }
        } : undefined, 
      },
    });
  }
  
  
  export async function deletePomoTask(taskId: number) {
    await prisma.pomodoro_task.delete({
      where: { Pomo_TaskId: taskId },
    });
    return true;
  }
  
  export async function assignToSession(taskId: number, sessionId: number) {
    return prisma.pomodoro_task.update({
      where: { Pomo_TaskId: taskId },
      data: { SessionId: sessionId },
    });
  }
  
  export async function incrementPomoCounter(taskId: number) {
    const task = await findById(taskId);
    if (!task) throw new Error('Task not found');
    const newCount = task.Pomo_Completed_Count + 1;
    const newStatus = task.Pomo_Target_Count > 0 && newCount >= task.Pomo_Target_Count ? true : task.Pomo_Task_Status;
  
    return prisma.pomodoro_task.update({
      where: { Pomo_TaskId: taskId },
      data: {
        Pomo_Completed_Count: newCount,
        Pomo_Task_Status: newStatus,
      },
    });
  }
  
  export async function resetPomoCounter(taskId: number) {
    return prisma.pomodoro_task.update({
      where: { Pomo_TaskId: taskId },
      data: { Pomo_Completed_Count: 0 },
    });
  }
  
  export async function setPomoTargetCount(taskId: number, targetCount: number) {
    return prisma.pomodoro_task.update({
      where: { Pomo_TaskId: taskId },
      data: { Pomo_Target_Count: targetCount },
    });
  }
  
  export async function getTaskProgress(taskId: number) {
    const task = await findById(taskId);
    if (!task) throw new Error('Task not found');
    return {
      completed: task.Pomo_Completed_Count,
      target: task.Pomo_Target_Count,
      isCompleted: task.Pomo_Task_Status === true,
    };
  }
  