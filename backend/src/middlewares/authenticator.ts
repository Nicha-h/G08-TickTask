import type { Context, MiddlewareHandler } from 'hono';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

interface CustomContext extends Context {
  user: { id: number; email: string };  // Type of user object
}

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string };
    c.set('user', decoded); // Attach the user to the context
    await next(); // Proceed to the next handler
  } catch (err) {
    return c.json({ error: 'Invalid or expired token' }, 403);
  }
};
