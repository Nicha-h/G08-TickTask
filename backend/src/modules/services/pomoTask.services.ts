import { pomoTaskModel } from '../models/index.js';
import { createSession } from '../models/Pomodoro.model.js';
import type {
  PomoTask,
  CreatePomoTaskData,
  UpdatePomoTaskData,
  TimerType,
  SessionStatus,
} from '../types/index.js';

const getAllPomoTask = async (userId: number): Promise<PomoTask[]> => {
  const tasks = await pomoTaskModel.getAllPomoTask(userId);
  return tasks;
}

const getPomoTaskBySessionId = async (sessionId: number): Promise<PomoTask[]> => {
  const tasks = await pomoTaskModel.findBySession(sessionId);
  return tasks;
}
const getPomoTaskByUserId = async (userId: number): Promise<PomoTask | null> => {
  const task = await pomoTaskModel.findByUserId(userId);
  return task;
}
const updatePomoTask = async (taskId: number, data: UpdatePomoTaskData): Promise<PomoTask> => {
  const updatedTask = await pomoTaskModel.updatePomoTask(taskId, data);
  return updatedTask;
}

const deletePomoTask = async (taskId: number): Promise<void> => {
    await pomoTaskModel.deletePomoTask(taskId);
}
const assignTaskToSession = async (taskId: number, sessionId: number): Promise<PomoTask> => {
  const updatedTask = await pomoTaskModel.updatePomoTask(taskId, { SessionId: sessionId });
  return updatedTask;
}
const completePomoTask = async (taskId: number, status: boolean): Promise<PomoTask> => {
  const updatedTask = await pomoTaskModel.updatePomoTask(taskId, {
    Pomo_Task_Status: status,
  });
  return updatedTask;
}

const createPomoTask = async (data: CreatePomoTaskData): Promise<PomoTask> => {
  if (!data.sessionId) {
    throw new Error('sessionId is required');
  }
  
  const task = await pomoTaskModel.CreatePomoTask({
    Pomo_Task_Title: data.Pomo_Task_Title,
    Pomo_Task_Short: data.Pomo_Task_Short ?? 5,
    Pomo_Task_Long: data.Pomo_Task_Long ?? 15,
    Pomo_Task_Status: false,
    Pomo_Completed_Count: 0,
    Pomo_Target_Count: data.Pomo_Target_Count ?? 4,
    session: { connect: { SessionId: data.sessionId } },
  });
  return task;
}

const createPomoTaskWithSession = async (
  userId: number,
  data: {
    title: string;
    shortBreak: number;
    longBreak: number;
    targetCount: number;
  }
): Promise<PomoTask> => {
  const newSession = await createSession({
    UserID: userId,
    duration_seconds: 1500,
    timer_type: 'work',
  });

  const newTask = await pomoTaskModel.CreatePomoTask({
    Pomo_Task_Title: data.title,
    Pomo_Task_Short: data.shortBreak,
    Pomo_Task_Long: data.longBreak,
    Pomo_Task_Status: false,
    Pomo_Completed_Count: 0,
    Pomo_Target_Count: data.targetCount,
    session: { connect: { SessionId: newSession.SessionId } },
  });

  return newTask;
}

const incrementPomoCounter = async (taskId: number): Promise<PomoTask> => {
  const task = await pomoTaskModel.incrementPomoCounter(taskId);
  return task;
}

const resetPomoCounter = async (taskId: number): Promise<PomoTask> => {
  const task = await pomoTaskModel.resetPomoCounter(taskId);
  return task;
}

const setPomoTargetCount = async (taskId: number, targetCount: number): Promise<PomoTask> => {
  const task = await pomoTaskModel.setPomoTargetCount(taskId, targetCount);
  return task;
}

const getTaskProgress = async (taskId: number) => {
  const progress = await pomoTaskModel.getTaskProgress(taskId);
  return progress;
}

export const PomoTaskServices = {
  getAllPomoTask,
  getPomoTaskBySessionId,
  getPomoTaskByUserId,
  updatePomoTask,
  deletePomoTask,
  assignTaskToSession,
  completePomoTask,
  createPomoTask,
  createPomoTaskWithSession,
  incrementPomoCounter,
  resetPomoCounter,
  setPomoTargetCount,
  getTaskProgress,
};