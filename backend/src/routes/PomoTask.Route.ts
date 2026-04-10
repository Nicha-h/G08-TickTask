import type { OpenAPIHono } from '@hono/zod-openapi';
import * as PomoTaskSchemas from '../schemas/pomotask.schemas.js';
import * as TaskController from '../controllers/PomoTask.controller.js';
import { authMiddleware } from '../middlewares/authenticator.js';

export function setupPomoTaskRoutes(app: OpenAPIHono) {
  app.use('/api/pomodoroTask', authMiddleware);
  app.use('/api/pomodoroTask/*', authMiddleware);

  // GET routes
  app.openapi(PomoTaskSchemas.getAllPomoTasksRoute, TaskController.getAllTask as any);
  app.openapi(PomoTaskSchemas.getTaskBySessionRoute, TaskController.getTaskBySession as any);
  app.openapi(PomoTaskSchemas.getTaskByIdRoute, TaskController.getTaskById as any);
  app.openapi(PomoTaskSchemas.getTaskProgressRoute, TaskController.getTaskProgress as any);

  // POST routes
  app.openapi(PomoTaskSchemas.createPomoTaskRoute, TaskController.CreatePomoTaskController as any);
  app.openapi(PomoTaskSchemas.incrementPomoCounterRoute, TaskController.incrementPomoCounter as any);
  app.openapi(PomoTaskSchemas.resetPomoCounterRoute, TaskController.resetPomoCounter as any);
  app.openapi(PomoTaskSchemas.setPomoTargetCountRoute, TaskController.setPomoTargetCount as any);

  // PUT routes
  app.openapi(PomoTaskSchemas.updatePomoTaskRoute, TaskController.updatePomoTaskController as any);
  app.openapi(PomoTaskSchemas.assignTaskToSessionRoute, TaskController.assignTaskToSession as any);
  app.openapi(PomoTaskSchemas.completePomoTaskRoute, TaskController.completePomoTask as any);

  // DELETE routes
  app.openapi(PomoTaskSchemas.deletePomoTaskRoute, TaskController.deletePomoTaskController as any);
}
