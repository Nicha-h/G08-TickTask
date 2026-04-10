import type { OpenAPIHono } from '@hono/zod-openapi';
import setupUserRoutes from '../modules/routes/User.Routes.js';
import setupCategoryRoutes from '../modules/routes/Category.Routes.js';
import setupTaskRoutes from '../modules/routes/Task.Routes.js';
import setupPomodoroSessionRoutes from '../modules/routes/PomodoroSession.Route.js';
import setupPomoTaskRoutes from '../modules/routes/PomoTask.Route.js';

export const setupRoutes = (app: OpenAPIHono) => {
  setupUserRoutes(app);
  setupCategoryRoutes(app);
  setupTaskRoutes(app);
  setupPomodoroSessionRoutes(app);
  setupPomoTaskRoutes(app);
};