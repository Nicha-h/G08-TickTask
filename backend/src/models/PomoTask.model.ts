import { db } from '../database/db.js';
import * as dotenv from 'dotenv';
import {type CreateTask, type Task, type UpdateTask } from '../types/index.js';
import {PomoTaskStatus} from '../types/index.js';
dotenv.config();

export async function getAllPomoTask(userId: number): Promise<Task[]> {
  const query = `
    SELECT t.* 
    FROM pomodoro_task t
    JOIN pomodoro_sessions s ON t.SessionId = s.SessionId
    WHERE s.UserID = ?
    ORDER BY t.Pomo_TaskId DESC
  `;
  const values = [userId];

  const [rows] = await db.query(query, values);
  return rows as Task[];
}





export async function findBySession(sessionId: number): Promise<Task[]> {
    const [rows] = await db.query('SELECT * FROM pomodoro_task WHERE SessionId =?', [sessionId]);
    return rows as Task[];
}

export async function findByUserId(userId: number): Promise<Task | null> {
  const [rows] = await db.query(
      `
      SELECT pt.* 
      FROM pomodoro_task pt
      JOIN pomodoro_sessions s ON pt.SessionId = s.SessionId
      WHERE s.UserID = ?
      `,
      [userId]
  );

  const tasks = rows as Task[];
  return tasks.length > 0 ? tasks[0] : null;
}

export async function CreatePomoTask(this: any, taskData: CreateTask): Promise<Task> {
  let {
    Pomo_Task_Title,
    Pomo_Task_Short = 5,
    Pomo_Task_Long = 15,
    SessionId
  } = taskData;

  SessionId = Number(SessionId);

  if (!SessionId || isNaN(SessionId)) {
    throw new Error('SessionId is required and must be a valid number.');
  }

  const [result] = await db.query(
    `
    INSERT INTO pomodoro_task
    (Pomo_Task_Title, Pomo_Task_Short, Pomo_Task_Long, SessionId, Pomo_Task_Status)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      Pomo_Task_Title,
      Pomo_Task_Short,
      Pomo_Task_Long,
      SessionId,
      PomoTaskStatus.PENDING,
    ]
  );

  const insertId = (result as any).insertId;
  return this.findById(insertId) as Promise<Task>;
}



export async function updatePomoTask(this: any, taskId: number, data: UpdateTask): Promise<Task | null>{
    const updateFields: string[] = [];
    const values: any[] = [];

    if (data.Pomo_Task_Title !== undefined) {
        updateFields.push(`Pomo_Task_Title = ?`);
        values.push(data.Pomo_Task_Title);
      }
  
      if (data.Pomo_Task_Short !== undefined) {
        updateFields.push(`Pomo_Task_Short = ?`);
        values.push(data.Pomo_Task_Short);
      }
  
      if (data.Pomo_Task_Long !== undefined) {
        updateFields.push(`Pomo_Task_Long = ?`);
        values.push(data.Pomo_Task_Long);
      }
  
      if (data.SessionId !== undefined) {
        updateFields.push(`SessionId = ?`);
        values.push(data.SessionId);
      }
  
      if (data.Pomo_Task_Status !== undefined) {
        updateFields.push(`Pomo_Task_Status = ?`);
        values.push(data.Pomo_Task_Status);
      }
  
      // If no fields to update
      if (updateFields.length === 0) {
        return null;
      }
      
      // Add taskId to values array
      values.push(taskId);
      
      const query = `
        UPDATE pomodoro_task 
        SET ${updateFields.join(', ')} 
        WHERE Pomo_TaskId = ?
      `;
      
      await db.query(query, values);
      return this.findById(taskId);
}

export async function deletePomoTask(taskId: number ): Promise<boolean>{
    const[result] = await db.query(
        'DELETE FROM pomodoro_task WHERE Pomo_TaskId = ?', [taskId]
    );
    return (result as any).affectedRows > 0;
}

export async function assignToSession(this: any, taskId: number, sessionId: number): Promise<Task | null> {
    await db.query(
      'UPDATE pomodoro_task SET SessionId = ? WHERE Pomo_TaskId = ?',
      [sessionId, taskId]
    );
    return this.findById(taskId);
}
export function findById(taskId: number) {
  throw new Error('Function not implemented.');
}

