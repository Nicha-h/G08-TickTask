import type { Context } from 'hono';
import { PomoTaskServices } from '../services/index.js';
import { findById } from '../models/PomoTask.model.js';

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

export async function getAllTask(c: Context) {
  const user = c.get('user'); 

  try {
    const tasks = await PomoTaskServices.getAllPomoTask(user.id);
    return c.json(successResponse(tasks), 200);
  } catch (error) {
    return c.json(errorResponse('Error', 'Failed to fetch tasks', 500), 500);
  }
}

export async function getTaskBySession(c: Context) {
    const sessionId = Number(c.req.param('sessionId'));
    try {
        const tasks = await PomoTaskServices.getPomoTaskBySessionId(sessionId);
        return c.json(successResponse(tasks), 200);
    } catch (error) {
        return c.json(errorResponse('Error', 'Failed to fetch tasks', 500), 500);
    }
}

export async function getTaskById(c: Context) {
    const taskId  = Number(c.req.param('id'));
    try {
        const tasks = await findById(taskId);
        return c.json(successResponse(tasks), 200);
    } catch (error) {
        return c.json(errorResponse('Error', 'Failed to fetch tasks', 500), 500);
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

    return c.json(successResponse(newTask, 'Task created successfully'), 201);
  } catch (error) {
    console.error('CreatePomoTask error:', error);
    return c.json(errorResponse('Error', 'Failed to create task', 500), 500);
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
      return c.json(errorResponse('NotFound', 'Task not found or no changes made', 404), 404);
    }
    
    return c.json(successResponse(updatedTask), 200);
  } catch (error) {
    return c.json(errorResponse('Error', 'Failed to update task', 500), 500);
  }
}


export async function deletePomoTaskController(c: Context) {
    const taskId = Number(c.req.param('id'));
    
    try {
      await PomoTaskServices.deletePomoTask(taskId);
      return c.json(successResponse(null, 'Task deleted successfully'), 200);
    } catch (error) {
      return c.json(errorResponse('Error', 'Failed to delete task', 500), 500);
    }
}

export async function assignTaskToSession(c: Context) {
    const taskId = Number(c.req.param('id'));
    
    try {
      const body = await c.req.json();
      const sessionId = Number(body.sessionId);
      
      if (isNaN(sessionId)) {
        return c.json(errorResponse('BadRequest', 'Invalid session ID', 400), 400);
      }
      
      const task = await PomoTaskServices.assignTaskToSession(taskId, sessionId);
      
      if (!task) {
        return c.json(errorResponse('NotFound', 'Task not found', 404), 404);
      }
      
      return c.json(successResponse(task), 200);
    } catch (error) {
      return c.json(errorResponse('Error', 'Failed to assign task to session', 500), 500);
    }
}

export async function completePomoTask(c: Context) {
  const taskId = Number(c.req.param('id'));
  const { Pomo_Task_Status } = await c.req.json(); 

  try {
    const task = await PomoTaskServices.completePomoTask(taskId, Pomo_Task_Status);

    if (!task) {
      return c.json(errorResponse('NotFound', 'Task not found', 404), 404);
    }

    return c.json(successResponse(task), 200);
  } catch (error) {
    return c.json(errorResponse('Error', 'Failed to complete task', 500), 500);
  }
}

export async function incrementPomoCounter(c: Context) {
    const taskId = Number(c.req.param('id'));
    
    try {
      const task = await PomoTaskServices.incrementPomoCounter(taskId);
      
      if (!task) {
        return c.json(errorResponse('NotFound', 'Task not found', 404), 404);
      }
      
      return c.json(successResponse(task, 'Pomodoro counter incremented successfully'), 200);
    } catch (error) {
      return c.json(errorResponse('Error', 'Failed to increment pomodoro counter', 500), 500);
    }
}

export async function resetPomoCounter(c: Context) {
    const taskId = Number(c.req.param('id'));
    
    try {
      const task = await PomoTaskServices.resetPomoCounter(taskId);
      
      if (!task) {
        return c.json(errorResponse('NotFound', 'Task not found', 404), 404);
      }
      
      return c.json(successResponse(task, 'Pomodoro counter reset successfully'), 200);
    } catch (error) {
      return c.json(errorResponse('Error', 'Failed to reset pomodoro counter', 500), 500);
    }
}

export async function setPomoTargetCount(c: Context) {
    const taskId = Number(c.req.param('id'));
    
    try {
      const body = await c.req.json();
      const targetCount = Number(body.targetCount);
      
      if (isNaN(targetCount) || targetCount < 0) {
        return c.json(errorResponse('BadRequest', 'Invalid target count', 400), 400);
      }
      
      const task = await PomoTaskServices.setPomoTargetCount(taskId, targetCount);
      
      if (!task) {
        return c.json(errorResponse('NotFound', 'Task not found', 404), 404);
      }
      
      return c.json(successResponse(task, 'Target count set successfully'), 200);
    } catch (error) {
      return c.json(errorResponse('Error', 'Failed to set target count', 500), 500);
    }
}

export async function getTaskProgress(c: Context) {
    const taskId = Number(c.req.param('id'));
    
    try {
      const progress = await PomoTaskServices.getTaskProgress(taskId);
      
      return c.json(successResponse(progress), 200);
    } catch (error) {
      return c.json(errorResponse('Error', 'Failed to get task progress', 500), 500);
    }
}