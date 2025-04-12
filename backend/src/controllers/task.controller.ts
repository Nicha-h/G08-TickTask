import type { Context } from 'hono';
import { db } from '../database/db.js';
import { z } from 'zod';
import { createTask } from '../models/Task.model.js';
import type { CustomContext } from '../types/index.js';

const taskSchema = z.object({
  Task_Title: z.string().min(1, "Title is required"),
  Task_Description: z.string().nullable().optional(),
  Task_Start_Date: z.string().optional(),
  Task_End_Date: z.string().optional(),
  Task_Status: z.enum(['Incomplete', 'Complete']).optional(),
  Task_Color: z.string().optional(),
  Task_Icon: z.string().nullable().optional(),
  Task_Start_Time: z.string().optional(),
  Task_End_Time: z.string().optional(),
});


export const getAllTasks = async (c: Context) => {
  try {
    const user = c.get('user') as { id: number };
    const userId = user.id;

    const status = c.req.query('status');

    let query = 'SELECT * FROM task WHERE UserID = ?';
    const params: any[] = [userId];

    if (status) {
      query += ' AND Task_Status = ?';
      params.push(status);
    }

    const [tasks] = await db.query(query, params);
    return c.json(tasks);

  } catch (error) {
    console.error('Error fetching tasks:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};


export const getTasksByDate = async (c: Context) => {
  const date = c.req.query('date');

  if (!date) {
    return c.json({ error: 'Date parameter is required' }, 400);
  }

  try {
    const user = c.get('user') as { id: number };
    const userId = user.id;

    const [tasks] = await db.query(
      'SELECT * FROM task WHERE DATE(Task_Start_Date) = ? AND UserID = ?',
      [date, userId]
    );

    return c.json(tasks);
  } catch (err) {
    return c.json({ error: 'Error fetching tasks' }, 500);
  }
};

export const createTaskController = async (c: Context) => {
  try {
    const body = await c.req.json();
    const parsed = taskSchema.safeParse(body);
    
    if (!parsed.success) {
      return c.json({ error: parsed.error.format() }, 400);
    }


    const user = c.get('user') as { id: number };
    
   
    const task = await createTask({
      ...parsed.data,
      UserID: user.id,
    });

    return c.json(task, 201);
  } catch (error) {
    console.error('Error creating task:', error);
    return c.json({ error: 'Error creating task' }, 500);
  }
};

export const updateTaskController = async (c: Context) => {
  const taskId = Number(c.req.param('id'));
  const body = await c.req.json();
  const parsed = taskSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.format() }, 400);
  }

  const user = c.get('user') as { id: number };

  const [rows] = await db.query('SELECT * FROM task WHERE TaskID = ? AND UserID = ?', [taskId, user.id]);
  if ((rows as any[]).length === 0) {
    return c.json({ error: 'Task not found' }, 404);
  }

  await db.query('UPDATE task SET ? WHERE TaskID = ?', [body, taskId]);
  return c.json({ message: 'Task updated successfully' });
};

export const deleteTaskController = async (c: Context) => {
  const taskId = Number(c.req.param('id'));
  const user = c.get('user') as { id: number };

  const [rows] = await db.query('SELECT * FROM task WHERE TaskID = ? AND UserID = ?', [taskId, user.id]);
  if ((rows as any[]).length === 0) {
    return c.json({ error: 'Task not found' }, 404);
  }

  await db.query('DELETE FROM task WHERE TaskID = ?', [taskId]);
  return c.json({ message: 'Task deleted successfully' });
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
