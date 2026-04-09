import {
  createDeleteRoute,
  createGetRoute,
  createPostRoute,
  createPutRoute,
} from '../../utils/openapi-helpers.js';
import { z } from 'zod';
import { authMiddleware } from '../middlewares/authenticator.js';

export const checkEmailRequestSchema = z.object({
  User_Email: z.string().email('Invalid email format'),
});
export const checkEmailResponseSchema = z.object({
  exists: z.boolean(),
  message: z.string().optional(),
  error: z.string().optional(),
});
export const loginRequestSchema = z.object({
  User_Email: z.string().email('Invalid email format'),
  User_Password: z.string().min(1, 'Password is required'), 
});
export const loginResponseSchema = z.object({
  message: z.string(),
  token: z.string().optional(), 
  user: z.object({
    userId: z.number().int().positive(), // Updated strictly to Int to match Prisma
    User_Email: z.string().email(),
  }).optional(),
});
const userIdParam = z.object({
   userId: z.coerce.number().int().positive(),
});
const profileSChema = z.object({
    Username: z.string().min(2).max(100),
    User_profile_icon_type: z.enum(['preset', 'custom']).default('preset'),
    User_profile_icon_path: z.string().max(255).optional(),
});
const userSchema = z.object({
    UserID : z.coerce.number().int().positive(),
    User_Email: z.string().email(),
    User_Password: z.string().min(7),
});
export const safeUserSchema = userSchema.omit({ User_Password: true });
const userProfileSchema = z.object({
    user: safeUserSchema,
    profile: profileSChema,
});

export const resetPasswordRequestSchema = z.object({
  token: z.string({ error: 'Reset token is required' }),
  newPassword: z.string().min(7, 'Password must be at least 7 characters'), 
});
export const resetPasswordResponseSchema = z.object({
  success: z.boolean().optional(),
  message: z.string().optional(),
  error: z.string().optional(),
});

const getUserProfileRoute = createGetRoute({
    path: '/users/{userId}/profile',
    summary: 'Get user profile',
   params: userIdParam,
    responseSchema: userProfileSchema,
    tags: ['Users'],
    middleware: [authMiddleware],
});
const fetchProfileRoute = createGetRoute({
    path: '/users/{userId}/profile',
    summary: 'Fetch user profile',
    params: userIdParam,
    responseSchema: userProfileSchema,
    tags: ['Users'],
    middleware: [authMiddleware],
});
const updateProfileRoute = createPutRoute({
    path: '/users/{userId}/profile',
    summary: 'Update user profile',
    params: userIdParam,
    requestSchema: profileSChema.partial(),
    responseSchema: userProfileSchema,
    tags: ['Users'],
    middleware: [authMiddleware],
});
const uploadProfilePicRoute = createPostRoute({
    path: '/users/{userId}/profile/picture/upload',
    summary: 'Upload user profile picture',
    params: userIdParam,
    requestSchema: z.object({
        file: z.instanceof(File).openapi({
        type: 'string',
        format: 'binary',
        description: 'The file to upload',
        }),
  }),
    responseSchema: userProfileSchema,
    tags: ['Users'],
    middleware: [authMiddleware],
});

const createUserRoute = createPostRoute({
    path: '/users',
    summary: 'Create a new user',
    requestSchema: userSchema,
    responseSchema: userProfileSchema,
    tags: ['Users'],
});
const checkEmailRoute = createPostRoute({
  path: '/auth/forgot-password', // Adjust base path as needed
  summary: 'Request password reset email',
  requestSchema: checkEmailRequestSchema,
  responseSchema: checkEmailResponseSchema,
  tags: ['Auth'],
});

const resetPasswordRoute = createPostRoute({
  path: '/auth/reset-password',
  summary: 'Reset user password via token',
  requestSchema: resetPasswordRequestSchema,
  responseSchema: resetPasswordResponseSchema,
  tags: ['Auth'],
});

const loginUserRoute = createPostRoute({
  path: '/auth/login',
  summary: 'Authenticate and login user',
  requestSchema: loginRequestSchema,
  responseSchema: loginResponseSchema,
  tags: ['Auth'],
});

export const UserSchemas = {
    userSchema,
    safeUserSchema,
    userProfileSchema,
    getUserProfileRoute,
    fetchProfileRoute,
    updateProfileRoute,
    uploadProfilePicRoute,
    createUserRoute,
    checkEmailRoute,
    resetPasswordRoute,
    loginUserRoute,
    resetPasswordRequestSchema,
    resetPasswordResponseSchema,
    loginResponseSchema
}