import { db } from '../database/db.js';
import type { TaskStatus, User } from '../types/index.js';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import * as dotenv from 'dotenv';
import type { Context } from 'hono';
import type { Task } from '../schemas/Schemas.js';
dotenv.config();

const now = new Date();
const formattedDate = now.toISOString().split('T')[0];
const currentTime = now.toTimeString().split(' ')[0]; 

export async function getTasksByDate(date: string): Promise<Task[]> {
    const [rows] = await db.query<RowDataPacket[]>(
        'SELECT * FROM task WHERE Task_Start_Date = ? ORDER BY Task_Start_Time ASC',
        [date]
    );
    return rows as Task[];
}

export async function getTasksByUser(userId: number, date?: string): Promise<Task[]> {
    let query = 'SELECT * FROM task WHERE UserID = ?';
    const params: any[] = [userId];
    
    if (date) {
        query += ' AND Task_Start_Date <= ? AND Task_End_Date >= ?';
        params.push(date, date);
    }
    
    query += ' ORDER BY Task_Start_Date, Task_Start_Time ASC';
    const [rows] = await db.query<RowDataPacket[]>(query, params);
    return rows as Task[];
}

export async function createTask(taskData: {
    
    UserID: number;
    Task_Title: string;
    Task_Description?: string | null;
    Task_Start_Date?: string;
    Task_End_Date?: string;
    Task_Status?: TaskStatus;
    Task_Color?: string;
    Task_Icon?: string | null;
    Task_Start_Time?: string;
    Task_End_Time?: string;
  }): Promise<Task> {
   
    const taskToInsert = {
      Task_Title: taskData.Task_Title,
      Task_Description: taskData.Task_Description ?? null,
      Task_Icon: taskData.Task_Icon ?? null,
      Task_Start_Date: taskData.Task_Start_Date ?? formattedDate,
      Task_End_Date: taskData.Task_End_Date ?? formattedDate,
      Task_Status: taskData.Task_Status ?? 'Incomplete' as TaskStatus,
      Task_Color: taskData.Task_Color ?? '#A7A7A7',
      Task_Start_Time: taskData.Task_Start_Time ?? currentTime,
      Task_End_Time: taskData.Task_End_Time ?? '23:59:59',
      UserID: taskData.UserID
    };

    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO task 
       (Task_Title, Task_Description, Task_Start_Date, Task_End_Date, 
        Task_Status, Task_Color, Task_Icon, Task_Start_Time, Task_End_Time, UserID) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        taskToInsert.Task_Title,
        taskToInsert.Task_Description,
        taskToInsert.Task_Start_Date,
        taskToInsert.Task_End_Date,
        taskToInsert.Task_Status,
        taskToInsert.Task_Color,
        taskToInsert.Task_Icon,
        taskToInsert.Task_Start_Time,
        taskToInsert.Task_End_Time,
        taskToInsert.UserID
      ]
    );
  
    if (!result.insertId) {
      throw new Error('Failed to insert task');
    }
  
     return {
    TaskID: result.insertId,
    ...taskToInsert
  };
}

export const updateTask = async (c: Context) => {
  const id = c.req.param('id');
  const user = c.get('user') as { id: number };
  const body = await c.req.json();
  
  try {
      const [result] = await db.execute(
        `UPDATE task 
         SET Task_Title = ?, Task_Description = ?, Task_Status = ?, Task_Color = ?, 
             Task_Icon = ?, Task_Start_Date = ?, Task_End_Date = ?, 
             Task_Start_Time = ?, Task_End_Time = ?
         WHERE TaskID = ? AND UserID = ?`,
        [
          body.Task_Title,
          body.Task_Description,
          body.Task_Status,
          body.Task_Color,
          body.Task_Icon,
          body.Task_Start_Date,
          body.Task_End_Date,
          body.Task_Start_Time,
          body.Task_End_Time,
          id,
          user.id
        ]
      );
  
      return c.json({ message: 'Task updated successfully' });
    } catch (err) {
      console.error('Error updating task:', err);
      return c.json({ error: 'Failed to update task' }, 500);
    }
};
  
export const deleteTask = async (c: Context) => {
  const id = c.req.param('id');
  const user = c.get('user') as { id: number };
  
  try {
    const [result] = await db.execute(
      'DELETE FROM task WHERE TaskID = ? AND UserID = ?',
      [id, user.id]
    );
  
    return c.json({ message: 'Task deleted successfully' });
  } catch (error) {
      console.error('Error deleting task:', error);
      return c.json({ error: 'Failed to delete task' }, 500);
  }
};
  