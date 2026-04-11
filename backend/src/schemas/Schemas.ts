import type { TaskStatus } from "../types/index.js";
import { z } from 'zod';

export interface Task {
    TaskID: number;
    Task_Title: string;
    Task_Description: string | null;
    Task_Start_Date: string;
    Task_End_Date: string;
    Task_Status: TaskStatus;
    Task_Color: string;
    Task_Icon: string | null;
    Task_Start_Time: string;
    Task_End_Time: string;
    UserID: number;
}

export const categorySchema = z.object({
  Category_Name: z.string().min(1, { message: 'Category name is required' }),
  Category_Icon: z.string().min(1, { message: 'Category icon is required' }),
  Category_Color: z.string().min(1, { message: 'Category color is required' }),
  Custom_Color: z.string().optional(), 
});
