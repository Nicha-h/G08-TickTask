import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/authenticator.js';
import * as CategoryController from '../controllers/Category.controller.js';
import * as Validator from '../middlewares/Category.validators.js';

const CategoryRoute = new Hono();

CategoryRoute.use('*', authMiddleware);

CategoryRoute.get('/', CategoryController.getAllCategory);  
CategoryRoute.post('/',Validator.validateCreateCategory, CategoryController.createCategoryController); 
CategoryRoute.put('/:id',Validator.validateUpdateCategory, CategoryController.updateCategoryController); 
CategoryRoute.patch('/:id',Validator.validatePatchCategory, CategoryController.patchCategoryController); 
CategoryRoute.delete('/:id',Validator.validateCategoryId, CategoryController.deleteCategoryController); 
CategoryRoute.get('/:id/progress', CategoryController.getCategoryProgress);
CategoryRoute.put('/:id/assign', CategoryController.assignTaskToCategoryController);
CategoryRoute.get('/:id/count', CategoryController.getTaskCountController)
export default CategoryRoute;
