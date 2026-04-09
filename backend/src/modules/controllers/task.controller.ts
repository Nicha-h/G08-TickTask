import type { Context } from 'hono';
import { TaskServices } from '../services/task.services.js';
import { TaskSchema } from '../middlewares/Task.validators.js';

export const getAllTasks = async (c: Context) => {
  try {
    const user = c.get('user') as { id: number };
    const tasks = await TaskServices.getAllTask(user.id);
    return c.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return c.json({ error: 'Failed to fetch tasks' }, 500);
  }
};

export const getTasksByDate = async (c: Context) => {
  const date = c.req.query('date');

  if (!date) {
    return c.json({ error: 'Date parameter is required' }, 400);
  }

  try {
    const user = c.get('user') as { id: number };
    const tasks = await TaskServices.getTasksByDate(date, user.id);
    return c.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return c.json({ error: 'Failed to fetch tasks' }, 500);
  }
};

export const createTaskController = async (c: Context) => {
  try {
    const taskData = c.get('taskData');
    const user = c.get('user') as { id: number };

    const task = await TaskServices.createTask({
      ...taskData,
      UserID: user.id
    });

    return c.json({ success: true, data: task }, 201);
  } catch (error) {
    console.error('Error creating task:', error);
    return c.json({ success: false, message: 'Error creating task' }, 500);
  }
};

export const updateTaskController = async (c: Context) => {
  const taskId = Number(c.req.param('id'));
  const body = await c.req.json();
  const parsed = TaskSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: parsed.error.format() }, 400);
  }

  try {
    const result = await TaskServices.updateTask(body.data , taskId); 
    return c.json({ success: true, data: result, message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    return c.json({ success: false, message: 'Task not found or update failed' }, 500);
  }
};

export const patchTaskController = async (c: Context) => {
  const taskId = Number(c.req.param('id'));
  const body = await c.req.json();

  try {
    const result = await TaskServices.updateTask(body, taskId);
    return c.json({ success: true, data: result, message: 'Task patched successfully' });
  } catch (error) {
    console.error('Error patching task:', error);
    return c.json({ success: false, message: 'Error patching task' }, 500);
  }
};

export const deleteTaskController = async (c: Context) => {
  const taskId = Number(c.req.param('id'));

  try {
    await TaskServices.deleteTask(taskId); 
    return c.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return c.json({ success: false, message: 'Error deleting task' }, 500);
  }
};

export const getTasksOverview = async (c: Context) => {
  try {
    const user = c.get('user') as { id: number };
    const overview = await TaskServices.getTasksOverview(user.id);
    return c.json(overview);
  } catch (error) {
    console.error('Error fetching task overview:', error);
    return c.json({ error: 'Failed to fetch task overview' }, 500);
  }
};