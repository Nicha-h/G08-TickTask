import { db } from '../index.js'
import * as dotenv from 'dotenv';
import { type CreateTask, type Task, type UpdateTask } from '../types/index.js';
import { PomoTaskStatus } from '../types/index.js';
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
    const [rows] = await db.query('SELECT * FROM pomodoro_task WHERE SessionId = ?', [sessionId]);
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

export async function findById(taskId: number): Promise<Task | null> {
  const [rows] = await db.query('SELECT * FROM pomodoro_task WHERE Pomo_TaskId = ?', [taskId]);
  const tasks = rows as Task[];
  return tasks.length > 0 ? tasks[0] : null;
}

export async function CreatePomoTask(taskData: CreateTask): Promise<Task> {
  let {
    Pomo_Task_Title,
    Pomo_Task_Short = 5,
    Pomo_Task_Long = 15,
    SessionId = null,
    Pomo_Target_Count = 0 // Default target count is 0 (unlimited)
  } = taskData;

  if (SessionId) {
    SessionId = Number(SessionId);
    if (isNaN(SessionId)) {
      throw new Error('SessionId must be a valid number.');
    }
  }

  const [result] = await db.query(
    `
    INSERT INTO pomodoro_task
    (
      Pomo_Task_Title, 
      Pomo_Task_Short, 
      Pomo_Task_Long, 
      SessionId, 
      Pomo_Task_Status, 
      Pomo_Completed_Count,
      Pomo_Target_Count
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      Pomo_Task_Title,
      Pomo_Task_Short,
      Pomo_Task_Long,
      SessionId,
      PomoTaskStatus.PENDING,
      0, // Initialize completed count as 0
      Pomo_Target_Count
    ]
  );

  const insertId = (result as any).insertId;
  return findById(insertId) as Promise<Task>;
}

export async function updatePomoTask(taskId: number, data: UpdateTask): Promise<Task | null> {
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

    if (data.Pomo_Completed_Count !== undefined) {
        updateFields.push(`Pomo_Completed_Count = ?`);
        values.push(data.Pomo_Completed_Count);
    }

    if (data.Pomo_Target_Count !== undefined) {
        updateFields.push(`Pomo_Target_Count = ?`);
        values.push(data.Pomo_Target_Count);
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
    return findById(taskId);
}

export async function deletePomoTask(taskId: number): Promise<boolean> {
    const [result] = await db.query(
        'DELETE FROM pomodoro_task WHERE Pomo_TaskId = ?', [taskId]
    );
    return (result as any).affectedRows > 0;
}

export async function assignToSession(taskId: number, sessionId: number): Promise<Task | null> {
    await db.query(
      'UPDATE pomodoro_task SET SessionId = ? WHERE Pomo_TaskId = ?',
      [sessionId, taskId]
    );
    return findById(taskId);
}

// New functions for pomodoro counter management

/**
 * Increment the completed pomodoro count for a task
 * If target count is set and reached, updates task status to COMPLETED
 */
export async function incrementPomoCounter(taskId: number): Promise<Task | null> {
    const task = await findById(taskId);
    
    if (!task) {
        throw new Error('Task not found');
    }
    
    const currentCount = task.Pomo_Completed_Count || 0;
    const newCount = currentCount + 1;
    
    // Check if we've reached the target (if one exists)
    let newStatus = task.Pomo_Task_Status;
    if (task.Pomo_Target_Count > 0 && newCount >= task.Pomo_Target_Count) {
        newStatus = PomoTaskStatus.COMPLETED;
    }
    
    const [result] = await db.query(
        `UPDATE pomodoro_task 
         SET Pomo_Completed_Count = ?, Pomo_Task_Status = ? 
         WHERE Pomo_TaskId = ?`,
        [newCount, newStatus, taskId]
    );
    
    return findById(taskId);
}

/**
 * Reset the completed pomodoro count back to zero
 */
export async function resetPomoCounter(taskId: number): Promise<Task | null> {
    await db.query(
        'UPDATE pomodoro_task SET Pomo_Completed_Count = 0 WHERE Pomo_TaskId = ?',
        [taskId]
    );
    
    return findById(taskId);
}

/**
 * Set the target number of pomodoros for a task
 */
export async function setPomoTargetCount(taskId: number, targetCount: number): Promise<Task | null> {
    if (targetCount < 0) {
        throw new Error('Target count cannot be negative');
    }
    
    await db.query(
        'UPDATE pomodoro_task SET Pomo_Target_Count = ? WHERE Pomo_TaskId = ?',
        [targetCount, taskId]
    );
    
    return findById(taskId);
}

/**
 * Get the progress information for a task
 */
export async function getTaskProgress(taskId: number): Promise<{completed: number, target: number, isCompleted: boolean}> {
    const task = await findById(taskId);
    
    if (!task) {
        throw new Error('Task not found');
    }
    
    return {
        completed: task.Pomo_Completed_Count || 0,
        target: task.Pomo_Target_Count || 0,
        isCompleted: task.Pomo_Task_Status === PomoTaskStatus.COMPLETED
    };
}