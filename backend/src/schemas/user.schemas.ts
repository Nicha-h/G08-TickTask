import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";

// Base schemas
export const userSchema = z.object({
  UserID: z.number(),
  User_Email: z.email(),
});

export const profileUpdateSchema = z.object({
  name: z.string().optional(),
  iconType: z.string().optional(),
  iconPath: z.string().optional(),
});

export const errorResponseSchema = z.object({
  error: z.string(),
});

// OpenAPI route configs
export const getProfileRoute = createRoute({
  method: "get",
  path: "/api/users/profile",
  operationId: "getProfile",
  tags: ["Users"],
  summary: "Get user profile",
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: "User profile retrieved",
      content: {
        "application/json": {
          schema: userSchema,
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

export const updateProfileRoute = createRoute({
  method: "put",
  path: "/api/users/profile",
  operationId: "updateProfile",
  tags: ["Users"],
  summary: "Update user profile",
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: profileUpdateSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Profile updated",
      content: {
        "application/json": {
          schema: z.object({ success: z.boolean() }),
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

export const uploadProfilePicRoute = createRoute({
  method: "post",
  path: "/api/users/profile/upload-profile-pic",
  operationId: "uploadProfilePic",
  tags: ["Users"],
  summary: "Upload profile picture",
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: "Profile picture uploaded",
      content: {
        "application/json": {
          schema: z.object({ url: z.string() }),
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
