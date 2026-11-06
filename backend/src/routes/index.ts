import type { OpenAPIHono } from '@hono/zod-openapi';
import { setupUserRoutes } from './User.Routes.js';
import { setupTaskRoutes } from './Task.Routes.js';
import { setupCategoryRoutes } from './Category.Routes.js';
import { setupPomodoroSessionRoutes } from './PomodoroSession.Route.js';
import { setupPomoTaskRoutes } from './PomoTask.Route.js';
import { setupLiveRoutes } from './Live.Routes.js';

export const setupRoutes = (app: OpenAPIHono) => {
  // User routes
  setupUserRoutes(app);

  // Task routes
  setupTaskRoutes(app);

  // Category routes
  setupCategoryRoutes(app);

  // Pomodoro routes
  setupPomodoroSessionRoutes(app);
  setupPomoTaskRoutes(app);

  // Realtime live queries
  setupLiveRoutes(app);
};
