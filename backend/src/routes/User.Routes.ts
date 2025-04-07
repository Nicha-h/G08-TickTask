import { Hono } from 'hono';
import * as UserController from '../controllers/user.controller.js';

const UserRoutes = new Hono();

UserRoutes.post('/signup', UserController.createUserController); 
UserRoutes.post('/login', UserController.loginUserController);
export default UserRoutes;