import type { Context } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    name: string;
    message: string;
    statusCode: number;
  };
  timestamp: string;
}

export const successResponse = (c: Context, data: any, status: number = 200) => {
  return c.json({
    success: true,
    data: data,
    timestamp: new Date().toISOString(),
  }, status as any);
};

export const errorResponse = (c: Context, message: string, statusCode: number) => {
  return c.json({
    success: false, 
    error: {
      name: "Error",
      message: message,
      statusCode: statusCode,
    },
    timestamp: new Date().toISOString(),
  }, statusCode as any);
};