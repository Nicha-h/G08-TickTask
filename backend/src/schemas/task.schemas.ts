import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";

export const taskSchema = z.object({
  TaskID: z.number(),
  Task_Title: z.string(),
  Task_Description: z.string().nullable(),
  Task_Status: z.enum(["Completed", "Incomplete"]),
  Task_Start_Date: z.string(),
  Task_End_Date: z.string(),
  Task_Start_Time: z.string(),
  Task_End_Time: z.string(),
  Task_Color: z.string(),
  Task_Icon: z.string().nullable(),
  UserID: z.number(),
});

export const createTaskSchema = z.object({
  Task_Title: z.string().min(1),
  Task_Description: z.string().nullable().optional(),
  Task_Start_Date: z.string().optional(),
  Task_End_Date: z.string().optional(),
  Task_Status: z.enum(["Completed", "Incomplete"]).optional(),
  Task_Color: z.string().optional(),
  Task_Icon: z.string().nullable().optional(),
  Task_Start_Time: z.string().optional(),
  Task_End_Time: z.string().optional(),
});

export const errorResponseSchema = z.object({
  error: z.string(),
});

export const getTasksRoute = createRoute({
  method: "get",
  path: "/api/tasks",
  operationId: "getTasks",
  tags: ["Tasks"],
  summary: "Get all tasks",
  security: [{ BearerAuth: [] }],
  request: {
    query: z.object({
      status: z.enum(["Completed", "Incomplete"]).optional(),
    }),
  },
  responses: {
    200: {
      description: "List of tasks",
      content: {
        "application/json": {
          schema: z.array(taskSchema),
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

export const getTasksByDateRoute = createRoute({
  method: "get",
  path: "/api/tasks/by-date",
  operationId: "getTasksByDate",
  tags: ["Tasks"],
  summary: "Get tasks by date",
  security: [{ BearerAuth: [] }],
  request: {
    query: z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    }),
  },
  responses: {
    200: {
      description: "Tasks for the date",
      content: {
        "application/json": {
          schema: z.array(taskSchema),
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

export const createTaskRoute = createRoute({
  method: "post",
  path: "/api/tasks",
  operationId: "createTask",
  tags: ["Tasks"],
  summary: "Create a new task",
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createTaskSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Task created",
      content: {
        "application/json": {
          schema: taskSchema,
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

export const updateTaskRoute = createRoute({
  method: "put",
  path: "/api/tasks/:id",
  operationId: "updateTask",
  tags: ["Tasks"],
  summary: "Update a task",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: {
        "application/json": {
          schema: createTaskSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Task updated",
      content: {
        "application/json": {
          schema: taskSchema,
        },
      },
    },
    404: {
      description: "Task not found",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

export const patchTaskRoute = createRoute({
  method: "patch",
  path: "/api/tasks/:id",
  operationId: "patchTask",
  tags: ["Tasks"],
  summary: "Partially update a task",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: {
        "application/json": {
          schema: createTaskSchema.partial(),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Task updated",
      content: {
        "application/json": {
          schema: taskSchema,
        },
      },
    },
    404: {
      description: "Task not found",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

export const deleteTaskRoute = createRoute({
  method: "delete",
  path: "/api/tasks/:id",
  operationId: "deleteTask",
  tags: ["Tasks"],
  summary: "Delete a task",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Task deleted",
      content: {
        "application/json": {
          schema: z.object({ success: z.boolean() }),
        },
      },
    },
    404: {
      description: "Task not found",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

export const getTasksOverviewRoute = createRoute({
  method: "get",
  path: "/api/tasks/overview",
  operationId: "getTasksOverview",
  tags: ["Tasks"],
  summary: "Get tasks overview",
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: "Tasks overview",
      content: {
        "application/json": {
          schema: z.object({
            total: z.number(),
            completed: z.number(),
            incomplete: z.number(),
          }),
        },
      },
    },
  },
});
