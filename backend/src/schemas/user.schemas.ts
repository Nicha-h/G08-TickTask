import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";

// Base schemas
export const userSchema = z.object({
  UserID: z.number(),
  User_Email: z.string().email(),
});

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const profileUpdateSchema = z.object({
  name: z.string().optional(),
  iconType: z.string().optional(),
  iconPath: z.string().optional(),
});

export const emailCheckSchema = z.object({
  email: z.string().email(),
});

export const passwordResetSchema = z.object({
  email: z.string().email(),
});

export const errorResponseSchema = z.object({
  error: z.string(),
});

// OpenAPI route configs
export const signupRoute = createRoute({
  method: "post",
  path: "/api/users/signup",
  operationId: "signupUser",
  tags: ["Users"],
  summary: "Sign up a new user",
  request: {
    body: {
      content: {
        "application/json": {
          schema: signupSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "User created successfully",
      content: {
        "application/json": {
          schema: userSchema,
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

export const loginRoute = createRoute({
  method: "post",
  path: "/api/users/login",
  operationId: "loginUser",
  tags: ["Users"],
  summary: "Login user",
  request: {
    body: {
      content: {
        "application/json": {
          schema: loginSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Login successful",
      content: {
        "application/json": {
          schema: z.object({
            token: z.string(),
            user: userSchema,
          }),
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

export const checkEmailRoute = createRoute({
  method: "post",
  path: "/api/users/check-email",
  operationId: "checkEmail",
  tags: ["Users"],
  summary: "Check if email exists",
  request: {
    body: {
      content: {
        "application/json": {
          schema: emailCheckSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Email check result",
      content: {
        "application/json": {
          schema: z.object({ exists: z.boolean() }),
        },
      },
    },
  },
});

export const resetPasswordRoute = createRoute({
  method: "post",
  path: "/api/users/reset-password",
  operationId: "resetPassword",
  tags: ["Users"],
  summary: "Reset user password",
  request: {
    body: {
      content: {
        "application/json": {
          schema: passwordResetSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Password reset initiated",
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
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
