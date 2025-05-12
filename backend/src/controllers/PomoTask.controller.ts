import type { Context } from 'hono';
import * as TaskModel from '../models/PomoTask.model.js';
import { PomoTaskStatus, type CreateTask, type UpdateTask } from '../types/index.js';

export async function getAllTask(c: Context) {
  const user = c.get('user'); 

  try {
    const tasks = await TaskModel.getAllPomoTask(user.id);
    return c.json({ success: true, data: tasks });
  } catch (error) {
    return c.json({ success: false, message: 'Failed to fetch tasks', error: String(error) }, 500);
  }
}


export async function getTaskBySession(c:Context) {
    const sessionId = Number(c.req.param('sessionId'));
    try {
        const tasks = await TaskModel.findBySession(sessionId);
        return c.json({success: true, data: tasks});
    } catch (error) {
        return c.json({success: false, message:'Failed to fetch tasks', error: String(error)}, 500);
    }
}

export async function getTaskById(c:Context) {
    const userId  = Number(c.req.param('id'));
    try {
        const tasks = await TaskModel.findByUserId(userId);
        return c.json({success: true, data: tasks});
    } catch (error) {
        return c.json({success: false, message:'Failed to fetch tasks', error: String(error)}, 500);
    }
}

export async function createPomoTaskController(c:Context) {
    try {
        const body = await c.req.json();
        const taskData: CreateTask = {
            Pomo_Task_Title: body.title,
            Pomo_Task_Short: body.shortBreak || 5,
            Pomo_Task_Long: body.longBreak || 15,
            SessionId: body.sessionId,
        }
        const tasks = await TaskModel.CreatePomoTask(taskData);
        return c.json({success: true, data:tasks}, 201);
    } catch (error) {
        return c.json({success: false, message:'Failed to fetch tasks', error: String(error)}, 500);
    }
}

export async function updatePomoTaskController(c:Context) {
    const taskId = Number(c.req.param('id'));
    
    try {
      const body = await c.req.json();
      const taskData: UpdateTask= {
        Pomo_Task_Title: body.title,
        Pomo_Task_Short: body.shortBreak,
        Pomo_Task_Long: body.longBreak,
        SessionId: body.sessionId,
        Pomo_Task_Status: body.status
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

export async function deletePomoTaskController(c:Context) {
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
//use for category too 
export async function assignTaskToSession(c:Context) {
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
    
    try {
      const task = await TaskModel.updatePomoTask(taskId, { Pomo_Task_Status: PomoTaskStatus.COMPLETED });
      
      if (!task) {
        return c.json({ success: false, message: 'Task not found' }, 404);
      }
      
      return c.json({ success: true, data: task });
    } catch (error) {
      return c.json({ success: false, message: 'Failed to complete task', error: String(error) }, 500);
    }
}
