import type {z} from 'zod';
import type { PomodoroSchemas} from '../schemas/index.js';

type Pomodoro = z.infer<typeof PomodoroSchemas.sessionSchema>;
type CreatePomodoroData = z.infer<typeof PomodoroSchemas.createSessionSchema>;
type UpdatePomodoroData = z.infer<typeof PomodoroSchemas.updateSessionSchema>;
type SessionStatus = z.infer<typeof PomodoroSchemas.SessionStatusEnum>;
type startPomodoroData = z.infer<typeof PomodoroSchemas.startSessionSchema>;
type pausePomodoroData = z.infer<typeof PomodoroSchemas.pauseSessionSchema>;
type updateRemainingTimeData = z.infer<typeof PomodoroSchemas.updateRemainingTimeSchema>;
type TimerType = z.infer<typeof PomodoroSchemas.TimerTypeEnum>;
export type {
    Pomodoro,
    CreatePomodoroData,
    UpdatePomodoroData,
    SessionStatus,
    startPomodoroData,
    pausePomodoroData,
    updateRemainingTimeData,
    TimerType
}