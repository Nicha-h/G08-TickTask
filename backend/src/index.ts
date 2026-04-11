import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";
import { PrismaClient } from "./generated/prisma/index.js";
import { setupRoutes } from "./routes/index.js";
import { BACKEND_URL, FRONTEND_URL, PORT } from "./utils/env.js";
import type { Context } from "hono";

// ━━━ Create OpenAPIHono app ━━━
const app = new OpenAPIHono();
export const db = new PrismaClient();

// ━━━ Middleware ━━━
app.use(
  "*",
  cors({
    origin: (origin) => {
      return origin || FRONTEND_URL;
    },
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  }),
);

app.use("*", async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`);
  await next();
});

// ━━━ Health check ━━━
app.get("/", (c) => {
  return c.json({
    name: "TickTask API",
    version: "1.0.0",
    status: "healthy",
    timestamp: new Date().toISOString(),
    docs: "/swagger",
  });
});

// ━━━ Register all routes ━━━
setupRoutes(app);

// ━━━ Register security scheme ━━━
app.openAPIRegistry.registerComponent("securitySchemes", "BearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

// ━━━ OpenAPI spec endpoint (raw JSON) ━━━
app.get("/doc", (c: Context) => {
  const doc = app.getOpenAPIDocument({
    openapi: "3.0.0",
    info: {
      title: "TickTask Pomodoro API",
      version: "1.0.0",
      description:
        "API for the TickTask Pomodoro app — manage sessions, tasks, timers, and progress tracking.",
    },
    servers: [
      {
        url: BACKEND_URL,
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Local development server",
      },
    ],
  });
  return c.json(doc);
});

// ━━━ Swagger UI ━━━
app.get("/swagger", swaggerUI({ url: "/doc" }));

// ━━━ 404 handler ━━━
app.notFound((c) => {
  return c.json(
    {
      error: "API Endpoint not found",
      status: 404,
      message: "The resource you are looking for does not exist.",
    },
    404,
  );
});

// ━━━ Database + Server ━━━
db.$connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  (info) => {
    console.log(`Server is running on ${BACKEND_URL}`);
    console.log(`Swagger UI on ${BACKEND_URL}/swagger`);
    console.log(`OpenAPI spec on ${BACKEND_URL}/doc`);
  },
);
