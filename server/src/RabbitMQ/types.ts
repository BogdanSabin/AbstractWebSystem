import * as Amqp from 'amqplib';

export interface MessageRPC {
    readonly api: string,
    readonly method: string,
    // tslint:disable-next-line: no-any
    readonly data: any
}

export interface ResponseRPC {
    readonly error?: { readonly error: string, readonly code: string },
    // tslint:disable-next-line: no-any
    readonly response?: any
}

export interface RPCCLientData {
    readonly queue: Amqp.Replies.AssertQueue;
    readonly channel: Amqp.Channel;
    readonly corrId: string
}

// tslint:disable-next-line: no-any
export type Data = any;