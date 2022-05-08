import * as Amqp from 'amqplib';

export interface MessageRPC {
    readonly api: string,
    readonly method: string,
    readonly data: any /* eslint-disable-line no-any */
}

export interface ResponseRPC {
    readonly error?: { readonly error: string, readonly code: string },
    readonly response?: any /* eslint-disable-line no-any */
}

export interface RPCCLientData {
    readonly queue: Amqp.Replies.AssertQueue;
    readonly channel: Amqp.Channel;
    readonly corrId: string
}

export type Data = any; /* eslint-disable-line no-any */