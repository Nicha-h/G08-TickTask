import type { Context } from "hono";

export interface Task {
    id: number;
    title: string;
    completed: boolean;
  }
export type email = string;
export type plainPassword = string;

export type User = {
    id: number;
    email: string;
    password: string;
  };
  
export type TaskStatus = 'Incomplete' | 'Complete'; 

export interface CustomContext extends Context {
  user: { id: number, email: string }; 
}