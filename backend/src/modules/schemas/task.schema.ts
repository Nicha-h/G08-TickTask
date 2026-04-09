import { authMiddleware } from "../middlewares/authenticator.js";
import { createGetRoute, createDeleteRoute, createPostRoute, createPutRoute } from "../../utils/openapi-helpers.js";
import { z } from "zod";

const taskIdParam = z.object({
    taskId: z.coerce.number().int().positive(),
});
const taskStatsSchema = z.object({
  total: z.number().int().nonnegative(),
  completed: z.number().int().nonnegative(),
  inComplete: z.number().int().nonnegative(),
});
const TaskStatusEnum = z.enum(['Incomplete', 'Completed']);
const taskSchema = z.object({
  Task_Title: z.string().min(2).max(255),
  Task_Description: z.string().max(1000).optional().default(''),
  Task_Start_Date: z.string().default(() => new Date().toISOString().split('T')[0]),
  Task_End_Date: z.string().default(() => new Date().toISOString().split('T')[0]),
  Task_Start_Time: z.string().default(() => new Date().toTimeString().split(' ')[0]),
  Task_End_Time: z.string().default('23:59:00'),
  Task_Icon: z.string().max(255).default('iconWork.svg'),
  Task_Status: z.enum(['Incomplete', 'Completed']).default('Incomplete'),
  Task_Color: z.string().max(255).optional().default('#D1F4FF'),
});
const createTaskSchema = taskSchema.extend({
    UserID : z.coerce.number().int().positive(),
});
const updateTaskSchema = taskSchema.partial().extend({
    Task_Title: z.string().min(2).max(255),
  Task_Description: z.string().max(1000).optional().default(''),
  Task_Start_Date: z.string().default(() => new Date().toISOString().split('T')[0]),
  Task_End_Date: z.string().default(() => new Date().toISOString().split('T')[0]),
  Task_Start_Time: z.string().default(() => new Date().toTimeString().split(' ')[0]),
  Task_End_Time: z.string().default('23:59:00'),
  Task_Icon: z.string().max(255).default('iconWork.svg'),
  Task_Status: z.enum(['Incomplete', 'Completed']).default('Incomplete'),
  Task_Color: z.string().max(255).optional().default('#D1F4FF'),
});
const getTasksByDateRoute = createGetRoute({
    path: '/tasks/date',
    summary: 'Get tasks by date for the authenticated user',
    query: z.object({
        date: z.string().datetime(),
    }),
    responseSchema: z.array(taskSchema),
    tags: ['Tasks'],
    middleware: [authMiddleware],
});
const getAllTasksRoute = createGetRoute({
    path: '/tasks/{userId}',
    params: z.object({
        userId: z.coerce.number().int().positive(),
    }),
    summary: 'Get all tasks for the authenticated user',
    responseSchema: z.array(taskSchema),
    tags: ['Tasks'],
    middleware: [authMiddleware],
});
const getTaskOverviewRoute = createGetRoute({
  path: '/tasks/overview/{userId}',
  summary: 'Get task overview for the authenticated user',
  params: z.object({
    userId: z.coerce.number().int().positive(),
  }),
  responseSchema: z.object({
    today: taskStatsSchema,
    month: taskStatsSchema,
    year: taskStatsSchema,
  }),
  tags: ['Tasks'],
  middleware: [authMiddleware],
});
const createTaskRoute = createPostRoute({
    path: '/tasks',
    summary: 'Create a new task for the authenticated user',
    requestSchema: createTaskSchema,
    responseSchema: taskSchema,
    tags: ['Tasks'],
    middleware: [authMiddleware],
});
const updateTaskRoute = createPutRoute({
    path: '/tasks/{TaskID}',
    summary: 'Update an existing task for the authenticated user',
    params: taskIdParam,
    requestSchema: updateTaskSchema,
    responseSchema: taskSchema,
    tags: ['Tasks'],
    middleware: [authMiddleware],
});
const deleteTaskRoute = createDeleteRoute({
    path: '/tasks/{TaskID}',
    summary: 'Delete a task for the authenticated user',
    params: taskIdParam,
    tags: ['Tasks'],
    middleware: [authMiddleware],
});

export const TaskSchemas = {
    taskSchema,
    TaskStatusEnum,
    createTaskSchema,
    updateTaskSchema,
    getTasksByDateRoute,
    getAllTasksRoute,
    getTaskOverviewRoute,
    createTaskRoute,
    updateTaskRoute,
    deleteTaskRoute,
};