import {
  createDeleteRoute,
  createGetRoute,
  createPostRoute,
  createPutRoute,
} from '../../utils/openapi-helpers.js';
import { z } from 'zod';
import { authMiddleware } from '../middlewares/authenticator.js';
import { TaskSchemas } from './task.schema.js';

const removeCategoryParamsSchema = z.object({
  taskId: z.coerce.number().int().positive(),
});

const removeCategoryResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

const assignCategoryRequestSchema = z.object({
  TaskID: z.coerce.number().int().positive(),
  categoryId: z.coerce.number().int().positive(),
});

const assignCategoryResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
const categoryIdParam = z.object({
  categoryId: z.coerce.number().int().positive(),
});
const userCategoryParam = z.object({
    categoryId: z.coerce.number().int().positive(),
  userId: z.coerce.number().int().positive(),
});
const categorySchema = z.object({
  Category_Name: z.string().min(2).max(100),
  Category_Color: z.string().max(255).optional(),
  Category_icon: z.string().max(255).optional(),
  Category_is_Primary: z.boolean().optional(),
});

const CreateCategorySchema = z.object({
  Category_Name: z.string().min(2).max(100),
  Category_Color: z.string().max(255).optional().default("#A7A7A7"),
  Category_icon: z.string().max(255).optional(),
  Category_is_Primary: z.boolean().optional().default(true)
});

const UpdateCategorySchema = z.object({
  CategoryId: z.coerce.number().int().positive(),
  Category_Name: z.string().min(2).max(100).optional(),
  Category_Color: z.string().max(255).optional(),
  Category_icon: z.string().max(255).optional(),
  Category_is_Primary: z.boolean().optional()
});

const deleteCategorySchema = z.object({
  categoryId: z.coerce.number().int().positive(),
});
const userSchema = z.object({
  userId: z.coerce.number().int().positive(),
});
const getAllCategoryRoute = createGetRoute({
    path: '/category/{userId}',
    summary: 'Get all categories for the authenticated user',
    params: userSchema,
    responseSchema: z.array(categorySchema),
    tags: ['Categories'],
    middleware: [authMiddleware],
})
const getTaskByCategoriesRoute = createGetRoute({
    path: '/category/{categoryId}',
    summary: 'Get all categories for the authenticated user',
    params: categoryIdParam,
    responseSchema: z.array(TaskSchemas.taskSchema),
    tags: ['Categories'],
    middleware: [authMiddleware],
})
const getCategoryProgressRoute = createGetRoute({
    path: '/category/progress/{categoryId}',
    summary: 'Get category progress for the authenticated user',
    params: userCategoryParam,
    responseSchema: z.array(z.number()),
    tags: ['Categories'],
    middleware: [authMiddleware],
})

const assignTaskToCategoryRoute = createPostRoute({
  path: '/category/assign',
  summary: 'Assign a task to a category for the authenticated user',
  requestSchema: assignCategoryRequestSchema, 
  responseSchema: assignCategoryResponseSchema,
  tags: ['Categories'],
  middleware: [authMiddleware],
});

const removeTaskFromCategoryRoute = createDeleteRoute({
  path: '/category/remove',
  summary: 'Remove all category associations for a specific task',
  params: removeCategoryParamsSchema,
  tags: ['Categories'],
  middleware: [authMiddleware],
});

const getTaskCountByCategoryRoute = createGetRoute({
    path: '/category/task-count/{userId}',
    summary: 'Get task count by category for the authenticated user',
    params: userSchema,
    responseSchema: z.array(z.object({
        CategoryId: z.number().int().positive(),
        TaskCount: z.number().int().nonnegative(),
    })),
    tags: ['Categories'],
    middleware: [authMiddleware],
});

const createCategoryRoute = createPostRoute({
    path: '/category/{userID}',
    summary: 'Create a new category for the authenticated user',
    params: userSchema,
    requestSchema: CreateCategorySchema,
    responseSchema: categorySchema,
    tags: ['Categories'],
    middleware: [authMiddleware],
})
const updateCategoryRoute = createPutRoute({
    path: '/category/{categoryId}',
    summary: 'Update an existing category for the authenticated user',
    params: categoryIdParam,
    requestSchema: UpdateCategorySchema,
    responseSchema: categorySchema,
    tags: ['Categories'],
    middleware: [authMiddleware],
})
const deleteCategoryRoute = createDeleteRoute({
    path: '/category/{categoryId}',
    summary: 'Delete a category for the authenticated user',
    params: deleteCategorySchema,
    tags: ['Categories'],
    middleware: [authMiddleware],
})

export const CategorySchemas = {
    categorySchema,
    CreateCategorySchema,
    UpdateCategorySchema,
    deleteCategorySchema,
    getAllCategoryRoute,
    getTaskByCategoriesRoute,
    getCategoryProgressRoute,
    assignTaskToCategoryRoute,
    removeTaskFromCategoryRoute,
    createCategoryRoute,
    updateCategoryRoute,
    deleteCategoryRoute,
    getTaskCountByCategoryRoute,
};