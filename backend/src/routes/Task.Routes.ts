import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/authenticator.js';
import * as TaskController from '../controllers/task.controller.js';
import * as Validator from '../middlewares/Task.validators.js';

const TaskRoute = new Hono();

TaskRoute.use('*', authMiddleware);

TaskRoute.get('/',Validator.validateStatusParam, TaskController.getAllTasks); 
TaskRoute.get('/by-date',Validator.validateDateParam, TaskController.getTasksByDate); 
TaskRoute.post('/',Validator.validateCreateTask, TaskController.createTaskController); 
TaskRoute.put('/:id',Validator.validateUpdateTask, TaskController.updateTaskController);
TaskRoute.patch('/:id',TaskController.patchTaskController);
TaskRoute.delete('/:id', TaskController.deleteTaskController); 
TaskRoute.get('/overview', TaskController.getTasksOverview); 
export default TaskRoute;
