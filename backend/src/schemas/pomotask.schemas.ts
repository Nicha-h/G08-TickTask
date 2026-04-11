import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";

export const pomoTaskSchema = z.object({
  Pomo_TaskId: z.number(),
  Pomo_Task_Title: z.string(),
  Pomo_Task_Short: z.number(),
  Pomo_Task_Long: z.number(),
  Pomo_Task_Status: z.boolean(),
  Pomo_Completed_Count: z.number(),
  Pomo_Target_Count: z.number(),
  SessionId: z.number(),
});

export const createPomoTaskSchema = z.object({
  Pomo_Task_Title: z.string().min(1),
  Pomo_Task_Short: z.number().optional(),
  Pomo_Task_Long: z.number().optional(),
  Pomo_Target_Count: z.number().optional(),
  SessionId: z.number(),
});

export const errorResponseSchema = z.object({
  error: z.string(),
});

export const getAllPomoTasksRoute = createRoute({
  method: "get",
  path: "/api/pomodoroTask",
  operationId: "getAllPomoTasks",
  tags: ["Pomodoro Tasks"],
  summary: "Get all pomodoro tasks",
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: "List of tasks",
      content: {
        "application/json": {
          schema: z.array(pomoTaskSchema),
        },
      },
    },
  },
});

export const getTaskBySessionRoute = createRoute({
  method: "get",
  path: "/api/pomodoroTask/session/{sessionId}",
  operationId: "getPomoTasksBySession",
  tags: ["Pomodoro Tasks"],
  summary: "Get tasks by session",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ sessionId: z.string() }),
  },
  responses: {
    200: {
      description: "Tasks for session",
      content: {
        "application/json": {
          schema: z.array(pomoTaskSchema),
        },
      },
    },
  },
});

export const getTaskByIdRoute = createRoute({
  method: "get",
  path: "/api/pomodoroTask/{id}",
  operationId: "getPomoTaskById",
  tags: ["Pomodoro Tasks"],
  summary: "Get task by ID",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Task details",
      content: {
        "application/json": {
          schema: pomoTaskSchema,
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

export const createPomoTaskRoute = createRoute({
  method: "post",
  path: "/api/pomodoroTask",
  operationId: "createPomoTask",
  tags: ["Pomodoro Tasks"],
  summary: "Create pomodoro task",
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createPomoTaskSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Task created",
      content: {
        "application/json": {
          schema: pomoTaskSchema,
        },
      },
    },
  },
});

export const updatePomoTaskRoute = createRoute({
  method: "put",
  path: "/api/pomodoroTask/{id}",
  operationId: "updatePomoTask",
  tags: ["Pomodoro Tasks"],
  summary: "Update task",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: {
        "application/json": {
          schema: createPomoTaskSchema.partial(),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Task updated",
      content: {
        "application/json": {
          schema: pomoTaskSchema,
        },
      },
    },
  },
});

export const deletePomoTaskRoute = createRoute({
  method: "delete",
  path: "/api/pomodoroTask/{id}",
  operationId: "deletePomoTask",
  tags: ["Pomodoro Tasks"],
  summary: "Delete task",
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
  },
});

export const assignTaskToSessionRoute = createRoute({
  method: "put",
  path: "/api/pomodoroTask/{id}/assign",
  operationId: "assignPomoTaskToSession",
  tags: ["Pomodoro Tasks"],
  summary: "Assign task to session",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: {
        "application/json": {
          schema: z.object({ sessionId: z.number() }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Task assigned",
      content: {
        "application/json": {
          schema: pomoTaskSchema,
        },
      },
    },
  },
});

export const completePomoTaskRoute = createRoute({
  method: "put",
  path: "/api/pomodoroTask/{id}/complete",
  operationId: "completePomoTask",
  tags: ["Pomodoro Tasks"],
  summary: "Complete task",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Task completed",
      content: {
        "application/json": {
          schema: pomoTaskSchema,
        },
      },
    },
  },
});

export const incrementPomoCounterRoute = createRoute({
  method: "post",
  path: "/api/pomodoroTask/{id}/increment",
  operationId: "incrementPomoCounter",
  tags: ["Pomodoro Tasks"],
  summary: "Increment pomodoro counter",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Counter incremented",
      content: {
        "application/json": {
          schema: pomoTaskSchema,
        },
      },
    },
  },
});

export const resetPomoCounterRoute = createRoute({
  method: "post",
  path: "/api/pomodoroTask/{id}/reset",
  operationId: "resetPomoCounter",
  tags: ["Pomodoro Tasks"],
  summary: "Reset pomodoro counter",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Counter reset",
      content: {
        "application/json": {
          schema: pomoTaskSchema,
        },
      },
    },
  },
});

export const setPomoTargetCountRoute = createRoute({
  method: "post",
  path: "/api/pomodoroTask/{id}/target",
  operationId: "setPomoTargetCount",
  tags: ["Pomodoro Tasks"],
  summary: "Set pomodoro target count",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: {
        "application/json": {
          schema: z.object({ targetCount: z.number() }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Target set",
      content: {
        "application/json": {
          schema: pomoTaskSchema,
        },
      },
    },
  },
});

export const getTaskProgressRoute = createRoute({
  method: "get",
  path: "/api/pomodoroTask/{id}/progress",
  operationId: "getPomoTaskProgress",
  tags: ["Pomodoro Tasks"],
  summary: "Get task progress",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Task progress",
      content: {
        "application/json": {
          schema: z.object({
            completed: z.number(),
            target: z.number(),
          }),
        },
      },
    },
  },
});
