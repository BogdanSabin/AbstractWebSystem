import { OrderMiddleware } from './../../middleware/OrderMiddleware';
import * as express from 'express';


export class OrderRoutes {
    private readonly orderMiddleware: OrderMiddleware;
    constructor(orderMiddleware: OrderMiddleware) {
        this.orderMiddleware = orderMiddleware;
    }

    create(): express.Router {
        const router = express.Router();
        return router;
    }
}