import type {z} from 'zod';
import type { TaskSchemas} from '../schemas/index.js';

type Task = z.infer<typeof TaskSchemas.taskSchema>;
type Tasks = z.infer<typeof TaskSchemas.TasksSchema>;
type CreateTaskData = z.infer<typeof TaskSchemas.createTaskSchema>;
type UpdateTaskData = z.infer<typeof TaskSchemas.updateTaskSchema>;
type TaskStatus = z.infer<typeof TaskSchemas.TaskStatusEnum>;
export type {
    Task,
    Tasks,
    CreateTaskData,
    UpdateTaskData,
    TaskStatus
}