import type { Context } from 'hono';
import { CategoryServices } from '../services/index.js';

export const getAllCategory = async (c: Context) => {
  try {
    const user = c.get('user') as { id: number };
    const categories = await CategoryServices.getAllCategory(user.id);
    return c.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return c.json({ error: 'Failed to fetch categories' }, 500);
  }
};

export const handleGetTasksByCategoryId = async (c: Context) => {
  const categoryId = Number(c.req.param('id')); // ← updated
  const user = c.get('user') as { id: number };
  if (isNaN(categoryId)) {
    return c.json({ error: 'Invalid Category ID' }, 400);
  }

  try {
    const tasks = await CategoryServices.handleGetTasksByCategoryId(categoryId, user.id);
    return c.json(tasks, 200);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return c.json({ error: 'Internal Server Error' }, 500);
  }
};


export const createCategoryController = async (c: Context) => {
  try {
      const categoryData = c.get('categoryData');
      const user = c.get('user') as { id: number };

      const category = await CategoryServices.createCategory(categoryData, user.id);
  
      return c.json({ message: 'Category created successfully', categoryId: category }, 201);
    } catch (error) {
      console.error('Error creating category:', error);
      return c.json({ error: 'Failed to create category' }, 500);
    }
};

export const updateCategoryController = async (c: Context) => {
  try {
    const categoryId = parseInt(c.req.param('id') || '0');
    const user = c.get('user') as { id: number };
    const body = await c.req.json();
    
    if (!body.color || !body.icon || body.is_primary === undefined) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    await CategoryServices.updateCategory(categoryId, {
      CategoryId: categoryId,
      Category_Color: body.color,
      Category_icon: body.icon,
      Category_is_Primary: body.is_primary
    }, user.id);
    
    return c.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    return c.json({ error: 'Failed to update category' }, 500);
  }
};

export const deleteCategoryController = async (c: Context) => {
  try {
    const categoryId = parseInt(c.req.param('id') || '0');
    const user = c.get('user') as { id: number };
    
    await CategoryServices.deleteCategory(categoryId, user.id);
    
    return c.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return c.json({ error: 'Failed to delete category' }, 500);
  }
};

export const getCategoryProgress = async (c: Context) => {
  try {
    const categoryId = parseInt(c.req.param('id') || '0');
    const user = c.get('user') as { id: number };
    
    const progressData = await CategoryServices.getCategoryProgress(categoryId, user.id);
    
    return c.json(progressData);
  } catch (err) {
    console.error('Error calculating category progress:', err);
    return c.json({ error: 'Failed to calculate category progress' }, 500);
  }
};

export async function assignTaskToCategoryController(c: Context) {
  const taskID = Number(c.req.param('id'));
  const user = c.get('user') as { id: number };

  try {
    const body = await c.req.json();
    const CategoryId = Number(body.CategoryId); 

    if (isNaN(CategoryId)) {
      return c.json({ success: false, message: 'Invalid CategoryId' }, 400);
    }

    await CategoryServices.assignTasktoCategory(CategoryId, taskID, user.id); 

    return c.json({ success: true, message: 'Task assigned to category successfully' });
  } catch (error) {
    return c.json({ success: false, message: 'Failed to assign task to category', error: String(error) }, 500);
  }
}

export const getTaskCountController = async (c: Context) => {
  const categoryId = Number(c.req.param('id'));
  const user = c.get('user') as { id: number };

  try {
    const count = await CategoryServices.getTaskCount(categoryId, user.id);
    return c.json({ taskCount: count });
  } catch (error) {
    return c.json({ success: false, message: 'Failed to fetch task count', error: String(error) }, 500);
  }
};


