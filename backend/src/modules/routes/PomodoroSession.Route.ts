import {PomodoroController} from '../controllers/index.js';
import type { OpenAPIHono } from '@hono/zod-openapi';
import { PomodoroSchemas } from '../schemas/index.js';
const setupPomodoroRoutes = (app: OpenAPIHono) => {
    app.openapi(
        PomodoroSchemas.getAllSessionsRoute,
        PomodoroController.getAllSession
    ),
    app.openapi(
        PomodoroSchemas.getSessionByIdRoute,
        PomodoroController.getPomoSessionbyId
    ),
    app.openapi(
        PomodoroSchemas.createSessionRoute,
        PomodoroController.createSessionController
    ),
    app.openapi(
        PomodoroSchemas.updateSessionRoute,
        PomodoroController.updatedSessionController
    ),
    app.openapi(
        PomodoroSchemas.deleteSessionRoute,
        PomodoroController.deleteSessionController
    ),
    app.openapi(
        PomodoroSchemas.getActiveSessionRoute,
        PomodoroController.getActiveSessionController
    ),
    app.openapi(
        PomodoroSchemas.startSessionRoute,
        PomodoroController.startSession
    ),
    app.openapi(
        PomodoroSchemas.pauseSessionRoute,
        PomodoroController.pauseSession
    ),
    app.openapi(
        PomodoroSchemas.resumeSessionRoute,
        PomodoroController.resumeSession
    ),
    app.openapi(
        PomodoroSchemas.completeSessionRoute,
        PomodoroController.completeSession
    ),
    app.openapi(
        PomodoroSchemas.updateRemainingTimeRoute,
        PomodoroController.updateRemainingTime
    );
}
export default setupPomodoroRoutes;