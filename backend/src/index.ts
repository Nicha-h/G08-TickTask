import { serve } from '@hono/node-server'
import { cors } from 'hono/cors';
import { PrismaClient } from './generated/prisma/index.js';
import UserRoutes from './modules/routes/User.Routes.js';
import config from './config/env.js';
import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { setupRoutes } from './routes/index.js';
import 'dotenv/config'; 
import { errorHandler } from './modules/middlewares/error.js';
const app = new OpenAPIHono();
export const db = new PrismaClient();
app.onError(errorHandler);

app.use(
  cors({
    origin: (origin) => {
      if (config.isProduction) {
        // return 'https://smartcity.sit.kmutt.ac.th';
      }
      return origin || 'http://localhost:5173';
    },
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS']	,
    credentials: true,
  })
);

app.notFound((c) => {
  return c.json(
    {
      error: 'API Endpoint not found',
      status: 404,
      message: 'The resource you are looking for does not exist.',
    },
    404
  );
});

db.$connect()
	.then(() => {
		console.log("Connected to the database");
	})
	.catch((error) => {
		console.error("Error connecting to the database:", error);
	});

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
