import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { PrismaClient } from './generated/prisma/index.js';
import UserRoutes from './routes/User.Routes.js';

import taskRoutes from './routes/Task.Routes.js';
import CategoryRoute from './routes/Category.Routes.js';
import SessionRoutes from './routes/PomodoroSession.Route.js';
import PomoTaskRoute from './routes/PomoTask.Route.js';

const app = new Hono()
export const db = new PrismaClient();


app.use('*', cors());
app.use('*', async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`);
  await next();
});
app.route('/api/tasks', taskRoutes);
app.route('/api/users', UserRoutes);
app.route('/api/category', CategoryRoute);
app.route('/api/pomodoroSession', SessionRoutes);
app.route('/api/pomodoroTask', PomoTaskRoute);

db.$connect()
	.then(() => {
		console.log("Connected to the database");
	})
	.catch((error) => {
		console.error("Error connecting to the database:", error);
	});

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
