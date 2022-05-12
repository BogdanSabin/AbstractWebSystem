import { CoreBzlRpcClient } from './../clients/coreBzlClient';
import { AuthMiddleware } from './AuthMiddleware';
import { SiteMiddleware } from './SiteMiddleware';
import { ProductMiddleware } from './ProductMiddleware';
import { OrderMiddleware } from './OrderMiddleware';
import { ThemeMiddleware } from './ThemeMiddleware';
import { ImageMiddleware } from './ImageMiddleware';

export class MiddlewareFactory {
    private readonly authMiddleware: AuthMiddleware;
    private readonly siteMiddleware: SiteMiddleware;
    private readonly productMiddleware: ProductMiddleware;
    private readonly orderMiddleware: OrderMiddleware;
    private readonly themeMiddleware: ThemeMiddleware;
    private readonly imageMiddleware: ImageMiddleware;

    constructor(coreBzlRpcClient: CoreBzlRpcClient) {
        this.authMiddleware = new AuthMiddleware(coreBzlRpcClient);
        this.siteMiddleware = new SiteMiddleware(coreBzlRpcClient);
        this.productMiddleware = new ProductMiddleware(coreBzlRpcClient);
        this.orderMiddleware = new OrderMiddleware(coreBzlRpcClient);
        this.themeMiddleware = new ThemeMiddleware(coreBzlRpcClient);
        this.imageMiddleware = new ImageMiddleware(coreBzlRpcClient);
    }

    getAuthMiddleware(): AuthMiddleware { return this.authMiddleware; }
    getSiteMiddleware(): SiteMiddleware { return this.siteMiddleware; }
    getProductMiddleware(): ProductMiddleware { return this.productMiddleware; }
    getOrderMiddleware(): OrderMiddleware { return this.orderMiddleware; }
    getThemeMiddleware(): ThemeMiddleware { return this.themeMiddleware; }
    getImageMiddleware(): ImageMiddleware { return this.imageMiddleware; }
}