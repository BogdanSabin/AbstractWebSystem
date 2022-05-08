import { CoreBzlRpcClient } from './clients/coreBzlClient';
import { config } from './config';
import { MiddlewareFactory } from './middleware';
import { RoutersFactory } from './routes';


export class Factory {
    private readonly routersFactory: RoutersFactory;
    private readonly middlewareFactory: MiddlewareFactory;
    // tslint:disable-next-line: readonly-keyword
    private static instance: Factory;

    private constructor() {
        const coreBzlRpcClient = new CoreBzlRpcClient(config.rpc.coreBzl.queueName);
        this.middlewareFactory = new MiddlewareFactory(coreBzlRpcClient);
        this.routersFactory = new RoutersFactory(this.middlewareFactory);
        Factory.instance = this;
    }

    static getInstance(): Factory { return Factory.instance ? Factory.instance : new Factory() }
    getMiddelware(): MiddlewareFactory { return this.middlewareFactory }
    getRouter(): RoutersFactory { return this.routersFactory }
}