import {
  createDeleteRoute,
  createGetRoute,
  createPostRoute,
  createPutRoute,
} from '../../utils/openapi-helpers.js';
import { z } from 'zod';
import { authMiddleware } from '../middlewares/authenticator.js';
import { TaskSchemas } from './task.schema.js';

const pomoTaskSchema = z.object({
  Pomo_TaskId: z.number().int().positive(),
  Pomo_Task_Title: z.string(),
  Pomo_Task_Short: z.number().int().nonnegative(),
  Pomo_Task_Long: z.number().int().nonnegative(),
  Pomo_Task_Status: z.boolean(),
  Pomo_Completed_Count: z.number().int().nonnegative(),
  Pomo_Target_Count: z.number().int().nonnegative(),
  SessionId: z.number().int().positive(),
});
const pomoTaskProgressSchema = z.object({
  completed: z.number().int().nonnegative(),
  target: z.number().int().nonnegative(),
  isCompleted: z.boolean(),
});
const pomoTaskIdParam = z.object({
  Pomo_TaskId: z.coerce.number().int().positive(),
});
 
const sessionIdParam = z.object({
  SessionId: z.coerce.number().int().positive(),
});

const createTaskSchema = z.object({
  title: z.string().min(1),
  shortBreak: z.number().int().nonnegative().default(5),
  longBreak: z.number().int().nonnegative().default(15),
  targetCount: z.number().int().nonnegative().default(4),
});
 
const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  shortBreak: z.number().int().nonnegative().optional(),
  longBreak: z.number().int().nonnegative().optional(),
  status: z.boolean().optional(),
  completedCount: z.number().int().nonnegative().optional(),
  targetCount: z.number().int().nonnegative().optional(),
  sessionId: z.number().int().positive().optional(),
});
 
const assignSessionSchema = z.object({
  sessionId: z.number().int().positive(),
});
 
const completeTaskSchema = z.object({
  Pomo_Task_Status: z.boolean(),
});
 
const setTargetCountSchema = z.object({
  targetCount: z.number().int().nonnegative(),
});

const getAllTasksRoute = createGetRoute({
  path: '/tasks',
  summary: 'Get all tasks for the authenticated user',
  responseSchema: z.array(pomoTaskSchema),
  tags: ['Tasks'],
  middleware: [authMiddleware],
  operationId: 'getAllTasks',
});
const getTaskBySessionRoute = createGetRoute({
  path: '/tasks/session/{sessionId}',
  summary: 'Get all tasks for a session',
  params: sessionIdParam,
  responseSchema: z.array(pomoTaskSchema),
  tags: ['Tasks'],
  middleware: [authMiddleware],
  operationId: 'getTaskBySession',
});
const getTaskByIdRoute = createGetRoute({
  path: '/tasks/{id}',
  summary: 'Get a task by ID',
  params: pomoTaskIdParam,
  responseSchema: pomoTaskSchema,
  tags: ['Tasks'],
  middleware: [authMiddleware],
  operationId: 'getTaskById',
});

const getTaskProgressRoute = createGetRoute({
  path: '/tasks/{id}/progress',
  summary: 'Get pomodoro progress for a task',
  params: pomoTaskIdParam,
  responseSchema: pomoTaskProgressSchema,
  tags: ['Tasks'],
  middleware: [authMiddleware],
  operationId: 'getTaskProgress',
});
 
const createTaskRoute = createPostRoute({
  path: '/tasks',
  summary: 'Create a new pomodoro task (automatically creates a linked session)',
  requestSchema: createTaskSchema,
  responseSchema: pomoTaskSchema,
  tags: ['Tasks'],
  middleware: [authMiddleware],
  operationId: 'createTask',
});
 
const incrementPomoCounterRoute = createPostRoute({
  path: '/tasks/{id}/increment',
  summary: 'Increment the pomodoro counter for a task (auto-completes if target reached)',
  params: pomoTaskIdParam,
  requestSchema: z.object({}),
  responseSchema: pomoTaskSchema,
  tags: ['Tasks'],
  middleware: [authMiddleware],
  operationId: 'incrementPomoCounter',
});
 
const resetPomoCounterRoute = createPostRoute({
  path: '/tasks/{id}/reset',
  summary: 'Reset the pomodoro counter back to zero',
  params: pomoTaskIdParam,
  requestSchema: z.object({}),
  responseSchema: pomoTaskSchema,
  tags: ['Tasks'],
  middleware: [authMiddleware],
  operationId: 'resetPomoCounter',
});
 
const setPomoTargetCountRoute = createPostRoute({
  path: '/tasks/{id}/target',
  summary: 'Set the target pomodoro count for a task',
  params: pomoTaskIdParam,
  requestSchema: setTargetCountSchema,
  responseSchema: pomoTaskSchema,
  tags: ['Tasks'],
  middleware: [authMiddleware],
  operationId: 'setPomoTargetCount',
});
 
const updateTaskRoute = createPutRoute({
  path: '/tasks/{id}',
  summary: 'Update a pomodoro task',
  params: pomoTaskIdParam,
  requestSchema: updateTaskSchema,
  responseSchema: pomoTaskSchema,
  tags: ['Tasks'],
  middleware: [authMiddleware],
  operationId: 'updateTask',
});
 
const assignTaskToSessionRoute = createPutRoute({
  path: '/tasks/{id}/assign',
  summary: 'Assign a task to a different session',
  params: pomoTaskIdParam,
  requestSchema: assignSessionSchema,
  responseSchema: pomoTaskSchema,
  tags: ['Tasks'],
  middleware: [authMiddleware],
  operationId: 'assignTaskToSession',
});
 
 const completeTaskRoute = createPutRoute({
  path: '/tasks/{id}/complete',
  summary: 'Mark a task as completed or incomplete',
  params: pomoTaskIdParam,
  requestSchema: completeTaskSchema,
  responseSchema: pomoTaskSchema,
  tags: ['Tasks'],
  middleware: [authMiddleware],
  operationId: 'completeTask',
});
 
const deleteTaskRoute = createDeleteRoute({
  path: '/tasks/{id}',
  summary: 'Delete a pomodoro task',
  params: pomoTaskIdParam,
  tags: ['Tasks'],
  middleware: [authMiddleware],
  operationId: 'deleteTask',
});

export const PomoTaskSchemas = {
  getAllTasksRoute,
  getTaskBySessionRoute,
    getTaskByIdRoute,
    getTaskProgressRoute,
  createTaskRoute,
  incrementPomoCounterRoute,
    resetPomoCounterRoute,
    setPomoTargetCountRoute,
    updateTaskRoute,
    assignTaskToSessionRoute,
    completeTaskRoute,
    deleteTaskRoute,
    pomoTaskSchema,
    pomoTaskProgressSchema,
    createTaskSchema,
    updateTaskSchema,
    assignSessionSchema,
    completeTaskSchema,
    setTargetCountSchema,
};