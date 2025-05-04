import { Prisma, PrismaClient, type pomodoro_sessions } from '../generated/prisma/index.js';
import * as dotenv from 'dotenv';
import {
  SessionStatus,
  TimerType,
  type CreateSession,
  type Session,
  type UpdateSession,
} from '../types/index.js';

dotenv.config();
const prisma = new PrismaClient();
const now = new Date();

const formattedDate = now.toISOString().split('T')[0];
const currentTime = now.toTimeString().split(' ')[0];

export async function getPomoSession(userId: number): Promise<pomodoro_sessions[]> {
  return await prisma.pomodoro_sessions.findMany({
    where: { UserID: userId },
    orderBy: { last_updated: 'asc' },
  });
}

export async function getPomoSessionbyId(sessionId: number): Promise<pomodoro_sessions | null> {
  return await prisma.pomodoro_sessions.findUnique({
    where: { SessionId: sessionId },
  });
}

export async function createSession(this: any, sessionData: CreateSession): Promise<pomodoro_sessions> {
  const { UserID, duration_seconds = 1500, timer_type = TimerType.WORK } = sessionData;

  const createdSession = await prisma.pomodoro_sessions.create({
    data: {
      UserID,
      Status: SessionStatus.ACTIVE,
      StartTime: formattedDate,
      PausedTime: "0",
      duration_seconds,
      remaining_seconds: duration_seconds,
      timer_type,
      last_updated: new Date(),
    },
  });

  return createdSession;
}

export async function updatePomo(this: any, sessionId: number, data: UpdateSession): Promise<pomodoro_sessions | null> {
  const updateData: any = {
    last_updated: new Date(),
  };

  if (data.Status !== undefined) {
    updateData.Status = data.Status;
    if (data.Status === SessionStatus.PAUSED) {
      updateData.PausedTime = new Date().toISOString(); 
    }
    if (data.Status === SessionStatus.COMPLETED) {
      updateData.EndTime = new Date().toISOString(); 
    }
  }
  updateData.last_updated = new Date().toISOString(); 
  

  if (data.remaining_seconds !== undefined) {
    updateData.remaining_seconds = data.remaining_seconds;
  }

  if (data.timer_type !== undefined) {
    updateData.timer_type = data.timer_type;
  }

  return await prisma.pomodoro_sessions.update({
    where: { SessionId: sessionId },
    data: updateData,
  });
}

export async function deletePomo(sessionId: number): Promise<pomodoro_sessions> {
  await prisma.pomodoro_task.deleteMany({
    where: { SessionId: sessionId },
  });

  const deletedSession = await prisma.pomodoro_sessions.delete({
    where: { SessionId: sessionId },
  });

  return deletedSession;
}

export async function getActiveSession(userId: number): Promise<pomodoro_sessions | null> {
  const sessions = await prisma.pomodoro_sessions.findMany({
    where: {
      UserID: userId,
      Status: { in: [SessionStatus.ACTIVE, SessionStatus.PAUSED] },
    },
    orderBy: { last_updated: 'desc' },
    take: 1,
  });

  return sessions.length > 0 ? sessions[0] : null;
}