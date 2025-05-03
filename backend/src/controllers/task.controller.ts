import type { Context } from 'hono';
import { db } from '../index.js';
import { z } from 'zod';
import * as TaskModel from '../models/Task.model.js';
import type { CustomContext, TaskStatus } from '../types/index.js';
import { TaskSchema } from '../middlewares/Task.validators.js';

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
      UserID: user.id,
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

  const user = c.get('user') as { id: number };

  const [rows] = await db.query('SELECT * FROM task WHERE TaskID = ? AND UserID = ?', [taskId, user.id]);
  if ((rows as any[]).length === 0) {
    return c.json({ success: false, message: 'Task not found' }, 404);
  }

  await db.query('UPDATE task SET ? WHERE TaskID = ?', [body, taskId]);
  return c.json({ message: 'Task updated successfully' });
};

export const patchTaskController = async (c: Context) => {
  const taskId = c.get('taskId');
  const taskData = c.get('taskData');
  const user = c.get('user') as { id: number };

  try {
    const [rows] = await db.query('SELECT * FROM task WHERE TaskID = ? AND UserID = ?', [taskId, user.id]);
    if ((rows as any[]).length === 0) {
      return c.json({ success: false, message: 'Task not found' }, 404);
    }

    await db.query('UPDATE task SET ? WHERE TaskID = ?', [taskData, taskId]);
    return c.json({ success: true, message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    return c.json({ success: false, message: 'Error updating task' }, 500);
  }
};
export const deleteTaskController = async (c: Context) => {
  const taskId = Number(c.req.param('id'));
  try {
    const taskData = c.get('taskData');
    const user = c.get('user') as { id: number };
    
    const task = await TaskModel.deleteTask({
      ...taskData,
      UserID: user.id,
    });

    return c.json({ success: true, data: task }, 201);
  } catch (error) {
    console.error('Error deleting task:', error);
    return c.json({ success: false, message: 'Error deleting task' }, 500);
  }
};

export const toggleTaskStatus = async (c: Context) => {
  const taskId = c.req.param('id');
  const user = c.get('user') as { id: number };
  const userId = user.id;

  try {
    const [rows] = await db.query(
      'SELECT * FROM task WHERE TaskID = ? AND UserID = ?',
      [taskId, userId]
    );

    const task = (rows as any[])[0];
    if (!task) {
      return c.json({ error: 'Task not found or unauthorized' }, 404);
    }

    const newStatus = task.Task_Status === 'Completed' ? 'Incomplete' : 'Completed';

    await db.query(
      'UPDATE task SET Task_Status = ? WHERE TaskID = ?',
      [newStatus, taskId]
    );

    return c.json({ message: 'Task status updated', newStatus });

  } catch (err) {
    console.error('Error toggling task status:', err);
    return c.json({ error: 'Internal server error' }, 500);
  }
};
