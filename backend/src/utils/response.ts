import type { Context } from "hono";

export function successResponse<T>(
  c: Context,
  data: T,
  statusCode: number = 200,
  message?: string,
) {
  const response = {
    success: true,
    data,
    ...(message && { message }),
    timestamp: new Date().toISOString(),
  };

  return c.json(response, statusCode as any);
}

export function errorResponse(
  c: Context,
  message: string,
  statusCode: number = 500,
  errorName?: string,
) {
  return c.json(
    {
      success: false,
      error: {
        name: errorName || "API_ERROR",
        message,
        statusCode,
      },
      timestamp: new Date().toISOString(),
    },
    statusCode as any,
  );
}
