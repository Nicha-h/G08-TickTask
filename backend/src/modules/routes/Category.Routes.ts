import { authMiddleware } from '../middlewares/authenticator.js';
import * as CategoryController from '../controllers/Category.controller.js';
import * as Validator from '../../middlewares/Category.validators.js';
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
// CategoryRoute.use('*', authMiddleware);
// CategoryRoute.get('/', CategoryController.getAllCategory);  
// CategoryRoute.post('/',Validator.validateCreateCategory, CategoryController.createCategoryController); 
// CategoryRoute.put('/:id',Validator.validateUpdateCategory, CategoryController.updateCategoryController); 
// CategoryRoute.patch('/:id',Validator.validatePatchCategory, CategoryController.patchCategoryController); 
// CategoryRoute.delete('/:id',Validator.validateCategoryId, CategoryController.deleteCategoryController); 
// CategoryRoute.get('/:id/progress', CategoryController.getCategoryProgress);
// CategoryRoute.put('/:id/assign', CategoryController.assignTaskToCategoryController);
// CategoryRoute.get('/:id/count', CategoryController.getTaskCountController);
// CategoryRoute.get('/:id/tasks', CategoryController.handleGetTasksByCategoryId);
}
export default setupCategoryRoutes;
