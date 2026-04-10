import type { OpenAPIHono } from '@hono/zod-openapi';
import {TaskController} from '../controllers/index.js';
import { TaskSchemas } from '../schemas/index.js';

const setupTaskRoutes = (app: OpenAPIHono) => {
  app.openapi(
    TaskSchemas.getAllTasksRoute,
    TaskController.getAllTasks
  );
  app.openapi(
    TaskSchemas.getTasksByDateRoute,
    TaskController.getTasksByDate
  );
  app.openapi(
    TaskSchemas.createTaskRoute,
    TaskController.createTaskController
  );
  app.openapi(
    TaskSchemas.updateTaskRoute,
    TaskController.updateTaskController
  );
  app.openapi(
    TaskSchemas.deleteTaskRoute,
    TaskController.deleteTaskController
  );
  app.openapi(
    TaskSchemas.getTaskOverviewRoute,
    TaskController.getTasksOverview
  );
}
export default setupTaskRoutes;
