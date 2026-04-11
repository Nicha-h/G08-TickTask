import type { Context } from "hono";

export interface Task {
    id: number;
    title: string;
    completed: boolean;
}

export interface Category{
    CategoryID: number;
    Category_Name: String;
    Category_icon: String;
    Category_Color: String;
    Category_is_Primary: Boolean;
    UserID: number;
}

export type email = string;
export type plainPassword = string;

export type User = {
    id: number;
    email: string;
    password: string;
};
  
export type TaskStatus = 'Completed' | 'Incomplete';

export interface CustomContext extends Context {
  user: { id: number, email: string }; 
}

//Pomodoro Types

export enum SessionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed'
}

export enum TimerType {
  WORK = 'work',
  SHORT = 'short',
  LONG = 'long'
}

export interface Session {
  SessionId?: number; 
  UserId: number;
  Status: SessionStatus;
  StartTime: Date;
  EndTime: Date | null;
  PausedTime: Date | null;
  duration_seconds: number; 
  remaining_seconds: number;
  timer_type: TimerType;
  last_updated: Date;
}

export enum PomoTaskStatus {
  PENDING = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
  CANCELLED = 3
}

export interface Task {
  Pomo_TaskId?: number;
  Pomo_Task_Title: string;
  Pomo_Task_Short: number; 
  Pomo_Task_Long: number; 
  SessionId: number | null;
  Pomo_Task_Status: PomoTaskStatus; 
  Pomo_Completed_Count: number; 
  Pomo_Target_Count: number;   
}

export interface CreateSession {
  UserID: number;
  duration_seconds?: number;
  timer_type?: TimerType;
  PausedTime?: number;
}

export interface UpdateSession {
  Status?: SessionStatus;
  remaining_seconds?: number;
  timer_type?: TimerType;
}

export interface CreateTask {
  Pomo_Task_Title: string;
  Pomo_Task_Short?: number;
  Pomo_Task_Long?: number;
  SessionId?: number;
  Pomo_Target_Count?: number; 
}

export interface UpdateTask {
  Pomo_Task_Title?: string;
  Pomo_Task_Short?: number;
  Pomo_Task_Long?: number;
  SessionId?: number | null;
  Pomo_Task_Status?: PomoTaskStatus;
  Pomo_Completed_Count?: number; 
  Pomo_Target_Count?: number;    
}

export interface UpdatePomoTaskInput {
  Pomo_Task_Title?: string;
  Pomo_Task_Short?: number;
  Pomo_Task_Long?: number;
  Pomo_Task_Status?: boolean;
  Pomo_Completed_Count?: number; 
  Pomo_Target_Count?: number;
  SessionId?: number | null;
}

