import { Hono } from 'hono';
import * as TaskController from '../controllers/PomoTask.controller.js';
import { authMiddleware } from '../middlewares/authenticator.js';

const PomotaskRoutes = new Hono();

PomotaskRoutes.use('*', authMiddleware);

PomotaskRoutes.get('/', TaskController.getAllTask);
PomotaskRoutes.get('/session/:sessionId', TaskController.getTaskBySession);
PomotaskRoutes.get('/:id', TaskController.getTaskById);
PomotaskRoutes.post('/', TaskController.createPomoTaskController);
PomotaskRoutes.put('/:id', TaskController.updatePomoTaskController);
PomotaskRoutes.delete('/:id', TaskController.deletePomoTaskController);
PomotaskRoutes.put('/:id/assign', TaskController.assignTaskToSession);
PomotaskRoutes.put('/:id/complete', TaskController.completePomoTask);

export default PomotaskRoutes;