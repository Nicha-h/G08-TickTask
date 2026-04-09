import type { Context } from 'hono';
import { db } from '../../database/db.js';
import { CategorySchemas } from '../schemas/category.schema.js';
import {z} from 'zod';
import * as categoryModel from '../models/Category.model.js';
import { Category } from '../middlewares/Category.validators.js';
import { getTasksByCategoryId } from '../models/Category.model.js';

const patchSchema = z.object({
  Category_Name: z.string().min(1).optional(),
  Category_Color: z.string().optional(),
  Category_icon: z.string().nullable().optional(),
  Category_is_Primary: z.boolean().optional(),
});

export const getAllCategory = async (c: Context) => {
  try {
    const user = c.get('user') as { id: number };
    const categories = await categoryModel.getUserCategories(user.id);
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
    const taskCategories = await getTasksByCategoryId(categoryId,user.id);
    const tasks = taskCategories.map(tc => tc.task);
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
      const { Category_Name, Category_Color, Category_Icon, Category_is_Primary } = categoryData;

      const categoryId = await categoryModel.createCategory(
        user.id,
        Category_Name,
        Category_Color ?? '#A7A7A7',
        Category_Icon ?? '📁',         
        !Category_is_Primary           
      );
  
      return c.json({ message: 'Category created successfully',categoryId }, 201);
    } catch (error) {
      console.error('Error creating category:', error);
      return c.json({ error: 'Failed to create category' }, 500);
    }
};

export const updateCategoryController = async (c: Context) => {
  try {
    const categoryId = parseInt(c.req.param('id'));
    const user = c.get('user') as { id: number };
    const body = await c.req.json();
    
    if (!body.color || !body.icon || body.is_primary === undefined) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    await categoryModel.updateCategory(
      categoryId,
      user.id,
      body.color,
      body.icon,
      body.is_primary
    );
    
    return c.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    return c.json({ error: 'Failed to update category' }, 500);
  }
};

export const deleteCategoryController = async (c: Context) => {
  try {
    const categoryId = parseInt(c.req.param('id'));
    const user = c.get('user') as { id: number };
    
    await categoryModel.deleteCategory(categoryId, user.id);
    
    return c.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return c.json({ error: 'Failed to delete category' }, 500);
  }
};

export const getCategoryProgress = async (c: Context) => {
  try {
    const categoryId = parseInt(c.req.param('id'));
    const user = c.get('user') as { id: number };
    
    const progressData = await categoryModel.getCategoryProgress(categoryId, user.id);
    
    return c.json(progressData);
  } catch (err) {
    console.error('Error calculating category progress:', err);
    return c.json({ error: 'Failed to calculate category progress' }, 500);
  }
};

export async function assignTaskToCategoryController(c: Context) {
  const taskID = Number(c.req.param('id'));

  try {
    const body = await c.req.json();
    const CategoryId = Number(body.CategoryId); 

    if (isNaN(CategoryId)) {
      return c.json({ success: false, message: 'Invalid CategoryId' }, 400);
    }

   
    const task = await categoryModel.assignTaskToCategories(taskID, CategoryId); 

    return c.json({ success: true, data: task });
  } catch (error) {
    return c.json({ success: false, message: 'Failed to assign task to session', error: String(error) }, 500);
  }
}

export const getTaskCountController = async (c: Context) => {
  const categoryId = Number(c.req.param('id'));

  try {
    const count = await categoryModel.getTaskCount(categoryId);
    return c.json({ taskCount: count });
  } catch (error) {
    return c.json({ success: false, message: 'Failed to fetch task count', error: String(error) }, 500);
  }
};


