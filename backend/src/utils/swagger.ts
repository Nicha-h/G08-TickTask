import type { Context, Next } from "hono";

// Complete OpenAPI spec with all routes manually defined
export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "TickTask API",
    version: "1.0.0",
    description: "API documentation for TickTask backend",
  },
  servers: [{ url: process.env.BACKEND_URL || "http://localhost:3000" }],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          UserID: { type: "number" },
          User_Email: { type: "string" },
        },
      },
      Task: {
        type: "object",
        properties: {
          TaskID: { type: "number" },
          Task_Title: { type: "string" },
          Task_Description: { type: "string" },
          Task_Status: { type: "string", enum: ["Completed", "Incomplete"] },
          Task_Start_Date: { type: "string" },
          Task_End_Date: { type: "string" },
          Task_Start_Time: { type: "string" },
          Task_End_Time: { type: "string" },
          Task_Color: { type: "string" },
        },
      },
      Category: {
        type: "object",
        properties: {
          CategoryId: { type: "number" },
          Category_Name: { type: "string" },
          Category_Color: { type: "string" },
          Category_icon: { type: "string" },
        },
      },
      PomodoroSession: {
        type: "object",
        properties: {
          SessionId: { type: "number" },
          UserID: { type: "number" },
          Status: { type: "string" },
          duration_seconds: { type: "number" },
          remaining_seconds: { type: "number" },
        },
      },
    },
  },
  paths: {
    "/api/users/signup": {
      post: {
        tags: ["Users"],
        summary: "Sign up a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  User_Email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
      },
    },
    "/api/users/login": {
      post: {
        tags: ["Users"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  User_Email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/users/profile": {
      get: {
        tags: ["Users"],
        summary: "Get user profile",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": {
            description: "User profile retrieved",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "401": { description: "Unauthorized" },
        },
      },
      put: {
        tags: ["Users"],
        summary: "Update user profile",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  iconType: { type: "string" },
                  iconPath: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Profile updated" },
          "401": { description: "Unauthorized" },
        },
      },
    },
    "/api/users/check-email": {
      post: {
        tags: ["Users"],
        summary: "Check if email exists",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  User_Email: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Email check result" },
        },
      },
    },
    "/api/users/reset-password": {
      post: {
        tags: ["Users"],
        summary: "Reset user password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Password reset initiated" },
        },
      },
    },
    "/api/tasks": {
      get: {
        tags: ["Tasks"],
        summary: "Get all tasks",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "status",
            in: "query",
            schema: { type: "string", enum: ["Completed", "Incomplete"] },
          },
        ],
        responses: {
          "200": {
            description: "List of tasks",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Task" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Tasks"],
        summary: "Create a new task",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Task" },
            },
          },
        },
        responses: {
          "201": { description: "Task created" },
        },
      },
    },
    "/api/tasks/by-date": {
      get: {
        tags: ["Tasks"],
        summary: "Get tasks by date",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "date",
            in: "query",
            required: true,
            schema: { type: "string", format: "date" },
          },
        ],
        responses: {
          "200": {
            description: "Tasks for the date",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Task" },
                },
              },
            },
          },
        },
      },
    },
    "/api/tasks/overview": {
      get: {
        tags: ["Tasks"],
        summary: "Get tasks overview",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": { description: "Tasks overview" },
        },
      },
    },
    "/api/tasks/{id}": {
      put: {
        tags: ["Tasks"],
        summary: "Update a task",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Task" },
            },
          },
        },
        responses: {
          "200": { description: "Task updated" },
        },
      },
      patch: {
        tags: ["Tasks"],
        summary: "Partially update a task",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Task updated" },
        },
      },
      delete: {
        tags: ["Tasks"],
        summary: "Delete a task",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Task deleted" },
        },
      },
    },
    "/api/category": {
      get: {
        tags: ["Categories"],
        summary: "Get all categories",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": {
            description: "List of categories",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Category" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Categories"],
        summary: "Create a category",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Category" },
            },
          },
        },
        responses: {
          "201": { description: "Category created" },
        },
      },
    },
    "/api/category/{id}": {
      put: {
        tags: ["Categories"],
        summary: "Update a category",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Category updated" },
        },
      },
      patch: {
        tags: ["Categories"],
        summary: "Partially update a category",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Category updated" },
        },
      },
      delete: {
        tags: ["Categories"],
        summary: "Delete a category",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Category deleted" },
        },
      },
    },
    "/api/category/{id}/progress": {
      get: {
        tags: ["Categories"],
        summary: "Get category progress",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Category progress" },
        },
      },
    },
    "/api/category/{id}/assign": {
      put: {
        tags: ["Categories"],
        summary: "Assign task to category",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Task assigned" },
        },
      },
    },
    "/api/category/{id}/count": {
      get: {
        tags: ["Categories"],
        summary: "Get task count in category",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Task count" },
        },
      },
    },
    "/api/category/{id}/tasks": {
      get: {
        tags: ["Categories"],
        summary: "Get tasks in category",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Tasks in category" },
        },
      },
    },
    "/api/pomodoroSession/user/{userId}": {
      get: {
        tags: ["Pomodoro Sessions"],
        summary: "Get all sessions for user",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": {
            description: "List of sessions",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/PomodoroSession" },
                },
              },
            },
          },
        },
      },
    },
    "/api/pomodoroSession": {
      post: {
        tags: ["Pomodoro Sessions"],
        summary: "Create a pomodoro session",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PomodoroSession" },
            },
          },
        },
        responses: {
          "201": { description: "Session created" },
        },
      },
    },
    "/api/pomodoroSession/{id}": {
      get: {
        tags: ["Pomodoro Sessions"],
        summary: "Get session by ID",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Session details" },
        },
      },
      put: {
        tags: ["Pomodoro Sessions"],
        summary: "Update session",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Session updated" },
        },
      },
      delete: {
        tags: ["Pomodoro Sessions"],
        summary: "Delete session",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Session deleted" },
        },
      },
    },
    "/api/pomodoroSession/active/{userId}": {
      get: {
        tags: ["Pomodoro Sessions"],
        summary: "Get active session for user",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Active session" },
        },
      },
    },
    "/api/pomodoroSession/start": {
      post: {
        tags: ["Pomodoro Sessions"],
        summary: "Start a session",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": { description: "Session started" },
        },
      },
    },
    "/api/pomodoroSession/{id}/pause": {
      put: {
        tags: ["Pomodoro Sessions"],
        summary: "Pause session",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Session paused" },
        },
      },
    },
    "/api/pomodoroSession/{id}/resume": {
      put: {
        tags: ["Pomodoro Sessions"],
        summary: "Resume session",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Session resumed" },
        },
      },
    },
    "/api/pomodoroSession/{id}/complete": {
      put: {
        tags: ["Pomodoro Sessions"],
        summary: "Complete session",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Session completed" },
        },
      },
    },
    "/api/pomodoroSession/{id}/time": {
      put: {
        tags: ["Pomodoro Sessions"],
        summary: "Update remaining time",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Time updated" },
        },
      },
    },
    "/api/pomodoroTask": {
      get: {
        tags: ["Pomodoro Tasks"],
        summary: "Get all pomodoro tasks",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": { description: "List of tasks" },
        },
      },
      post: {
        tags: ["Pomodoro Tasks"],
        summary: "Create pomodoro task",
        security: [{ BearerAuth: [] }],
        responses: {
          "201": { description: "Task created" },
        },
      },
    },
    "/api/pomodoroTask/session/{sessionId}": {
      get: {
        tags: ["Pomodoro Tasks"],
        summary: "Get tasks by session",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "sessionId",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Tasks for session" },
        },
      },
    },
    "/api/pomodoroTask/{id}": {
      get: {
        tags: ["Pomodoro Tasks"],
        summary: "Get task by ID",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Task details" },
        },
      },
      put: {
        tags: ["Pomodoro Tasks"],
        summary: "Update task",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Task updated" },
        },
      },
      delete: {
        tags: ["Pomodoro Tasks"],
        summary: "Delete task",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Task deleted" },
        },
      },
    },
    "/api/pomodoroTask/{id}/assign": {
      put: {
        tags: ["Pomodoro Tasks"],
        summary: "Assign task to session",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Task assigned" },
        },
      },
    },
    "/api/pomodoroTask/{id}/complete": {
      put: {
        tags: ["Pomodoro Tasks"],
        summary: "Complete task",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Task completed" },
        },
      },
    },
    "/api/pomodoroTask/{id}/increment": {
      post: {
        tags: ["Pomodoro Tasks"],
        summary: "Increment pomodoro counter",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Counter incremented" },
        },
      },
    },
    "/api/pomodoroTask/{id}/reset": {
      post: {
        tags: ["Pomodoro Tasks"],
        summary: "Reset pomodoro counter",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Counter reset" },
        },
      },
    },
    "/api/pomodoroTask/{id}/target": {
      post: {
        tags: ["Pomodoro Tasks"],
        summary: "Set pomodoro target count",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Target set" },
        },
      },
    },
    "/api/pomodoroTask/{id}/progress": {
      get: {
        tags: ["Pomodoro Tasks"],
        summary: "Get task progress",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Task progress" },
        },
      },
    },
  },
};

// Hono middleware for Swagger UI
export function swaggerUIMiddleware() {
  return async (c: Context, next: Next) => {
    if (c.req.path === "/docs") {
      return c.redirect(
        `https://swagger.io/swagger-ui/?url=${process.env.BACKEND_URL || "http://localhost:3000"}/openapi.json`,
      );
    }
    await next();
  };
}
