import type { Context, Next } from 'hono';
import { z } from 'zod';

export const Category = z.object({
    Category_Name: z.string().min(1, { message: 'Category name is required' }),
    Category_Color: z.string(),
    Category_Icon: z.string(),
    Category_is_Primary: z.boolean(),
});

export async function validateCategoryId(c: Context, next: Next) {
  const idParam = c.req.param('id');
  
  if (!/^\d+$/.test(idParam)) {
    return c.json({
      success: false,
      message: 'Invalid category ID format',
    }, 400);
  }
  
  c.set('CategoryID', Number(idParam));
  await next();
}

export async function validateCreateCategory(c: Context, next: Next) {
    try {
      const body = await c.req.json();
      const result = Category.safeParse(body);
      
      if (!result.success) {
        return c.json({
          success: false,
          errors: result.error.format(),
        }, 400);
      }
      
      c.set('categoryData', result.data);
      await next();
    } catch (error) {
      return c.json({
        success: false,
        message: 'Invalid JSON in request body',
      }, 400);
    }
}

export async function validateUpdateCategory(c: Context, next: Next) {
    return validateCreateCategory(c, next);
}
  
export async function validatePatchCategory(c: Context, next: Next) {
    try {
        const body = await c.req.json();
        const PartialCategory = Category.partial();
        const result = PartialCategory.safeParse(body);
        if (!result.success) {
            return c.json({
            success: false,
            errors: result.error.format(),
            }, 400);
        }
      
      
        c.set('categoryData', result.data);
        await next();
        } catch (error) {
        return c.json({
            success: false,
            message: 'Invalid JSON in request body',
        }, 400);
    }
  }
 