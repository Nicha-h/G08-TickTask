import type {z} from 'zod';
import type { CategorySchemas} from '../schemas/index.js';

type Category = z.infer<typeof CategorySchemas.categorySchema>;
type CreateCategoryData = z.infer<typeof CategorySchemas.CreateCategorySchema>;
type UpdateCategoryData = z.infer<typeof CategorySchemas.UpdateCategorySchema>;

export type {
    Category,
    CreateCategoryData,
    UpdateCategoryData
}