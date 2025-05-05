import { PrismaClient, type category } from '../generated/prisma/index.js';
import * as dotenv from 'dotenv';
import { Category } from '../middlewares/Category.validators.js';

dotenv.config();

const prisma = new PrismaClient();

export async function getUserCategories(userId: number) {
  return await prisma.category.findMany({
    where: {
      userId: userId,
    },
  });
}

export async function createCategory(userId: number, name: string, color: string, icon: string, isCustom = false): Promise<category> {
  const category = await prisma.category.create({
    data: {
      Category_Name: name,
      userId: userId,
      Category_Color: color,
      Category_icon: icon,
      Category_is_Primary: isCustom,
    },
  });
  return category;
}

export async function deleteCategory(categoryId: number, userId: number) {
  await prisma.category.deleteMany({
    where: {
      CategoryId: categoryId,
      userId: userId,
    },
  });
}

export async function updateCategory(categoryId: number, userId: number, color: string, icon: string, Category_is_Primary: boolean) {
  const updatedCategory = await prisma.category.updateMany({
    where: {
      CategoryId: categoryId,
      userId: userId,
    },
    data: {
      Category_Color: color,
      Category_icon: icon,
      Category_is_Primary: Category_is_Primary,
    },
  });
  return updatedCategory;
}

export async function patchCategory(categoryId: number, userId: number, updates: {
  Category_Name?: string;
  Category_Color?: string;
  Category_icon?: string;
  Category_is_Primary?: boolean;
}) {
  const updatedCategory = await prisma.category.updateMany({
    where: {
      CategoryId: categoryId,
      userId: userId,
    },
    data: updates,
  });

  return updatedCategory.count > 0; 
}

export async function assignTaskToCategories(TaskID: number, categoryId: number) {
  const task = await prisma.task.findUnique({
    where: { TaskID: TaskID },
  });

  if (!task) {
    throw new Error('Task not found');
  }

  const category = await prisma.category.findUnique({
    where: { CategoryId: categoryId },
  });

  if (!category) {
    throw new Error('Category not found');
  }

  await prisma.task_category.create({
    data: {
      TaskID: TaskID,
      CategoryId: categoryId,
    },
  });
}


export async function removeTaskCategories(taskId: number) {
  await prisma.task_category.deleteMany({
    where: {
      TaskID: taskId,
    },
  });
}

export const getCategoryProgress = async (categoryId: number, userId: number) => {
  const total = await prisma.task_category.count({
    where: {
      CategoryId: categoryId,
      task: {
        UserID: userId,
      },
    },
  });

  const completed = await prisma.task_category.count({
    where: {
      CategoryId: categoryId,
      task: {
        UserID: userId,
        Task_Status: 'Completed',
      },
    },
  });

  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, completed, progress };
};

export const getTaskCount = async (categoryId: number) => {
  const category = await prisma.category.findUnique({
    where: { CategoryId: categoryId },
    include: {
      _count: {
        select: { task_category: true },
      },
    },
  });

  return category?._count.task_category || 0;
};