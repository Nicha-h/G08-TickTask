import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";

export const categorySchema = z.object({
  CategoryId: z.number(),
  Category_Name: z.string(),
  Category_Color: z.string(),
  Category_icon: z.string(),
  Category_is_Primary: z.boolean(),
  userId: z.number(),
});

export const createCategorySchema = z.object({
  Category_Name: z.string().min(1),
  Category_Icon: z.string(),
  Category_Color: z.string(),
  Category_is_Primary: z.boolean().optional(),
});

export const errorResponseSchema = z.object({
  error: z.string(),
});

export const getCategoriesRoute = createRoute({
  method: "get",
  path: "/api/category",
  operationId: "getCategories",
  tags: ["Categories"],
  summary: "Get all categories",
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: "List of categories",
      content: {
        "application/json": {
          schema: z.array(categorySchema),
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

export const createCategoryRoute = createRoute({
  method: "post",
  path: "/api/category",
  operationId: "createCategory",
  tags: ["Categories"],
  summary: "Create a category",
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createCategorySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Category created",
      content: {
        "application/json": {
          schema: categorySchema,
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

export const updateCategoryRoute = createRoute({
  method: "put",
  path: "/api/category/{id}",
  operationId: "updateCategory",
  tags: ["Categories"],
  summary: "Update a category",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: {
        "application/json": {
          schema: createCategorySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Category updated",
      content: {
        "application/json": {
          schema: categorySchema,
        },
      },
    },
    404: {
      description: "Category not found",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

export const patchCategoryRoute = createRoute({
  method: "patch",
  path: "/api/category/{id}",
  operationId: "patchCategory",
  tags: ["Categories"],
  summary: "Partially update a category",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: {
        "application/json": {
          schema: createCategorySchema.partial(),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Category updated",
      content: {
        "application/json": {
          schema: categorySchema,
        },
      },
    },
    404: {
      description: "Category not found",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

export const deleteCategoryRoute = createRoute({
  method: "delete",
  path: "/api/category/{id}",
  operationId: "deleteCategory",
  tags: ["Categories"],
  summary: "Delete a category",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Category deleted",
      content: {
        "application/json": {
          schema: z.object({ success: z.boolean() }),
        },
      },
    },
    404: {
      description: "Category not found",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

export const getCategoryProgressRoute = createRoute({
  method: "get",
  path: "/api/category/{id}/progress",
  operationId: "getCategoryProgress",
  tags: ["Categories"],
  summary: "Get category progress",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Category progress",
      content: {
        "application/json": {
          schema: z.object({
            total: z.number(),
            completed: z.number(),
          }),
        },
      },
    },
  },
});

export const assignTaskToCategoryRoute = createRoute({
  method: "put",
  path: "/api/category/{id}/assign",
  operationId: "assignTaskToCategory",
  tags: ["Categories"],
  summary: "Assign task to category",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: {
        "application/json": {
          schema: z.object({ taskId: z.number() }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Task assigned",
      content: {
        "application/json": {
          schema: z.object({ success: z.boolean() }),
        },
      },
    },
  },
});

export const getTaskCountRoute = createRoute({
  method: "get",
  path: "/api/category/{id}/count",
  operationId: "getCategoryTaskCount",
  tags: ["Categories"],
  summary: "Get task count in category",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Task count",
      content: {
        "application/json": {
          schema: z.object({ count: z.number() }),
        },
      },
    },
  },
});

export const getTasksByCategoryRoute = createRoute({
  method: "get",
  path: "/api/category/{id}/tasks",
  operationId: "getTasksByCategory",
  tags: ["Categories"],
  summary: "Get tasks in category",
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: "Tasks in category",
      content: {
        "application/json": {
          schema: z.array(
            z.object({
              TaskID: z.number(),
              Task_Title: z.string(),
            }),
          ),
        },
      },
    },
  },
});
