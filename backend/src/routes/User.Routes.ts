import type { OpenAPIHono } from "@hono/zod-openapi";
import * as UserSchemas from "../schemas/user.schemas.js";
import * as UserController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authenticator.js";

export function setupUserRoutes(app: OpenAPIHono) {
  // Auth middleware only on profile routes
  app.use("/api/users/profile", authMiddleware);
  app.use("/api/users/profile/*", authMiddleware);

  // Public routes
  app.openapi(
    UserSchemas.signupRoute,
    UserController.createUserController as any,
  );
  app.openapi(
    UserSchemas.loginRoute,
    UserController.loginUserController as any,
  );
  app.openapi(
    UserSchemas.checkEmailRoute,
    UserController.checkEmailController as any,
  );
  app.openapi(
    UserSchemas.resetPasswordRoute,
    UserController.resetPasswordController as any,
  );

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
