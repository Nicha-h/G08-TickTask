import { PrismaClient, type pomodoro_sessions } from '../../generated/prisma/index.js';
import * as dotenv from 'dotenv';
import {
  type CreatePomodoroData,
  type UpdatePomodoroData,
} from '../types/index.js';
import { PomodoroSchemas } from '../schemas/index.js';
dotenv.config();
const prisma = new PrismaClient();
const now = new Date();

// const formattedDate = now.toISOString().split('T')[0];
// const currentTime = now.toTimeString().split(' ')[0];

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


export async function createSession(sessionData: CreatePomodoroData): Promise<pomodoro_sessions> {
  const {
    UserID,
    duration_seconds = 1500,
    timer_type = PomodoroSchemas.TimerTypeEnum.enum.work,
  } = sessionData;

  return await prisma.pomodoro_sessions.create({
    data: {
      UserID,
      Status: 'active',
      StartTime: new Date().toISOString().split('T')[0],
      PausedTime: '0',
      duration_seconds,
      remaining_seconds: duration_seconds,
      timer_type,
      last_updated: new Date(),
    },
  });
}

export async function updatePomo(
  sessionId: number,
  data: UpdatePomodoroData
): Promise<pomodoro_sessions | null> {
  const updateData: Record<string, unknown> = {
    last_updated: new Date().toISOString(),
  };

  if (data.status !== undefined) {
    updateData.Status = data.status;

    if (data.status === 'paused') {
      updateData.PausedTime = new Date().toISOString();
    }
    if (data.status === 'completed') {
      updateData.EndTime = new Date().toISOString();
    }
  }

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

  return await prisma.pomodoro_sessions.delete({
    where: { SessionId: sessionId },
  });
}

export async function getActiveSession(userId: number): Promise<pomodoro_sessions | null> {
  const sessions = await prisma.pomodoro_sessions.findMany({
    where: {
      UserID: userId,
      Status: { in: ['active', 'paused'] },
    },
    orderBy: { last_updated: 'desc' },
    take: 1,
  });

  return sessions.length > 0 ? sessions[0] : null;
}