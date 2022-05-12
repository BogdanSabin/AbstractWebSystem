import { SiteMiddleware } from './../../middleware/SiteMiddleware';
import * as express from 'express';


export class SiteRoutes {
    private readonly siteMiddleware: SiteMiddleware;
    constructor(siteMiddleware: SiteMiddleware) {
        this.siteMiddleware = siteMiddleware;
    }

    create(): express.Router {
        const router = express.Router();
        return router;
    }
}