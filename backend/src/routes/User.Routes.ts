import type { OpenAPIHono } from "@hono/zod-openapi";
import * as UserSchemas from "../schemas/user.schemas.js";
import * as UserController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authenticator.js";

export function setupUserRoutes(app: OpenAPIHono) {
  // Auth middleware only on profile routes
  app.use("/api/users/profile", authMiddleware);
  app.use("/api/users/profile/*", authMiddleware);

  // Sign-up, login and password reset are handled by Neon Auth

  // Protected routes
  app.openapi(
    UserSchemas.getProfileRoute,
    UserController.fetchProfileController as any,
  );
  app.openapi(
    UserSchemas.updateProfileRoute,
    UserController.updateProfileController as any,
  );
  app.openapi(
    UserSchemas.uploadProfilePicRoute,
    UserController.uploadProfilePicController as any,
  );
}
