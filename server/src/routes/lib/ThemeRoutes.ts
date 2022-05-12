import { ThemeMiddleware } from './../../middleware/ThemeMiddleware';
import * as express from 'express';


export class ThemeRoutes {
    private readonly themeMiddleware: ThemeMiddleware;
    constructor(themeMiddleware: ThemeMiddleware) {
        this.themeMiddleware = themeMiddleware;
    }

    create(): express.Router {
        const router = express.Router();
        return router;
    }
}