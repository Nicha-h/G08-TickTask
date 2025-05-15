import { Hono } from 'hono';
import * as UserController from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/authenticator.js';

const UserRoutes = new Hono();


UserRoutes.get('/profile', authMiddleware, UserController.fetchProfileController);
UserRoutes.post('/signup', UserController.createUserController); 
UserRoutes.post('/login', UserController.loginUserController);
UserRoutes.put('/profile', authMiddleware, UserController.updateProfileController);
UserRoutes.post('/check-email', UserController.checkEmailController);
UserRoutes.post('/reset-password', UserController.resetPasswordController);

export default UserRoutes;