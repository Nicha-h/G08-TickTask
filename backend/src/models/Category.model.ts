import type { ResultSetHeader } from 'mysql2';
import {db} from '../database/db.js';
import type { Context } from 'hono';



export async function getUserCategories(userId: number) {
  const [rows] = await db.query('SELECT * FROM category WHERE UserID = ?', [userId]);
  return rows;
}

export async function createCategory(userId: number, name: string, color: string, icon: string, isCustom = false) {
    const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO category (Category_Name, UserID, Category_Color, Category_Icon, Category_is_Primary) VALUES (?, ?, ?, ?, ?)',
    [name, userId, color, icon, isCustom]
    );

    return result.insertId;
}

export async function deleteCategory(categoryId: number, userId: number) {
  await db.execute('DELETE FROM category WHERE CategoryID = ? AND UserID = ?', [categoryId, userId]);
}

export async function updateCategory(categoryId: number, userId: number, color: string, icon: string, Category_is_Primary: boolean) {
  const [result] = await db.execute(
    'UPDATE category SET Category_Color = ?, Category_Icon = ?, Category_is_Primary = ? WHERE CategoryID = ? AND UserID = ?',
    [color, icon, Category_is_Primary, categoryId, userId]
  );
  return result; 
}

export async function patchCategory(categoryId: number, userId: number,updates: {
    Category_Name?: string;
    Category_Color?: string;
    Category_icon?: string | null;
    Category_is_Primary?: boolean;
  }
) {
  const keys = Object.keys(updates);
  if (keys.length === 0) return null;

  const fields = keys.map(key => `\`${key}\` = ?`).join(', ');
  const values = Object.values(updates);

  const [result] = await db.execute<ResultSetHeader>(
    `UPDATE category SET ${fields} WHERE CategoryID = ? AND UserID = ?`,
    [...values, categoryId, userId]
  );

  return result.affectedRows > 0;
}

export async function assignTaskToCategories(taskId: number, categoryIds: number[]) {
  const values = categoryIds.map(id => `(${taskId}, ${id})`).join(',');
  await db.execute(`INSERT INTO task_category (TaskID, CategoryID) VALUES ${values}`);
}

export async function removeTaskCategories(taskId: number) {
  await db.execute('DELETE FROM task_category WHERE TaskID = ?', [taskId]);
}

export const getCategoryProgress = async (categoryId:number, userId:number) => {
    
  const [totaltask] = await db.query(
    `SELECT COUNT(*) as total FROM task_category 
     JOIN task ON task.TaskID = task_category.TaskID 
     WHERE task_category.CategoryID = ? AND task.UserID = ?`,[categoryId, userId]);
  const total = (totaltask as any)[0].total;

  const [completedtask] = await db.query(
    `SELECT COUNT(*) as completed FROM task_category 
    JOIN task ON task.TaskID = task_category.TaskID 
    WHERE task_category.CategoryID = ? AND task.UserID = ? AND task.Task_Status = 'completed'`,
    [categoryId, userId]);
        
    const completed = (completedtask as any)[0].completed;   
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;     
    return{total, completed, progress};
    
};
