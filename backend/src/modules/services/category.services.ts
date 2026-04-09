import { categoryModel } from '../models/index.js';
import { NotFoundError } from '../../errors/types.js';
import type {
  Category,
  CreateCategoryData,
  UpdateCategoryData,
} from '../types/index.js';

const getAllCategory = async (userId: number): Promise<Category[]> => {
  const categories = await categoryModel.getUserCategories(userId);
  return categories;
}
const handleGetTasksByCategoryId = async (categoryId: number, userId: number) => {
  const taskCategories = await categoryModel.getTasksByCategoryId(categoryId,userId);
  const tasks = taskCategories.map(tc => tc.task);
  return tasks;
}
const createCategory = async (data: CreateCategoryData, userId: number): Promise<Category> => {
  const { Category_Name, Category_Color, Category_icon, Category_is_Primary } = data;
  const category = await categoryModel.createCategory(
    userId,
    Category_Name,
    Category_Color ?? '#A7A7A7',
    Category_icon ?? 'iconAll.svg',
    Category_is_Primary ?? false
  );
  if (!category) {
    throw new Error('Failed to create category');
  }
  return category;
}
const updateCategory = async (categoryId: number, data: UpdateCategoryData, userId: number) => {
  const { Category_Color, Category_icon, Category_is_Primary } = data;
  const updatedCategory = await categoryModel.updateCategory(
    categoryId,
    userId,
    Category_Color ?? '#A7A7A7',
    Category_icon ?? 'iconAll.svg',
    Category_is_Primary ?? false
  );
  if (updatedCategory.count === 0) {
    throw new NotFoundError('Category not found or no changes made');
  }
  return updatedCategory;
}
const deleteCategory = async (categoryId: number, userId: number) => {
  await categoryModel.deleteCategory(categoryId, userId);
}
const getCategoryProgress = async (categoryId: number, userId: number) => {
  const progress = await categoryModel.getCategoryProgress(categoryId, userId);
  if (!progress) {
    throw new NotFoundError('progress not found');
  }
  return progress;
}

const assignTasktoCategory = async (categoryId: number, taskId: number, userId: number) => {
  const taskCategories = await categoryModel.getTasksByCategoryId(categoryId,userId);
  const isTaskAlreadyAssigned = taskCategories.some(tc => tc.TaskID === taskId);
    if (isTaskAlreadyAssigned) {
        throw new Error('Task is already assigned to this category');
    }
    await categoryModel.assignTaskToCategories(taskId, categoryId);
}
const removeTaskFromCategory = async (categoryId: number, taskId: number, userId: number) => {
  const taskCategories = await categoryModel.getTasksByCategoryId(categoryId,userId);
  await categoryModel.removeTaskCategories(taskId);
  const isTaskAssigned = taskCategories.some(tc => tc.TaskID === taskId);
    if (!isTaskAssigned) {
        throw new Error('Task is not assigned to this category');
    }
}
const getTaskCount = async (categoryId: number, userId: number) => {
  const count = await categoryModel.getTaskCount(categoryId);
  if(!count) {
    throw new NotFoundError('Failed to get task count');
  }
  return count;
}
export const CategoryServices = {
  getAllCategory,
  handleGetTasksByCategoryId,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryProgress,
  assignTasktoCategory,
  removeTaskFromCategory,
  getTaskCount
}