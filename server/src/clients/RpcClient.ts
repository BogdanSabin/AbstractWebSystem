import { MessageRPC, Data } from '../RabbitMQ/types';

export interface RPCClient {
    sendMessage(request: MessageRPC, next: (error: Error, data: Data) => void): void
}