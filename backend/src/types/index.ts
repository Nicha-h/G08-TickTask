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
  
export type TaskStatus = 'Incomplete' | 'Complete'; 

export interface CustomContext extends Context {
  user: { id: number, email: string }; 
}