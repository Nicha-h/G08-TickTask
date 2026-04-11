import type { Context } from 'hono';
import * as SessionModel from '../models/Pomodoro.model.js';
import type { SessionStatus, TimerType, CreatePomodoroData, UpdatePomodoroData} from '../types/index.js';

// Helper function to create success response
const successResponse = (data: any, message?: string) => {
  const response: any = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
  if (message) {
    response.message = message;
  }
  return response;
};

// Helper function to create error response
const errorResponse = (name: string, message: string, statusCode: number) => {
  return {
    success: false as const,
    error: { name, message, statusCode },
    timestamp: new Date().toISOString(),
  };
};

export async function getAllSession(c:Context) {
    const userId = Number(c.req.param('userId'));
    try{
        const sessions = await SessionModel.getPomoSession(userId);
        return c.json(successResponse(sessions), 200);

    }catch (error){
        return c.json(errorResponse('Error', 'Failed to fetch sessions', 500), 500);
    }
}

export async function getPomoSessionbyId(c:Context) {
    const sessionid = Number(c.req.param('id'));

    try {
        const session = await SessionModel.getPomoSessionbyId(sessionid);
        if (!session) {
            return c.json(errorResponse('NotFound', 'Session not found', 404), 404);
          }
        return c.json(successResponse(session), 200);
    } catch (error) {
        return c.json(errorResponse('Error', 'Failed to fetch sessions', 500), 500);
    }
}

export async function createSessionController(c: Context) {
    try {
        const body = await c.req.json();
        const sessionData: CreatePomodoroData = {
            UserID: body.UserID,
            duration_seconds: body.duration_seconds || 1500,
            timer_type: body.timer_type,
        };

        const session = await SessionModel.createSession(sessionData);
        return c.json(successResponse(session, 'Session created successfully'), 201);
    } catch (error) {
        return c.json(errorResponse('Error', 'Failed to create sessions', 500), 500);
    }
}

export async function updatedSessionController(c: Context) {
    const sessionId = Number(c.req.param('id'));
    
    try {
      const body = await c.req.json();
      const sessionData: UpdatePomodoroData = {
        status: body.status,
        remaining_seconds: body.remaining_seconds,
        timer_type: body.timer_type
      };
      
      const updatedSession = await SessionModel.updatePomo(sessionId, sessionData);
      
      if (!updatedSession) {
        return c.json(errorResponse('NotFound', 'Session not found or no changes made', 404), 404);
      }
      
      return c.json(successResponse(updatedSession), 200);
    } catch (error) {
      return c.json(errorResponse('Error', 'Failed to update session', 500), 500);
    }
}

export async function deleteSessionController(c: Context) {
    const sessionId  = Number(c.req.param('id'));

    try {
        const deleted = await SessionModel.deletePomo(sessionId);
        
        if (!deleted) {
            return c.json(errorResponse('NotFound', 'Session not found', 404), 404);
          }
          return c.json(successResponse(null, 'Session deleted successfully'), 200);
    } catch (error) {
        return c.json(errorResponse('Error', 'Failed to delete sessions', 500), 500);
    }
}

export async function getActiveSessionController(c: Context) {
    const userId = Number(c.req.param('userId'));
    try {
        const session = await SessionModel.getActiveSession(userId);
        if(!session){
            return c.json(errorResponse('NotFound', 'No active session found', 404), 404);
        }
        return c.json(successResponse(session), 200);
    } catch (error) {
        return c.json(errorResponse('Error', 'Failed to fetch active session', 500), 500);
    }
}

export async function startSession(c:Context) {
    try {
        const body = await c.req.json();
        const userId = Number(body.userId);
        const timerType = body.timer_type || 'work';
        const durationSeconds = Number(body.duration_seconds) || 1500;
        const activeSession = await SessionModel.getActiveSession(userId);
      
        if (activeSession) {
          await SessionModel.updatePomo(activeSession.SessionId!, { status: 'paused' });
        }
        const session = await SessionModel.createSession({
            UserID: userId,
            duration_seconds: durationSeconds,
            timer_type: timerType
          });
          
        return c.json(successResponse(session, 'Session started successfully'), 201);
    } catch (error) {
          return c.json(errorResponse('Error', 'Failed to start session', 500), 500);
    }
}

export async function pauseSession(c:Context) {
  try {
      const body = await c.req.json();
      const sessionId = Number(body.sessionId);
      
      if (!sessionId) {
          return c.json(errorResponse('BadRequest', 'Session ID is required', 400), 400);
      }

      const session = await SessionModel.updatePomo(sessionId, { status: 'paused' });
      
      if (!session) {
          return c.json(errorResponse('NotFound', 'Session not found', 404), 404);
      }
      
      return c.json(successResponse(session), 200);
  } catch (error) {
      return c.json(errorResponse('Error', 'Failed to pause session', 500), 500);
  }
}

export async function resumeSession(c:Context) {
    const sessionId = Number(c.req.param('id'));
    
    try {
      const session = await SessionModel.updatePomo(sessionId, { status: 'active' });
      
      if (!session) {
        return c.json(errorResponse('NotFound', 'Session not found', 404), 404);
      }
      
      return c.json(successResponse(session), 200);
    } catch (error) {
      return c.json(errorResponse('Error', 'Failed to resume session', 500), 500);
    }
}

export async function completeSession(c: Context) {
    const sessionId = Number(c.req.param('id'));
    
    try {
      const session = await SessionModel.updatePomo(sessionId, { 
        status: 'completed',
        remaining_seconds: 0
      });
      
      if (!session) {
        return c.json(errorResponse('NotFound', 'Session not found', 404), 404);
      }
      
      return c.json(successResponse(session), 200);
    } catch (error) {
      return c.json(errorResponse('Error', 'Failed to complete session', 500), 500);
    }
}

export async function updateRemainingTime(c:Context) {
    const sessionId = Number(c.req.param('id'));
    
    try {
      const body = await c.req.json();
      const remainingSeconds = Number(body.remaining_seconds);
      
      if (isNaN(remainingSeconds)) {
        return c.json(errorResponse('BadRequest', 'Invalid remaining seconds value', 400), 400);
      }
      
      const session = await SessionModel.updatePomo(sessionId, { remaining_seconds: remainingSeconds });
      
      if (!session) {
        return c.json(errorResponse('NotFound', 'Session not found', 404), 404);
      }
      
      return c.json(successResponse(session), 200);
    } catch (error) {
      return c.json(errorResponse('Error', 'Failed to update remaining time', 500), 500);
    }
}
