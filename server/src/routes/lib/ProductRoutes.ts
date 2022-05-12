import { ProductMiddleware } from './../../middleware/ProductMiddleware';
import * as express from 'express';


export class ProductRoutes {
    private readonly productMiddleware: ProductMiddleware;
    constructor(productMiddleware: ProductMiddleware) {
        this.productMiddleware = productMiddleware;
    }

    create(): express.Router {
        const router = express.Router();
        return router;
    }
}