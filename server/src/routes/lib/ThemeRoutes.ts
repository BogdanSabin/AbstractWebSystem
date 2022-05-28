import { ThemeMiddleware } from './../../middleware/ThemeMiddleware';
import * as express from 'express';


export class ThemeRoutes {
    private readonly themeMiddleware: ThemeMiddleware;
    constructor(themeMiddleware: ThemeMiddleware) {
        this.themeMiddleware = themeMiddleware;
    }

    create(): express.Router {
        const router = express.Router();

        router.post('/upload', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            this.themeMiddleware.upload(req, res, next);
        });

        router.post('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            this.themeMiddleware.add(req, res, next);
        });

        router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            this.themeMiddleware.getDetails(req, res, next);
        });

        router.get('/:themeid', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            this.themeMiddleware.findById(req, res, next);
        });

        router.delete('/:themeid', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            this.themeMiddleware.remove(req, res, next);
        });

        return router;
    }
}