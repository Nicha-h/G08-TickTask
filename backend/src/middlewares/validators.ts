import type { Context, Next } from 'hono';
import { z } from 'zod';
import type { TaskStatus } from '../types/index.js';

export const TaskSchema = z.object({
  Task_Title: z.string().min(1, "Title is required"),
  Task_Description: z.string().nullable().optional(),
  Task_Start_Date: z.string().optional(),
  Task_End_Date: z.string().optional(),
  Task_Status: z.enum(['Incomplete', 'Completed']).optional(),
  Task_Color: z.string().optional(),
  Task_Icon: z.string().nullable().optional(),
  Task_Start_Time: z.string().optional(),
  Task_End_Time: z.string().optional(),
});

const taskUpdateSchema = TaskSchema.partial();

export async function validateTaskId(c: Context, next: Next) {
  const idParam = c.req.param('id');
  
  if (!/^\d+$/.test(idParam)) {
    return c.json({
      success: false,
      message: 'Invalid task ID format',
    }, 400);
  }
  
  c.set('taskId', Number(idParam));
  await next();
}

export async function validateCreateTask(c: Context, next: Next) {
    try {
      const body = await c.req.json();
      const result = TaskSchema.safeParse(body);
      
      if (!result.success) {
        return c.json({
          success: false,
          errors: result.error.format(),
        }, 400);
      }
      
      c.set('taskData', result.data);
      await next();
    } catch (error) {
      return c.json({
        success: false,
        message: 'Invalid JSON in request body',
      }, 400);
    }
}

export async function validateUpdateTask(c: Context, next: Next) {
    try {
      const body = await c.req.json();
      const result = TaskSchema.safeParse(body);
      
      if (!result.success) {
        return c.json({
          success: false,
          errors: result.error.format(),
        }, 400);
      }
      
      c.set('taskData', result.data);
      await next();
    } catch (error) {
      return c.json({
        success: false,
        message: 'Invalid JSON in request body',
      }, 400);
    }
  }
  
  export async function validatePatchTask(c: Context, next: Next) {
    try {
      const body = await c.req.json();
      const result = taskUpdateSchema.safeParse(body);
      
      if (!result.success) {
        return c.json({
          success: false,
          errors: result.error.format(),
        }, 400);
      }
      
      
      c.set('taskData', result.data);
      await next();
    } catch (error) {
      return c.json({
        success: false,
        message: 'Invalid JSON in request body',
      }, 400);
    }
  }
  
  export async function validateDateParam(c: Context, next: Next) {
    const date = c.req.query('date');
    
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return c.json({
        success: false,
        message: 'Invalid date format. Use YYYY-MM-DD',
      }, 400);
    }
    
    await next();
  }
  
  export async function validateStatusParam(c: Context, next: Next) {
    const status = c.req.query('status');
    
    if (status && !['Completed', 'Incomplete'].includes(status)) {
      return c.json({
        success: false,
        message: 'Invalid status. Must be "Completed" or "Incomplete"',
      }, 400);
    }
}