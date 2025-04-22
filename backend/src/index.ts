import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors';
import {db} from './database/db.js';
import * as dotenv from 'dotenv';
import UserRoutes from './routes/User.Routes.js';

import taskRoutes from './routes/Task.Routes.js';
import CategoryRoute from './routes/Category.Routes.js';
import SessionRoutes from './routes/PomodoroSession.Route.js';
import PomoTaskRoute from './routes/PomoTask.Route.js';

const app = new Hono()

app.use('*', cors());
app.use('*', async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`);
  await next();
});
app.route('/api/tasks', taskRoutes);
app.route('/api/users', UserRoutes);
app.route('/api/categories', CategoryRoute);
app.route('/api/pomodoroSession', SessionRoutes);
app.route('/api/pomodoroTask', PomoTaskRoute);
serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
