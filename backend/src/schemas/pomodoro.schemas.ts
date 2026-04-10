import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";

export const sessionSchema = z.object({
  SessionId: z.number(),
  UserID: z.number(),
  Status: z.string(),
  StartTime: z.string(),
  EndTime: z.string().nullable(),
  PausedTime: z.string().nullable(),
  duration_seconds: z.number(),
  remaining_seconds: z.number(),
  timer_type: z.string(),
  last_updated: z.string(),
});

export const createSessionSchema = z.object({
  duration_seconds: z.number().optional(),
  timer_type: z.string().optional(),
});

export const errorResponseSchema = z.object({
  error: z.string(),
});

export const getSessionsRoute = createRoute({
  method: "get",
  path: "/api/pomodoroSession/user/:userId",
  operationId: "getSessionsByUser",
  tags: ["Pomodoro Sessions"],
  summary: "Get all sessions for user",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ userId: z.string() }),
  },
  responses: {
    200: {
      description: "List of sessions",
      content: {
        "application/json": {
          schema: z.array(sessionSchema),
        },
      },
    },
  },
});

export const getSessionByIdRoute = createRoute({
  method: "get",
  path: "/api/pomodoroSession/:id",
  operationId: "getSessionById",
  tags: ["Pomodoro Sessions"],
  summary: "Get session by ID",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Session details",
      content: {
        "application/json": {
          schema: sessionSchema,
        },
      },
    },
    404: {
      description: "Session not found",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

export const createSessionRoute = createRoute({
  method: "post",
  path: "/api/pomodoroSession",
  operationId: "createSession",
  tags: ["Pomodoro Sessions"],
  summary: "Create a pomodoro session",
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createSessionSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Session created",
      content: {
        "application/json": {
          schema: sessionSchema,
        },
      },
    },
  },
});

export const updateSessionRoute = createRoute({
  method: "put",
  path: "/api/pomodoroSession/:id",
  operationId: "updateSession",
  tags: ["Pomodoro Sessions"],
  summary: "Update session",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: {
        "application/json": {
          schema: createSessionSchema.partial(),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Session updated",
      content: {
        "application/json": {
          schema: sessionSchema,
        },
      },
    },
  },
});

export const deleteSessionRoute = createRoute({
  method: "delete",
  path: "/api/pomodoroSession/:id",
  operationId: "deleteSession",
  tags: ["Pomodoro Sessions"],
  summary: "Delete session",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Session deleted",
      content: {
        "application/json": {
          schema: z.object({ success: z.boolean() }),
        },
      },
    },
  },
});

export const getActiveSessionRoute = createRoute({
  method: "get",
  path: "/api/pomodoroSession/active/:userId",
  operationId: "getActiveSession",
  tags: ["Pomodoro Sessions"],
  summary: "Get active session for user",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ userId: z.string() }),
  },
  responses: {
    200: {
      description: "Active session",
      content: {
        "application/json": {
          schema: sessionSchema.nullable(),
        },
      },
    },
  },
});

export const startSessionRoute = createRoute({
  method: "post",
  path: "/api/pomodoroSession/start",
  operationId: "startSession",
  tags: ["Pomodoro Sessions"],
  summary: "Start a session",
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            duration_seconds: z.number().optional(),
            timer_type: z.string().optional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Session started",
      content: {
        "application/json": {
          schema: sessionSchema,
        },
      },
    },
  },
});

export const pauseSessionRoute = createRoute({
  method: "put",
  path: "/api/pomodoroSession/:id/pause",
  operationId: "pauseSession",
  tags: ["Pomodoro Sessions"],
  summary: "Pause session",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Session paused",
      content: {
        "application/json": {
          schema: sessionSchema,
        },
      },
    },
  },
});

export const resumeSessionRoute = createRoute({
  method: "put",
  path: "/api/pomodoroSession/:id/resume",
  operationId: "resumeSession",
  tags: ["Pomodoro Sessions"],
  summary: "Resume session",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Session resumed",
      content: {
        "application/json": {
          schema: sessionSchema,
        },
      },
    },
  },
});

export const completeSessionRoute = createRoute({
  method: "put",
  path: "/api/pomodoroSession/:id/complete",
  operationId: "completeSession",
  tags: ["Pomodoro Sessions"],
  summary: "Complete session",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Session completed",
      content: {
        "application/json": {
          schema: sessionSchema,
        },
      },
    },
  },
});

export const updateRemainingTimeRoute = createRoute({
  method: "put",
  path: "/api/pomodoroSession/:id/time",
  operationId: "updateRemainingTime",
  tags: ["Pomodoro Sessions"],
  summary: "Update remaining time",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: {
        "application/json": {
          schema: z.object({ remaining_seconds: z.number() }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Time updated",
      content: {
        "application/json": {
          schema: sessionSchema,
        },
      },
    },
  },
});
