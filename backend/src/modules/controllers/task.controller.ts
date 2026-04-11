import type { Context } from 'hono';
import { TaskServices } from '../services/task.services.js';
import { TaskSchema } from '../middlewares/Task.validators.js';
import { errorResponse, successResponse } from '../../utils/response.js';
export const getAllTasks = async (c: Context) => {
  try {
    const user = c.get('user') as { id: number };
    const tasks = await TaskServices.getAllTask(user.id);
    return successResponse(c, tasks, 200);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return errorResponse(c, 'Failed to fetch tasks', 500);
  }
};

export const getTasksByDate = async (c: Context) => {
  const date = c.req.query('date');

  if (!date) {
    return errorResponse(c, 'Date parameter is required', 400);
  }

  try {
    const user = c.get('user') as { id: number };
    const tasks = await TaskServices.getTasksByDate(date, user.id);
    return successResponse(c, tasks, 200);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return errorResponse(c, 'Failed to fetch tasks', 500);
  }
};

export const createTaskController = async (c: Context)=> {
  try {
    const taskData = c.get('taskData');
    const user = c.get('user') as { id: number };

    const task = await TaskServices.createTask({
      ...taskData,
      UserID: user.id
    });

    return successResponse(c, task, 201);
  } catch (error) {
    console.error('Error creating task:', error);
    return errorResponse(c, 'Error creating task', 500);
  }
};

export const updateTaskController = async (c: Context)=> {
  const taskId = Number(c.req.param('id'));
  const body = await c.req.json();
  const parsed = TaskSchema.safeParse(body);

  if (!parsed.success) {
    return errorResponse(c, 'Invalid task data', 400);
  }

  try {
    const result = await TaskServices.updateTask(body.data , taskId); 
    return successResponse(c, result, 200);
  } catch (error) {
    console.error('Error updating task:', error);
    return errorResponse(c, 'Task not found or update failed', 500);
  }
};

export const patchTaskController = async (c: Context)=> {
  const taskId = Number(c.req.param('id'));
  const body = await c.req.json();

  try {
    const result = await TaskServices.updateTask(body, taskId);
    return successResponse(c, result, 200);
  } catch (error) {
    console.error('Error patching task:', error);
    return errorResponse(c, 'Error patching task', 500);
  }
};

export const deleteTaskController = async (c: Context)=> {
  const taskId = Number(c.req.param('id'));

  try {
    await TaskServices.deleteTask(taskId); 
    return successResponse(c, null, 200);
  } catch (error) {
    console.error('Error deleting task:', error);
    return errorResponse(c, 'Error deleting task', 500);
  }
};

export const getTasksOverview = async (c: Context)=> {
  try {
    const user = c.get('user') as { id: number };
    const overview = await TaskServices.getTasksOverview(user.id);
    return successResponse(c, overview, 200);
  } catch (error) {
    console.error('Error fetching task overview:', error);
    return errorResponse(c, 'Failed to fetch task overview', 500);
  }
};