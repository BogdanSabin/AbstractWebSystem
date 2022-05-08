import * as Amqp from 'amqplib';
import { MessageRPC, ResponseRPC } from './types';
import { registrarAPI } from '../api';

export const startRpcServer = async (queueName: string) => {
    try {
        const connection = await Amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { exclusive: true });
        channel.prefetch(1);

        channel.consume(queueName, (msg: Amqp.ConsumeMessage) => {
            const message: MessageRPC = JSON.parse(msg.content.toString());
            const api = message.api;
            const method = message.method;
            if (registrarAPI[api] && registrarAPI[api][method]) {
                registrarAPI[api][method](message.data, (error, data) => {
                    const response: ResponseRPC = { error: error, response: data };
                    channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
                        correlationId: msg.properties.correlationId
                    });

                    channel.ack(msg);
                })
            } else {
                const response: ResponseRPC = { error: { error: new Error(registrarAPI[api] ? `Unknown method: ${api}.${method}` : `Unknown API: ${api}`).message, code: '500' } };
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
                    correlationId: msg.properties.correlationId
                });

                channel.ack(msg);
            }

        }, { noAck: false });

    } catch (error) {
        console.log('RPC_SERVER ERROR', error);
    }
}