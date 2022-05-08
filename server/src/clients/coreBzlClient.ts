import * as _ from 'lodash';
import { config } from './../config';
import { createClient, sendRPCMessage } from '../RabbitMQ';
import { MessageRPC, Data, RPCCLientData } from '../RabbitMQ/types';

const queueName = config.rpc.coreBzl.queueName;

let CoreBzlClient: RPCCLientData;

export const sendMessage = async (request: MessageRPC, next: (error: Error, data: Data) => void) => {
    if (_.isEmpty(CoreBzlClient)) {
        CoreBzlClient = await createClient();
    }
    return sendRPCMessage(CoreBzlClient.channel, CoreBzlClient.queue, CoreBzlClient.corrId, queueName, request, next);
}