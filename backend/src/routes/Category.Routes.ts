import type { OpenAPIHono } from "@hono/zod-openapi";
import * as CategorySchemas from "../schemas/category.schemas.js";
import * as CategoryController from "../controllers/Category.controller.js";
import { authMiddleware } from "../middlewares/authenticator.js";

export function setupCategoryRoutes(app: OpenAPIHono) {
  app.use("/api/category", authMiddleware);
  app.use("/api/category/*", authMiddleware);

  app.openapi(
    CategorySchemas.getCategoriesRoute,
    CategoryController.getAllCategory as any,
  );
  app.openapi(
    CategorySchemas.createCategoryRoute,
    CategoryController.createCategoryController as any,
  );
  app.openapi(
    CategorySchemas.updateCategoryRoute,
    CategoryController.updateCategoryController as any,
  );
  app.openapi(
    CategorySchemas.patchCategoryRoute,
    CategoryController.patchCategoryController as any,
  );
  app.openapi(
    CategorySchemas.deleteCategoryRoute,
    CategoryController.deleteCategoryController as any,
  );
  app.openapi(
    CategorySchemas.getCategoryProgressRoute,
    CategoryController.getCategoryProgress as any,
  );
  app.openapi(
    CategorySchemas.assignTaskToCategoryRoute,
    CategoryController.assignTaskToCategoryController as any,
  );
  app.openapi(
    CategorySchemas.getTaskCountRoute,
    CategoryController.getTaskCountController as any,
  );
  app.openapi(
    CategorySchemas.getTasksByCategoryRoute,
    CategoryController.handleGetTasksByCategoryId as any,
  );
}
