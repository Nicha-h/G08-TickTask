import type { Context } from 'hono';
import * as SessionModel from '../models/Pomodoro.model.js';
import { SessionStatus, TimerType, type CreateSession, type UpdateSession} from '../types/index.js';

export async function getAllSession(c:Context) {
    const userId = Number(c.req.param('userId'));
    try{
        const sessions = await SessionModel.getPomoSession(userId);
        return c.json({success: true, data: sessions});

    }catch (error){
        return c.json({success: false, message: 'Failed to fetch sessions', error: String(error)}, 500);
    }
}

export async function getPomoSessionbyId(c:Context) {
    const sessionid = Number(c.req.param('id'));

    try {
        const session = await SessionModel.getPomoSessionbyId(sessionid);
        if (!session) {
            return c.json({ success: false, message: 'Session not found' }, 404);
          }
        return c.json({ success: true, data: session });
    } catch (error) {
        return c.json({success: false, message: 'Failed to fetch sessions', error: String(error)}, 500);
    }
}

export async function createSessionController(c: Context) {
    const sessionid = Number(c.req.param('id'));
    try {
        const body = await c.req.json();
        const sessionData: CreateSession = {
            UserID: body.UserId,
            duration_seconds: body.duration || 1500,
            timer_type: body.timer_type as TimerType,
            PausedTime: body.duration || 1500,
        };

        const session = await SessionModel.createSession(sessionData);
        return c.json({ success: true, data: session }, 201);
    } catch (error) {
        return c.json({success: false, message: 'Failed to create sessions', error: String(error)}, 500);
    }
}

export async function updatedSessionController(c: Context) {
    const sessionId = Number(c.req.param('id'));
    
    try {
      const body = await c.req.json();
      const sessionData: UpdateSession = {
        Status: body.status,
        remaining_seconds: body.remaining_seconds,
        timer_type: body.timer_type
      };
      
      const updatedSession = await SessionModel.updatePomo(sessionId, sessionData);
      
      if (!updatedSession) {
        return c.json({ success: false, message: 'Session not found or no changes made' }, 404);
      }
      
      return c.json({ success: true, data: updatedSession });
    } catch (error) {
      return c.json({ success: false, message: 'Failed to update session', error: String(error) }, 500);
    }
}

export async function deleteSessionController(c: Context) {
    const sessionId  = Number(c.req.param('id'));

    try {
        const deleted = await SessionModel.deletePomo(sessionId);
        
        if (!deleted) {
            return c.json({ success: false, message: 'Session not found' }, 404);
          }
          return c.json({ success: true, message: 'Session deleted successfully' });
    } catch (error) {
        return c.json({success: false, message: 'Failed to delete sessions', error: String(error)}, 500);
    }
}

export async function getActiveSessionController(c: Context) {
    const userId = Number(c.req.param('userId'));
    try {
        const session = await SessionModel.getActiveSession(userId);
        if(!session){
            return c.json({success: false, message: 'No active session found'}, 404);
        }
        return c.json({ success: true, data: session });
    } catch (error) {
        return c.json({success: false, message: 'Failed to fetch active session', error: String(error)}, 500);
    }
}

export async function startSession(c:Context) {
    try {
        const body = await c.req.json();
        const userId = Number(body.userId);
        const timerType = body.timer_type as TimerType || TimerType.WORK;
        const durationSeconds = Number(body.duration_seconds) || 1500;
        const activeSession = await SessionModel.getActiveSession(userId);
      
        if (activeSession) {
          await SessionModel.updatePomo(activeSession.SessionId!, { Status: SessionStatus.PAUSED });
        }
        const session = await SessionModel.createSession({
            UserID: userId,
            duration_seconds: durationSeconds,
            timer_type: timerType
          });
          
        return c.json({ success: true, data: session }, 201);
    } catch (error) {
          return c.json({ success: false, message: 'Failed to start session', error: String(error) }, 500);
    }
}

export async function pauseSession(c:Context) {
  try {
      const body = await c.req.json();
      const sessionId = Number(body.sessionId);
      
      if (!sessionId) {
          return c.json({ success: false, message: 'Session ID is required' }, 400);
      }

      const session = await SessionModel.updatePomo(sessionId, { Status: SessionStatus.PAUSED });
      
      if (!session) {
          return c.json({ success: false, message: 'Session not found' }, 404);
      }
      
      return c.json({ success: true, data: session });
  } catch (error) {
      return c.json({ success: false, message: 'Failed to pause session', error: String(error) }, 500);
  }
}

export async function resumeSession(c:Context) {
    const sessionId = Number(c.req.param('id'));
    
    try {
      const session = await SessionModel.updatePomo(sessionId, { Status: SessionStatus.ACTIVE });
      
      if (!session) {
        return c.json({ success: false, message: 'Session not found' }, 404);
      }
      
      return c.json({ success: true, data: session });
    } catch (error) {
      return c.json({ success: false, message: 'Failed to resume session', error: String(error) }, 500);
    }
}

export async function completeSession(c: Context) {
    const sessionId = Number(c.req.param('id'));
    
    try {
      const session = await SessionModel.updatePomo(sessionId, { 
        Status: SessionStatus.COMPLETED,
        remaining_seconds: 0
      });
      
      if (!session) {
        return c.json({ success: false, message: 'Session not found' }, 404);
      }
      
      return c.json({ success: true, data: session });
    } catch (error) {
      return c.json({ success: false, message: 'Failed to complete session', error: String(error) }, 500);
    }
}

export async function updateRemainingTime(c:Context) {
    const sessionId = Number(c.req.param('id'));
    
    try {
      const body = await c.req.json();
      const remainingSeconds = Number(body.remaining_seconds);
      
      if (isNaN(remainingSeconds)) {
        return c.json({ success: false, message: 'Invalid remaining seconds value' }, 400);
      }
      
      const session = await SessionModel.updatePomo(sessionId, { remaining_seconds: remainingSeconds });
      
      if (!session) {
        return c.json({ success: false, message: 'Session not found' }, 404);
      }
      
      return c.json({ success: true, data: session });
    } catch (error) {
      return c.json({ success: false, message: 'Failed to update remaining time', error: String(error) }, 500);
    }
}
