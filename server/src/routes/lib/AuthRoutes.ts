import { AuthMiddleware } from './../../middleware/AuthMiddleware';
import * as express from 'express';


export class AuthRoutes {
    private readonly authMiddleware: AuthMiddleware;
    constructor(authMiddleware: AuthMiddleware) {
        this.authMiddleware = authMiddleware;
    }

    create(): express.Router {
        const router = express.Router();

        router.post('/login', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            this.authMiddleware.login(req, res, next);
        });

        return router
    }
}