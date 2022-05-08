import * as _ from 'lodash';
import { RPCClient } from './RPCClient';
import { createClient, sendRPCMessage } from '../RabbitMQ';
import { MessageRPC, Data, RPCCLientData } from '../RabbitMQ/types';

export class CoreBzlRpcClient implements RPCClient {
    // tslint:disable-next-line: readonly-keyword
    private coreBzlClient: RPCCLientData;
    private readonly queueName: string;

    constructor(queueName: string) {
        this.queueName = queueName;
    }

    async sendMessage(request: MessageRPC, next: (error: Error, data: Data) => void): Promise<void> {
        if (_.isEmpty(this.coreBzlClient)) {
            this.coreBzlClient = await createClient();
        }
        return sendRPCMessage(this.coreBzlClient.channel, this.coreBzlClient.queue, this.coreBzlClient.corrId, this.queueName, request, next);
    }
}