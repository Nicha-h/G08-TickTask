import type {z} from 'zod';
import type { PomoTaskSchemas} from '../schemas/index.js';

type PomoTask = z.infer<typeof PomoTaskSchemas.pomoTaskSchema>;
type pomoTaskProgress = z.infer<typeof PomoTaskSchemas.pomoTaskProgressSchema>;
type CreatePomoTaskData = z.infer<typeof PomoTaskSchemas.createTaskSchema>;
type UpdatePomoTaskData = z.infer<typeof PomoTaskSchemas.updateTaskSchema>;

export type {
    PomoTask,
    pomoTaskProgress,
    CreatePomoTaskData,
    UpdatePomoTaskData
}