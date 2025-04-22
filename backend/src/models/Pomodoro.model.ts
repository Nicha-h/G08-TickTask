import { db } from '../database/db.js';
import * as dotenv from 'dotenv';
import { SessionStatus, TimerType, type CreateSession, type Session, type UpdateSession } from '../types/index.js';
import type {RowDataPacket } from 'mysql2';
dotenv.config();

export async function getPomoSession(userId: number){
    const [rows] = await db.query('SELECT * FROM pomodoro_sessions WHERE UserID = ? ORDER BY last_updated ASC', [userId]);
    return rows as Session[];
}

export async function getPomoSessionbyId(sessionId: number){
    const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM pomodoro_sessions WHERE SessionId = ? LIMIT 1', [sessionId]);
    const sessions = rows as Session[];
    return sessions.length > 0 ? sessions[0] : null;
}

export async function createSession(this: any, sessionData: CreateSession): Promise<Session> {
    const { UserId, duration_seconds = 1500, timer_type = TimerType.WORK } = sessionData;
    const [result] = await db.query(
        `
        INSERT INTO pomodoro_sessions 
        (UserId, Status, StartTime, duration_seconds, remaining_seconds, timer_type, last_updated) 
        VALUES (?, ?, NOW(), ?, ?, ?, NOW())
        `,
        [UserId, SessionStatus.ACTIVE, duration_seconds, duration_seconds, timer_type]
      );
    
      const insertId = (result as any).insertId;
      return this.getPomoSessionbyId(insertId) as Promise<Session>;
}

export async function updatePomo(this: any, sessionId: number, data: UpdateSession) {
    
    const updateFields: string[] = [];
    const values: any[] = [];

    if (data.Status !== undefined) {
      updateFields.push(`Status = ?`);
      values.push(data.Status);
      
      // If status is changed to PAUSED, update PausedTime
      if (data.Status === SessionStatus.PAUSED) {
        updateFields.push(`PausedTime = NOW()`);
      }
      
      // If status is changed to COMPLETED, update EndTime
      if (data.Status === SessionStatus.COMPLETED) {
        updateFields.push(`EndTime = NOW()`);
      }
    }

    if (data.remaining_seconds !== undefined) {
      updateFields.push(`remaining_seconds = ?`);
      values.push(data.remaining_seconds);
    }

    if (data.timer_type !== undefined) {
      updateFields.push(`timer_type = ?`);
      values.push(data.timer_type);
    }

    // Always update last_updated timestamp
    updateFields.push(`last_updated = NOW()`);

    // If no fields to update
    if (updateFields.length === 0) {
      return null;
    }
    values.push(sessionId);
    
    const query = `
      UPDATE pomodoro_sessions 
      SET ${updateFields.join(', ')} 
      WHERE SessionId = ?
    `;
    
    await db.query(query, values);
    return this.getPomoSessionbyId(sessionId);
}

export async function deletePomo(sessionId: number): Promise<boolean> {
    const [result] = await db.query(
      'DELETE FROM pomodoro_sessions WHERE SessionId = ?',
      [sessionId]
    );
    return (result as any).affectedRows > 0;
}

export async function getActiveSession(userId: number): Promise<Session | null> {
    const [rows] = await db.query(
      `
      SELECT * FROM pomodoro_sessions 
      WHERE UserId = ? AND Status IN (?, ?) 
      ORDER BY last_updated DESC 
      LIMIT 1
      `,
      [userId, SessionStatus.ACTIVE, SessionStatus.PAUSED]
    );
    
    const sessions = rows as Session[];
    return sessions.length > 0 ? sessions[0] : null;
}
export function updatedSession(sessionid: number, sessionData: UpdateSession) {
    throw new Error('Function not implemented.');
}

