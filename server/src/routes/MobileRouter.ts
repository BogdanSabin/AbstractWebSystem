
import * as express from 'express';
import { RoutersFactory } from '.';

export class MobileRoutes {
    static create(app: express.Application, routers: RoutersFactory): express.Application {
        app.use('/api/mobile/auth', routers.getAuthRoutes().create());
        app.use('/api/mobile/site', routers.getSiteRoutes().create());
        app.use('/api/mobile/product', routers.getProductRoutes().create());
        app.use('/api/mobile/order', routers.getOrderRoutes().create());
        app.use('/api/mobile/theme', routers.getThemeRoutes().create());
        app.use('/api/mobile/image', routers.getImageRoutes().create());

        return app;
    }

}