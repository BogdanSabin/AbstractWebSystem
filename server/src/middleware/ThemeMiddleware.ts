import * as _ from 'lodash';
import { RPCClient } from '../clients';

export class ThemeMiddleware {
    private readonly rpcClient: RPCClient;

    constructor(client: RPCClient) {
        this.rpcClient = client;
    }
}