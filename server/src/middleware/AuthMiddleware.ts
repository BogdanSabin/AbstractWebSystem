import * as express from 'express';
import { RPCClient } from '../clients';
import { respond } from './helper';

export class AuthMiddleware {
    private readonly rpcClient: RPCClient;

    constructor(client: RPCClient) {
        this.rpcClient = client;
    }

    login(req: express.Request, res: express.Response, next: express.NextFunction): void {
        this.rpcClient.sendMessage({ api: 'auth', method: 'login', data: {} }, (error, data) => {
            return respond(res, error, data)
        })
    }
}