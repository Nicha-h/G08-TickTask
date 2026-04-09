import { pomodoroModel } from '../models/index.js';
import type {
  Pomodoro,
  CreatePomodoroData,
  UpdatePomodoroData,
  TimerType,
  SessionStatus,
} from '../types/index.js';

const TIMER_DURATIONS: Record<TimerType, number> = {
  work: 1500, 
  short: 300, 
  long: 900, 
};

const getAllSession = async (userId: number): Promise<Pomodoro[]> => {
  const sessions = await pomodoroModel.getPomoSession(userId);
  return sessions.map((session) => ({
    ...session,
    last_updated: session.last_updated.toString(),
  }));
};

const getPomoSessionbyId = async (
  sessionId: number
): Promise<Pomodoro> => {
  const session = await pomodoroModel.getPomoSessionbyId(sessionId);
  if (!session){
    throw new Error('Session not found');
  }
  return {
    ...session,
    last_updated: session.last_updated.toString(),
  };
}

const createSession = async (sessionData: CreatePomodoroData): Promise<Pomodoro> => {
  const session = await pomodoroModel.createSession(sessionData);
  return {
    ...session,
    last_updated: session.last_updated.toString(),
  };
};

const updateSession = async (
  sessionId: number,
  data: UpdatePomodoroData
): Promise<Pomodoro> => {
  const updatedSession = await pomodoroModel.updatePomo(sessionId, data);
    if (!updatedSession) {
    throw new Error('Failed to update session');
    }
    return {
    ...updatedSession,
    last_updated: updatedSession.last_updated.toString(),
  };
};
const deleteSession = async (sessionId: number): Promise<void> => {
  await pomodoroModel.deletePomo(sessionId);
}
const getActiveSession = async (userId: number): Promise<Pomodoro | null> => {
  const session = await pomodoroModel.getActiveSession(userId);
  if (!session) {
    return null;
  }
  return {
    ...session,
    last_updated: session.last_updated.toString(),
  };
};

/**
 * Calculate elapsed time since session was last updated (in seconds)
 */
const calculateElapsedTime = (lastUpdated: Date): number => {
  const now = new Date();
  return Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);
};

const restoreSessionTime = async (
  sessionId: number
): Promise<Pomodoro> => {
  const session = await pomodoroModel.getPomoSessionbyId(sessionId);
  if (!session) {
    throw new Error('Session not found');
  }

  // If session is active, calculate how much time has elapsed
  if (session.Status === 'active') {
    const lastUpdated = new Date(session.last_updated);
    const elapsedSeconds = calculateElapsedTime(lastUpdated);
    const newRemainingSeconds = Math.max(
      0,
      session.remaining_seconds - elapsedSeconds
    );

    // Determine new status: if time ran out, mark as completed
    const newStatus = newRemainingSeconds === 0 ? ('completed' as SessionStatus) : undefined;

    // Single update combining both remaining time and status if needed
    const updateData: UpdatePomodoroData = {
      remaining_seconds: newRemainingSeconds,
    };
    
    if (newStatus) {
      updateData.status = newStatus;
    }

    const updatedSession = await pomodoroModel.updatePomo(sessionId, updateData);

    if (!updatedSession) {
      throw new Error('Failed to restore session');
    }

    return {
      ...updatedSession,
      last_updated: updatedSession.last_updated.toString(),
    };
  }

  // If session is paused, just return current state
  return {
    ...session,
    last_updated: session.last_updated.toString(),
  };
};

const startSession = async (
  userId: number,
  timerType: TimerType = 'work'
): Promise<Pomodoro> => {
  // Get any active session and pause it
  const activeSession = await pomodoroModel.getActiveSession(userId);
  if (activeSession && activeSession.SessionId) {
    await pomodoroModel.updatePomo(activeSession.SessionId, {
      status: 'paused' as SessionStatus,
    });
  }

  // Create new session
  const duration = TIMER_DURATIONS[timerType] || 1500;
  const newSession = await pomodoroModel.createSession({
    UserID: userId,
    duration_seconds: duration,
    timer_type: timerType,
  });

  return {
    ...newSession,
    last_updated: newSession.last_updated.toString(),
  };
};

const pauseSession = async (sessionId: number): Promise<Pomodoro> => {
  const session = await pomodoroModel.getPomoSessionbyId(sessionId);
  if (!session) {
    throw new Error('Session not found');
  }

  let remainingSeconds = session.remaining_seconds;
  if (session.Status === 'active') {
    const elapsedSeconds = calculateElapsedTime(new Date(session.last_updated));
    remainingSeconds = Math.max(0, session.remaining_seconds - elapsedSeconds);
  }

  // Auto-complete if time has run out during pause
  const newStatus = remainingSeconds === 0 ? ('completed' as SessionStatus) : ('paused' as SessionStatus);

  const pausedSession = await pomodoroModel.updatePomo(sessionId, {
    status: newStatus,
    remaining_seconds: remainingSeconds,
  });

  if (!pausedSession) {
    throw new Error('Failed to pause session');
  }

  return {
    ...pausedSession,
    last_updated: pausedSession.last_updated.toString(),
  };
};

const resumeSession = async (sessionId: number): Promise<Pomodoro> => {
  const session = await pomodoroModel.getPomoSessionbyId(sessionId);
  if (!session) {
    throw new Error('Session not found');
  }

  if (session.Status !== 'paused') {
    throw new Error('Session is not paused');
  }

  const resumedSession = await pomodoroModel.updatePomo(sessionId, {
    status: 'active' as SessionStatus,
  });

  if (!resumedSession) {
    throw new Error('Failed to resume session');
  }

  return {
    ...resumedSession,
    last_updated: resumedSession.last_updated.toString(),
  };
};

const completeSession = async (sessionId: number): Promise<Pomodoro> => {
  const completedSession = await pomodoroModel.updatePomo(sessionId, {
    status: 'completed' as SessionStatus,
    remaining_seconds: 0,
  });

  if (!completedSession) {
    throw new Error('Failed to complete session');
  }

  return {
    ...completedSession,
    last_updated: completedSession.last_updated.toString(),
  };
};

const updateRemainingTime = async (
  sessionId: number,
  remainingSeconds: number
): Promise<Pomodoro> => {
  if (remainingSeconds < 0) {
    throw new Error('Remaining seconds cannot be negative');
  }

  const session = await pomodoroModel.getPomoSessionbyId(sessionId);
  if (!session) {
    throw new Error('Session not found');
  }

  if (remainingSeconds > session.duration_seconds) {
    throw new Error('Remaining seconds cannot exceed session duration');
  }

  const updatedSession = await pomodoroModel.updatePomo(sessionId, {
    remaining_seconds: remainingSeconds,
  });

  if (!updatedSession) {
    throw new Error('Failed to update remaining time');
  }

  return {
    ...updatedSession,
    last_updated: updatedSession.last_updated.toString(),
  };
};

const getTimerDuration = (timerType: TimerType): number => {
  return TIMER_DURATIONS[timerType] || 1500;
};

const getNextTimerType = (currentType: TimerType, completedCycles: number = 0): TimerType => {
  // After work session, determine break type
  if (currentType === 'work') {
    // After every 4th work cycle, take long break
    if (completedCycles > 0 && completedCycles % 4 === 0) {
      return 'long';
    }
    return 'short';
  }
  // After any break, return to work
  return 'work';
};

const getSessionProgress = (session: Pomodoro): number => {
  if (session.duration_seconds === 0) return 0;
  const elapsed = session.duration_seconds - session.remaining_seconds;
  return Math.round((elapsed / session.duration_seconds) * 100);
};

const restoreUserSession = async (userId: number): Promise<Pomodoro | null> => {
  try {
    const session = await getActiveSession(userId);
    if (session && session.SessionId) {
      // Restore time if session was active
      return await restoreSessionTime(session.SessionId);
    }
    return null;
  } catch (error) {
    throw new Error(`Failed to restore user session: ${String(error)}`);
  }
};

export const PomodoroServices = {
  getAllSession,
  getPomoSessionbyId,
  createSession,
  updateSession,
  deleteSession,
  getActiveSession,
  restoreSessionTime,
  startSession,
  pauseSession,
  resumeSession,
  completeSession,
  updateRemainingTime,
  getTimerDuration,
  getNextTimerType,
  getSessionProgress,
  restoreUserSession,
};