import type { Context } from 'hono';
import { CategoryServices } from '../services/index.js';

// Helper function to create success response
const successResponse = (data: any, message?: string) => {
  const response: any = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
  if (message) {
    response.message = message;
  }
  return response;
};

// Helper function to create error response
const errorResponse = (name: string, message: string, statusCode: number) => {
  return {
    success: false as const,
    error: { name, message, statusCode },
    timestamp: new Date().toISOString(),
  };
};

export const getAllCategory = async (c: Context) => {
  try {
    const user = c.get('user') as { id: number };
    const categories = await CategoryServices.getAllCategory(user.id);
    return c.json(successResponse(categories), 200);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return c.json(errorResponse('Error', 'Failed to fetch categories', 500), 500);
  }
};

export const handleGetTasksByCategoryId = async (c: Context) => {
  const categoryId = Number(c.req.param('id'));
  const user = c.get('user') as { id: number };
  if (isNaN(categoryId)) {
    return c.json(errorResponse('BadRequest', 'Invalid Category ID', 400), 400);
  }

  try {
    const tasks = await CategoryServices.handleGetTasksByCategoryId(categoryId, user.id);
    return c.json(successResponse(tasks), 200);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return c.json(errorResponse('Error', 'Internal Server Error', 500), 500);
  }
};


export const createCategoryController = async (c: Context) => {
  try {
      const categoryData = c.get('categoryData');
      const user = c.get('user') as { id: number };

      const category = await CategoryServices.createCategory(categoryData, user.id);
  
      return c.json(successResponse(category, 'Category created successfully'), 201);
    } catch (error) {
      console.error('Error creating category:', error);
      return c.json(errorResponse('Error', 'Failed to create category', 500), 500);
    }
};

export const updateCategoryController = async (c: Context) => {
  try {
    const categoryId = parseInt(c.req.param('id') || '0');
    const user = c.get('user') as { id: number };
    const body = await c.req.json();
    
    if (!body.color || !body.icon || body.is_primary === undefined) {
      return c.json(errorResponse('BadRequest', 'Missing required fields', 400), 400);
    }
    
    await CategoryServices.updateCategory(categoryId, {
      CategoryId: categoryId,
      Category_Color: body.color,
      Category_icon: body.icon,
      Category_is_Primary: body.is_primary
    }, user.id);
    
    return c.json(successResponse(null, 'Category updated successfully'), 200);
  } catch (error) {
    console.error('Error updating category:', error);
    return c.json(errorResponse('Error', 'Failed to update category', 500), 500);
  }
};

export const deleteCategoryController = async (c: Context) => {
  try {
    const categoryId = parseInt(c.req.param('id') || '0');
    const user = c.get('user') as { id: number };
    
    await CategoryServices.deleteCategory(categoryId, user.id);
    
    return c.json(successResponse(null, 'Category deleted successfully'), 200);
  } catch (error) {
    console.error('Error deleting category:', error);
    return c.json(errorResponse('Error', 'Failed to delete category', 500), 500);
  }
};

export const getCategoryProgress = async (c: Context) => {
  try {
    const categoryId = parseInt(c.req.param('id') || '0');
    const user = c.get('user') as { id: number };
    
    const progressData = await CategoryServices.getCategoryProgress(categoryId, user.id);
    
    return c.json(successResponse(progressData), 200);
  } catch (err) {
    console.error('Error calculating category progress:', err);
    return c.json(errorResponse('Error', 'Failed to calculate category progress', 500), 500);
  }
};

export async function assignTaskToCategoryController(c: Context) {
  const user = c.get('user') as { id: number };

  try {
    const body = await c.req.json();
    const CategoryId = Number(body.categoryId); 

    if (isNaN(CategoryId)) {
      return c.json(errorResponse('BadRequest', 'Invalid CategoryId', 400), 400);
    }

    await CategoryServices.assignTasktoCategory(CategoryId, body.TaskID, user.id); 

    return c.json(successResponse(null, 'Task assigned to category successfully'), 200);
  } catch (error) {
    return c.json(errorResponse('Error', 'Failed to assign task to category', 500), 500);
  }
}

export const getTaskCountController = async (c: Context) => {
  const user = c.get('user') as { id: number };

  try {
    const counts = await CategoryServices.getTaskCount(0, user.id);
    return c.json(successResponse(counts), 200);
  } catch (error) {
    return c.json(errorResponse('Error', 'Failed to fetch task count', 500), 500);
  }
};

export const removeTaskFromCategoryController = async (c: Context) => {
  const user = c.get('user') as { id: number };

  try {
    const body = await c.req.json();
    const taskId = Number(body.taskId);

    if (isNaN(taskId)) {
      return c.json(errorResponse('BadRequest', 'Invalid taskId', 400), 400);
    }

    await CategoryServices.removeTaskFromCategory(0, taskId, user.id);

    return c.json(successResponse(null, 'Task removed from category successfully'), 200);
  } catch (error) {
    return c.json(errorResponse('Error', 'Failed to remove task from category', 500), 500);
  }
};


