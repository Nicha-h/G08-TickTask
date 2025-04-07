import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors';
import {db} from './database/db.js';
import * as dotenv from 'dotenv';
import UserRoutes from './routes/User.Routes.js';
const app = new Hono()

app.get('/tasks', async (c) => {
  const [tasks] = await db.query('SELECT * FROM tasks');
  return c.json(tasks);
});

// Add a task
app.post('/tasks', async (c) => {
  const { title, user_id } = await c.req.json();
  await db.query('INSERT INTO tasks (title, user_id) VALUES (?, ?)', [title, user_id]);
  return c.json({ success: true });
});
app.use('*', cors());
app.use('*', async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`);
  await next();
});

app.route('/api', UserRoutes);
serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
