import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/authenticator.js';
import * as TaskController from '../controllers/task.controller.js';


const TaskRoute = new Hono();

TaskRoute.use('*', authMiddleware);

TaskRoute.get('/', TaskController.getAllTasks); 
TaskRoute.get('/by-date', TaskController.getTasksByDate); 
TaskRoute.post('/', TaskController.createTaskController); 
TaskRoute.put('/:id', TaskController.updateTaskController); 
TaskRoute.delete('/:id', TaskController.deleteTaskController); 

export default TaskRoute;
