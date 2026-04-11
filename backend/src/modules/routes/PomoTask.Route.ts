import type { OpenAPIHono } from '@hono/zod-openapi';
import * as TaskController from '../controllers/PomoTask.controller.js';
import {PomoTaskSchemas} from '../schemas/index.js';

const setupPomoTaskRoutes = (app: OpenAPIHono) => {
    app.openapi(
        PomoTaskSchemas.getAllTasksRoute,
        TaskController.getAllTask
    ),
    app.openapi(
        PomoTaskSchemas.getTaskBySessionRoute,
        TaskController.getTaskBySession
    ),
    app.openapi(
        PomoTaskSchemas.getTaskByIdRoute,
        TaskController.getTaskById
    ),
    app.openapi(
        PomoTaskSchemas.createTaskRoute,
        TaskController.CreatePomoTaskController
    ),
    app.openapi(
        PomoTaskSchemas.updateTaskRoute,
        TaskController.updatePomoTaskController
    ),
    app.openapi(
        PomoTaskSchemas.deleteTaskRoute,
        TaskController.deletePomoTaskController
    ),
    app.openapi(
        PomoTaskSchemas.assignTaskToSessionRoute,
        TaskController.assignTaskToSession
    ),
    app.openapi(
        PomoTaskSchemas.completeTaskRoute,
        TaskController.completePomoTask
    ),
    app.openapi(
        PomoTaskSchemas.incrementPomoCounterRoute,
        TaskController.incrementPomoCounter
    ),
    app.openapi(
        PomoTaskSchemas.resetPomoCounterRoute,
        TaskController.resetPomoCounter
    ),
    app.openapi(
        PomoTaskSchemas.setPomoTargetCountRoute,
        TaskController.setPomoTargetCount
    ),
    app.openapi(
        PomoTaskSchemas.getTaskProgressRoute,
        TaskController.getTaskProgress
    );

}
export default setupPomoTaskRoutes;