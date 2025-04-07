import type { Context } from 'hono';
import { db } from '../database/db.js';

export const getAllTasks = async (c:Context) => {
    try {
        const [tasks] = await db.query('SELECT * FROM task');
        return c.json(tasks, 200);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        return c.json({ error: 'Internal server error' }, 500);
      }
};

