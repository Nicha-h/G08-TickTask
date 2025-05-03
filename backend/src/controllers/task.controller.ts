import type { Context } from 'hono';
import { z } from 'zod';
import * as TaskModel from '../models/Task.model.js';
import { PrismaClient } from '../generated/prisma/index.js';
import { TaskSchema } from '../middlewares/Task.validators.js';

const prisma = new PrismaClient();

export const getAllTasks = async (c: Context) => {
  try {
    const user = c.get('user') as { id: number };
    const categories = await TaskModel.getTasksByUser(user.id);
    return c.json(categories);
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
    const categories = await TaskModel.getTasksByDate(date);
    return c.json(categories);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return c.json({ error: 'Failed to fetch tasks' }, 500);
  }
};

export const createTaskController = async (c: Context) => {
  try {
    const taskData = c.get('taskData');
    const user = c.get('user') as { id: number };

    const task = await TaskModel.createTask({
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
    const user = c.get('user') as { id: number };
    const result = await TaskModel.updateTask(c); 
    return c.json({ success: true, data: result, message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    return c.json({ success: false, message: 'Task not found or update failed' }, 500);
  }
};

export const patchTaskController = async (c: Context) => {
  try {
    const result = await TaskModel.patchTask(c);
    return c.json({ success: true, data: result, message: 'Task patched successfully' });
  } catch (error) {
    console.error('Error patching task:', error);
    return c.json({ success: false, message: 'Error patching task' }, 500);
  }
};

export const deleteTaskController = async (c: Context) => {
  const taskId = Number(c.req.param('id'));

  try {
    await TaskModel.deleteTask(c); 
    return c.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return c.json({ success: false, message: 'Error deleting task' }, 500);
  }
};
