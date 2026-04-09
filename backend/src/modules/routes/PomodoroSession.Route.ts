import { Hono } from 'hono';
import * as SessionController from '../controllers/PomoSession.controller.js';
import { authMiddleware } from '../middlewares/authenticator.js';

const SessionRoutes = new Hono();
SessionRoutes.use('*', authMiddleware);
SessionRoutes.get('/user/:userId', SessionController.getAllSession);
SessionRoutes.get('/:id', SessionController.getPomoSessionbyId);
SessionRoutes.post('/', SessionController.createSessionController);
SessionRoutes.put('/:id', SessionController.updatedSessionController);
SessionRoutes.delete('/:id', SessionController.deleteSessionController);
SessionRoutes.get('/active/:userId', SessionController.getActiveSessionController);
SessionRoutes.post('/start', SessionController.startSession);
SessionRoutes.put('/:id/pause', SessionController.pauseSession);
SessionRoutes.put('/:id/resume', SessionController.resumeSession);
SessionRoutes.put('/:id/complete', SessionController.completeSession);
SessionRoutes.put('/:id/time', SessionController.updateRemainingTime);

export default SessionRoutes;