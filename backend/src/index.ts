import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import pool from './database/db.js';
import * as dotenv from 'dotenv';
const app = new Hono()

app.get('/tasks', async (c) => {
  const [tasks] = await pool.query('SELECT * FROM tasks');
  return c.json(tasks);
});

// Add a task
app.post('/tasks', async (c) => {
  const { title, user_id } = await c.req.json();
  await pool.query('INSERT INTO tasks (title, user_id) VALUES (?, ?)', [title, user_id]);
  return c.json({ success: true });
});

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
