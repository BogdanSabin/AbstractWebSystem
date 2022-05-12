import { ImageMiddleware } from './../../middleware/ImageMiddleware';
import * as express from 'express';


export class ImageRoutes {
    private readonly imageMiddleware: ImageMiddleware;
    constructor(imageMiddleware: ImageMiddleware) {
        this.imageMiddleware = imageMiddleware;
    }

    create(): express.Router {
        const router = express.Router();
        return router;
    }
}