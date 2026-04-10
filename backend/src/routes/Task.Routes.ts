import type { OpenAPIHono } from "@hono/zod-openapi";
import * as TaskSchemas from "../schemas/task.schemas.js";
import * as TaskController from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/authenticator.js";

export function setupTaskRoutes(app: OpenAPIHono) {
  app.use("/api/tasks", authMiddleware);
  app.use("/api/tasks/*", authMiddleware);

  app.openapi(TaskSchemas.getTasksRoute, TaskController.getAllTasks as any);
  app.openapi(
    TaskSchemas.getTasksByDateRoute,
    TaskController.getTasksByDate as any,
  );
  app.openapi(
    TaskSchemas.createTaskRoute,
    TaskController.createTaskController as any,
  );
  app.openapi(
    TaskSchemas.updateTaskRoute,
    TaskController.updateTaskController as any,
  );
  app.openapi(
    TaskSchemas.patchTaskRoute,
    TaskController.patchTaskController as any,
  );
  app.openapi(
    TaskSchemas.deleteTaskRoute,
    TaskController.deleteTaskController as any,
  );
  app.openapi(
    TaskSchemas.getTasksOverviewRoute,
    TaskController.getTasksOverview as any,
  );
}
