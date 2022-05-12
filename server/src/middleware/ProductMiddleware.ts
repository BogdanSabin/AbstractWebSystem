import * as _ from 'lodash';
import { RPCClient } from '../clients';

export class ProductMiddleware {
    private readonly rpcClient: RPCClient;

    constructor(client: RPCClient) {
        this.rpcClient = client;
    }
}