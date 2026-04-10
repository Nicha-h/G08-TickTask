import {CategoryController} from '../controllers/index.js';
import type { OpenAPIHono } from '@hono/zod-openapi';
import { CategorySchemas } from '../schemas/index.js';
const setupCategoryRoutes = (app: OpenAPIHono) => {
    app.openapi(
        CategorySchemas.getAllCategoryRoute,
        CategoryController.getAllCategory
    );
    app.openapi(
        CategorySchemas.getTaskByCategoriesRoute,
        CategoryController.handleGetTasksByCategoryId
    );
    app.openapi(
        CategorySchemas.assignTaskToCategoryRoute,
        CategoryController.assignTaskToCategoryController
    );
    app.openapi(
        CategorySchemas.createCategoryRoute,
        CategoryController.createCategoryController
    );
    app.openapi(
        CategorySchemas.updateCategoryRoute,
        CategoryController.updateCategoryController
    );
    app.openapi(
        CategorySchemas.deleteCategoryRoute,
        CategoryController.deleteCategoryController
    );
    app.openapi(
        CategorySchemas.getCategoryProgressRoute,
        CategoryController.getCategoryProgress
    );
    app.openapi(
        CategorySchemas.getTaskCountByCategoryRoute,
        CategoryController.getTaskCountController
    )
    app.openapi(
        CategorySchemas.removeTaskFromCategoryRoute,
        CategoryController.removeTaskFromCategoryController
    );
}
export default setupCategoryRoutes;
