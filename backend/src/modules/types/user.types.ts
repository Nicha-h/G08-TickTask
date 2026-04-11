import type {z} from 'zod';
import type { UserSchemas} from '../schemas/index.js';

type User = z.infer<typeof UserSchemas.userSchema>;
type Profile = z.infer<typeof UserSchemas.userProfileSchema>;
export type {
    User,
    Profile
}