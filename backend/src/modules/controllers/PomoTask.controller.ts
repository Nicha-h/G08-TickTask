import type { Context } from 'hono';
import { PomoTaskServices } from '../services/index.js';
import { findById } from '../models/PomoTask.model.js';

export async function getAllTask(c: Context) {
  const user = c.get('user'); 

  try {
    const tasks = await PomoTaskServices.getAllPomoTask(user.id);
    return c.json({ success: true, data: tasks });
  } catch (error) {
    return c.json({ success: false, message: 'Failed to fetch tasks', error: String(error) }, 500);
  }
}

export async function getTaskBySession(c: Context) {
    const sessionId = Number(c.req.param('sessionId'));
    try {
        const tasks = await PomoTaskServices.getPomoTaskBySessionId(sessionId);
        return c.json({ success: true, data: tasks });
    } catch (error) {
        return c.json({ success: false, message:'Failed to fetch tasks', error: String(error) }, 500);
    }
}

export async function getTaskById(c: Context) {
    const taskId  = Number(c.req.param('id'));
    try {
        const tasks = await findById(taskId);
        return c.json({ success: true, data: tasks });
    } catch (error) {
        return c.json({ success: false, message:'Failed to fetch tasks', error: String(error) }, 500);
    }
}

export const CreatePomoTaskController = async (c: Context) => {
  const body = await c.req.json();
  const user = c.get("user"); 
  try {
    const newTask = await PomoTaskServices.createPomoTaskWithSession(
      user.id,
      {
        title: body.Pomo_Task_Title,
        shortBreak: body.Pomo_Task_Short,
        longBreak: body.Pomo_Task_Long,
        targetCount: body.Pomo_Target_Count,
      }
    );

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
    
    const updateData: any = {};
    if (body.Pomo_Task_Title !== undefined) updateData.Pomo_Task_Title = body.Pomo_Task_Title;
    if (body.Pomo_Task_Short !== undefined) updateData.Pomo_Task_Short = body.Pomo_Task_Short;
    if (body.Pomo_Task_Long !== undefined) updateData.Pomo_Task_Long = body.Pomo_Task_Long;
    if (body.Pomo_Task_Status !== undefined) updateData.Pomo_Task_Status = body.Pomo_Task_Status;
    if (body.Pomo_Completed_Count !== undefined) updateData.Pomo_Completed_Count = body.Pomo_Completed_Count;
    if (body.Pomo_Target_Count !== undefined) updateData.Pomo_Target_Count = body.Pomo_Target_Count;
    if (body.SessionId !== undefined) updateData.SessionId = body.SessionId;
    
    const updatedTask = await PomoTaskServices.updatePomoTask(taskId, updateData);
    
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
      await PomoTaskServices.deletePomoTask(taskId);
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
      
      const task = await PomoTaskServices.assignTaskToSession(taskId, sessionId);
      
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
    const task = await PomoTaskServices.completePomoTask(taskId, Pomo_Task_Status);

    if (!task) {
      return c.json({ success: false, message: 'Task not found' }, 404);
    }

    return c.json({ success: true, data: task });
  } catch (error) {
    return c.json({ success: false, message: 'Failed to complete task', error: String(error) }, 500);
  }
}

export async function incrementPomoCounter(c: Context): Promise<Response> {
    const taskId = Number(c.req.param('id'));
    
    try {
      const task = await PomoTaskServices.incrementPomoCounter(taskId);
      
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

export async function resetPomoCounter(c: Context): Promise<Response> {
    const taskId = Number(c.req.param('id'));
    
    try {
      const task = await PomoTaskServices.resetPomoCounter(taskId);
      
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

export async function setPomoTargetCount(c: Context): Promise<Response> {
    const taskId = Number(c.req.param('id'));
    
    try {
      const body = await c.req.json();
      const targetCount = Number(body.targetCount);
      
      if (isNaN(targetCount) || targetCount < 0) {
        return c.json({ success: false, message: 'Invalid target count' }, 400);
      }
      
      const task = await PomoTaskServices.setPomoTargetCount(taskId, targetCount);
      
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

export async function getTaskProgress(c: Context): Promise<Response> {
    const taskId = Number(c.req.param('id'));
    
    try {
      const progress = await PomoTaskServices.getTaskProgress(taskId);
      
      return c.json({ 
        success: true, 
        data: progress
      });
    } catch (error) {
      return c.json({ success: false, message: 'Failed to get task progress', error: String(error) }, 500);
    }
}