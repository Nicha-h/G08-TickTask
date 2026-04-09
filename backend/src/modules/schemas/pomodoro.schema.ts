import {
  createDeleteRoute,
  createGetRoute,
  createPostRoute,
  createPutRoute,
} from '../../utils/openapi-helpers.js';
import { z } from 'zod';
import { authMiddleware } from '../middlewares/authenticator.js';

const TimerTypeEnum = z.enum(['work', 'short', 'long']);
const SessionStatusEnum = z.enum(['active', 'paused', 'completed']);
const sessionSchema = z.object({
  SessionId: z.number(),
  UserID: z.number(),
  Status: SessionStatusEnum,
  StartTime: z.string(),
  EndTime: z.string().nullable().optional(),
  PausedTime: z.string(),
  duration_seconds: z.number(),
  remaining_seconds: z.number(),
  timer_type: TimerTypeEnum,
  last_updated: z.string().datetime(),
});

const createSessionSchema = z.object({
  UserID: z.number().int().positive(),
  duration_seconds: z.number().int().positive().default(1500),
  timer_type: TimerTypeEnum.optional(),
});
 
const updateSessionSchema = z.object({
  status: SessionStatusEnum.optional(),
  remaining_seconds: z.number().int().nonnegative().optional(),
  timer_type: TimerTypeEnum.optional(),
});
 
 
const startSessionSchema = z.object({
  userId: z.number().int().positive(),
  duration_seconds: z.number().int().positive().default(1500),
  timer_type: TimerTypeEnum.optional(),
});
 
const pauseSessionSchema = z.object({
  sessionId: z.number().int().positive(),
});
 
const updateRemainingTimeSchema = z.object({
  remaining_seconds: z.number().int().nonnegative(),
});
const userIdParam = z.object({
  userId: z.coerce.number().int().positive(),
});
const sessionIdParam = z.object({
  sessionId: z.coerce.number().int().positive(),
});
const getAllSessionsRoute = createGetRoute({
  path: '/sessions/user/{userId}',
  summary: 'Get all sessions for a user',
  params: userIdParam,
  responseSchema: z.array(sessionSchema),
  tags: ['Sessions'],
  middleware: [authMiddleware],
  operationId: 'getAllSessions',
});
const getActiveSessionRoute = createGetRoute({
  path: '/sessions/active/{userId}',
  summary: 'Get the active or paused session for a user',
  params: userIdParam,
  responseSchema: sessionSchema.nullable(),
  tags: ['Sessions'],
  middleware: [authMiddleware],
  operationId: 'getActiveSession',
});
 
const getSessionByIdRoute = createGetRoute({
  path: '/sessions/{id}',
  summary: 'Get a session by ID',
  params: sessionIdParam,
  responseSchema: sessionSchema,
  tags: ['Sessions'],
  middleware: [authMiddleware],
  operationId: 'getSessionById',
});
 
const createSessionRoute = createPostRoute({
  path: '/sessions',
  summary: 'Create a new session',
  requestSchema: createSessionSchema,
  responseSchema: sessionSchema,
  tags: ['Sessions'],
  middleware: [authMiddleware],
  operationId: 'createSession',
});
 
const updateSessionRoute = createPutRoute({
  path: '/sessions/{id}',
  summary: 'Update a session',
  params: sessionIdParam,
  requestSchema: updateSessionSchema,
  responseSchema: sessionSchema,
  tags: ['Sessions'],
  middleware: [authMiddleware],
  operationId: 'updateSession',
});
 
const deleteSessionRoute = createDeleteRoute({
  path: '/sessions/{id}',
  summary: 'Delete a session',
  params: sessionIdParam,
  tags: ['Sessions'],
  middleware: [authMiddleware],
  operationId: 'deleteSession',
});
 
const startSessionRoute = createPostRoute({
  path: '/sessions/start',
  summary: 'Start a new session, pausing any currently active session',
  requestSchema: startSessionSchema,
  responseSchema: sessionSchema,
  tags: ['Sessions'],
  middleware: [authMiddleware],
  operationId: 'startSession',
});
 
const pauseSessionRoute = createPutRoute({
  path: '/sessions/{id}/pause',
  summary: 'Pause a session',
  params: sessionIdParam,
  requestSchema: pauseSessionSchema,
  responseSchema: sessionSchema,
  tags: ['Sessions'],
  middleware: [authMiddleware],
  operationId: 'pauseSession',
});
 
const resumeSessionRoute = createPutRoute({
  path: '/sessions/{id}/resume',
  summary: 'Resume a paused session',
  params: sessionIdParam,
  requestSchema: z.object({}),
  responseSchema: sessionSchema,
  tags: ['Sessions'],
  middleware: [authMiddleware],
  operationId: 'resumeSession',
});
 
const completeSessionRoute = createPutRoute({
  path: '/sessions/{id}/complete',
  summary: 'Mark a session as completed',
  params: sessionIdParam,
  requestSchema: z.object({}),
  responseSchema: sessionSchema,
  tags: ['Sessions'],
  middleware: [authMiddleware],
  operationId: 'completeSession',
});
 
const updateRemainingTimeRoute = createPutRoute({
  path: '/sessions/{id}/time',
  summary: 'Update remaining time on a session',
  params: sessionIdParam,
  requestSchema: updateRemainingTimeSchema,
  responseSchema: sessionSchema,
  tags: ['Sessions'],
  middleware: [authMiddleware],
  operationId: 'updateRemainingTime',
});

export const PomodoroSchemas = {
  sessionSchema,
  createSessionSchema,
    updateSessionSchema,
    startSessionSchema,
    pauseSessionSchema,
    updateRemainingTimeSchema,
    getAllSessionsRoute,
    getActiveSessionRoute,
    getSessionByIdRoute,
    createSessionRoute,
    updateSessionRoute,
    deleteSessionRoute,
    startSessionRoute,
    pauseSessionRoute,
    resumeSessionRoute,
    completeSessionRoute,
    updateRemainingTimeRoute,
    SessionStatusEnum,
    TimerTypeEnum
}