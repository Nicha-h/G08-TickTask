import type { OpenAPIHono } from '@hono/zod-openapi';
import { UserController } from '../controllers/index.js';
import { UserSchemas } from '../schemas/index.js';

const setupUserRoutes = (app: OpenAPIHono) => {
    app.openapi(
        UserSchemas.createUserRoute,
        UserController.createUserController
    )
    app.openapi(
        UserSchemas.loginUserRoute,
        UserController.loginUserController
    )
    app.openapi(
        UserSchemas.fetchProfileRoute,
        UserController.fetchProfileController
    )
    app.openapi(
        UserSchemas.updateProfileRoute,
        UserController.updateProfileController
    )
    app.openapi(
        UserSchemas.checkEmailRoute,
        UserController.checkEmailController
    )
    app.openapi(
        UserSchemas.resetPasswordRoute,
        UserController.resetPasswordController
    )
    app.openapi(
        UserSchemas.uploadProfilePicRoute,
        UserController.uploadProfilePicController
    )
    app.openapi(
        UserSchemas.getUserProfileRoute,
        UserController.fetchProfileController
    )
}
export default setupUserRoutes;