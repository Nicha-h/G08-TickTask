import { Hono } from 'hono';
import * as UserController from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/authenticator.js';

const UserRoutes = new Hono();


UserRoutes.get('/profile', authMiddleware, UserController.fetchProfileController);
UserRoutes.post('/signup', UserController.createUserController); 
UserRoutes.post('/login', UserController.loginUserController);
UserRoutes.put('/profile', authMiddleware, UserController.updateProfileController);

export default UserRoutes;