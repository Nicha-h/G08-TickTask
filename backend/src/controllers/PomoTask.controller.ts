import type { Context } from 'hono';
import * as TaskModel from '../models/PomoTask.model.js';
import { PomoTaskStatus, type CreateTask, type UpdateTask } from '../types/index.js';
import { createSession } from '../models/Pomodoro.model.js';
import { TimerType } from '../types/index.js';
export async function getAllTask(c: Context) {
  const user = c.get('user'); 

  try {
    const tasks = await TaskModel.getAllPomoTask(user.id);
    return c.json({ success: true, data: tasks });
  } catch (error) {
    return c.json({ success: false, message: 'Failed to fetch tasks', error: String(error) }, 500);
  }
}

export async function getTaskBySession(c: Context) {
    const sessionId = Number(c.req.param('sessionId'));
    try {
        const tasks = await TaskModel.findBySession(sessionId);
        return c.json({ success: true, data: tasks });
    } catch (error) {
        return c.json({ success: false, message:'Failed to fetch tasks', error: String(error) }, 500);
    }
}

export async function getTaskById(c: Context) {
    const taskId  = Number(c.req.param('id'));
    try {
        const tasks = await TaskModel.findById(taskId );
        return c.json({ success: true, data: tasks });
    } catch (error) {
        return c.json({ success: false, message:'Failed to fetch tasks', error: String(error) }, 500);
    }
}

export const CreatePomoTaskController = async (c: Context) => {
  const body = await c.req.json();
  const user = c.get("user"); 
  try{

  // Step 1: Create new session for this task
  const newSession = await createSession({
    UserID: user.id, 
    duration_seconds: 1500,
    timer_type: TimerType.WORK,
  });

  // Step 2: Create new task linked to that session
  const newTask = await TaskModel.CreatePomoTask({
    Pomo_Task_Title: body.title,
    Pomo_Task_Short: body.shortBreak,
    Pomo_Task_Long: body.longBreak,
    Pomo_Task_Status: false,
    Pomo_Completed_Count: 0,
    Pomo_Target_Count: body.targetCount,
    session: { connect: { SessionId: newSession.SessionId } },
  });

  return c.json({ success: true, data: newTask }, 201);
  } catch (error) {
    console.error('CreatePomoTask error:', error);
    return c.json({ success: false, message: 'Failed to create task', error: String(error) }, 500);
  }

};

export async function updatePomoTaskController(c: Context) {
  const taskId = Number(c.req.param('id'));
  
  try {
    const body = await c.req.json();
    
    
    const taskData = {
      Pomo_Task_Title: body.title,
      Pomo_Task_Short: body.shortBreak,
      Pomo_Task_Long: body.longBreak,
      Pomo_Task_Status: body.status,
      Pomo_Completed_Count: body.completedCount,
      Pomo_Target_Count: body.targetCount,
      session: body.sessionId ? { connect: { SessionId: body.sessionId } } : undefined,
    };
    
    const updatedTask = await TaskModel.updatePomoTask(taskId, taskData);
    
    if (!updatedTask) {
      return c.json({ success: false, message: 'Task not found or no changes made' }, 404);
    }
    
    return c.json({ success: true, data: updatedTask });
  } catch (error) {
    return c.json({ success: false, message: 'Failed to update task', error: String(error) }, 500);
  }
}


export async function deletePomoTaskController(c: Context) {
    const taskId = Number(c.req.param('id'));
    
    try {
      const deleted = await TaskModel.deletePomoTask(taskId);
      
      if (!deleted) {
        return c.json({ success: false, message: 'Task not found' }, 404);
      }
      
      return c.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      return c.json({ success: false, message: 'Failed to delete task', error: String(error) }, 500);
    }
}

export async function assignTaskToSession(c: Context) {
    const taskId = Number(c.req.param('id'));
    
    try {
      const body = await c.req.json();
      const sessionId = Number(body.sessionId);
      
      if (isNaN(sessionId)) {
        return c.json({ success: false, message: 'Invalid session ID' }, 400);
      }
      
      const task = await TaskModel.assignToSession(taskId, sessionId);
      
      if (!task) {
        return c.json({ success: false, message: 'Task not found' }, 404);
      }
      
      return c.json({ success: true, data: task });
    } catch (error) {
      return c.json({ success: false, message: 'Failed to assign task to session', error: String(error) }, 500);
    }
}

export async function completePomoTask(c: Context): Promise<Response> {
  const taskId = Number(c.req.param('id'));
  const { Pomo_Task_Status } = await c.req.json(); 

  try {
    const task = await TaskModel.updatePomoTask(taskId, { Pomo_Task_Status });

    if (!task) {
      return c.json({ success: false, message: 'Task not found' }, 404);
    }

    return c.json({ success: true, data: task });
  } catch (error) {
    return c.json({ success: false, message: 'Failed to complete task', error: String(error) }, 500);
  }
}


// New controller functions for pomodoro counter features

/**
 * Increment the pomodoro counter for a task
 * Will mark task as completed if target is reached
 */
export async function incrementPomoCounter(c: Context): Promise<Response> {
    const taskId = Number(c.req.param('id'));
    
    try {
      const task = await TaskModel.incrementPomoCounter(taskId);
      
      if (!task) {
        return c.json({ success: false, message: 'Task not found' }, 404);
      }
      
      return c.json({ 
        success: true, 
        data: task,
        message: 'Pomodoro counter incremented successfully' 
      });
    } catch (error) {
      return c.json({ success: false, message: 'Failed to increment pomodoro counter', error: String(error) }, 500);
    }
}

/**
 * Reset the pomodoro counter back to zero
 */
export async function resetPomoCounter(c: Context): Promise<Response> {
    const taskId = Number(c.req.param('id'));
    
    try {
      const task = await TaskModel.resetPomoCounter(taskId);
      
      if (!task) {
        return c.json({ success: false, message: 'Task not found' }, 404);
      }
      
      return c.json({ 
        success: true, 
        data: task,
        message: 'Pomodoro counter reset successfully' 
      });
    } catch (error) {
      return c.json({ success: false, message: 'Failed to reset pomodoro counter', error: String(error) }, 500);
    }
}

/**
 * Set the target count for a task
 */
export async function setPomoTargetCount(c: Context): Promise<Response> {
    const taskId = Number(c.req.param('id'));
    
    try {
      const body = await c.req.json();
      const targetCount = Number(body.targetCount);
      
      if (isNaN(targetCount) || targetCount < 0) {
        return c.json({ success: false, message: 'Invalid target count' }, 400);
      }
      
      const task = await TaskModel.setPomoTargetCount(taskId, targetCount);
      
      if (!task) {
        return c.json({ success: false, message: 'Task not found' }, 404);
      }
      
      return c.json({ 
        success: true, 
        data: task,
        message: 'Target count set successfully' 
      });
    } catch (error) {
      return c.json({ success: false, message: 'Failed to set target count', error: String(error) }, 500);
    }
}

/**
 * Get progress information for a task
 */
export async function getTaskProgress(c: Context): Promise<Response> {
    const taskId = Number(c.req.param('id'));
    
    try {
      const progress = await TaskModel.getTaskProgress(taskId);
      
      return c.json({ 
        success: true, 
        data: progress
      });
    } catch (error) {
      return c.json({ success: false, message: 'Failed to get task progress', error: String(error) }, 500);
    }
}