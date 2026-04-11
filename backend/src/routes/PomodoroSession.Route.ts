import type { OpenAPIHono } from "@hono/zod-openapi";
import * as PomodoroSchemas from "../schemas/pomodoro.schemas.js";
import * as SessionController from "../controllers/PomoSession.controller.js";
import { authMiddleware } from "../middlewares/authenticator.js";

export function setupPomodoroSessionRoutes(app: OpenAPIHono) {
  app.use("/api/pomodoroSession", authMiddleware);
  app.use("/api/pomodoroSession/*", authMiddleware);

  // GET routes
  app.openapi(
    PomodoroSchemas.getSessionsRoute,
    SessionController.getAllSession as any,
  );
  app.openapi(
    PomodoroSchemas.getSessionByIdRoute,
    SessionController.getPomoSessionbyId as any,
  );
  app.openapi(
    PomodoroSchemas.getActiveSessionRoute,
    SessionController.getActiveSessionController as any,
  );

  // POST routes
  app.openapi(
    PomodoroSchemas.startSessionRoute,
    SessionController.startSession as any,
  );
  app.openapi(
    PomodoroSchemas.createSessionRoute,
    SessionController.createSessionController as any,
  );

  // PUT routes
  app.openapi(
    PomodoroSchemas.updateSessionRoute,
    SessionController.updatedSessionController as any,
  );
  app.openapi(
    PomodoroSchemas.pauseSessionRoute,
    SessionController.pauseSession as any,
  );
  app.openapi(
    PomodoroSchemas.resumeSessionRoute,
    SessionController.resumeSession as any,
  );
  app.openapi(
    PomodoroSchemas.completeSessionRoute,
    SessionController.completeSession as any,
  );
  app.openapi(
    PomodoroSchemas.updateRemainingTimeRoute,
    SessionController.updateRemainingTime as any,
  );

  // DELETE routes
  app.openapi(
    PomodoroSchemas.deleteSessionRoute,
    SessionController.deleteSessionController as any,
  );
}
