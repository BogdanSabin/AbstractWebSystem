import { Factory } from './../factory';
import { config } from './../config';
import { startRpcServer } from '../RabbitMQ';

const queueName = config.rpc.autorizator.queueName;

startRpcServer(queueName) // initialize RPC server
    .then(() => {
        return Factory.getInstance(); // initialize Factory
    })
    .then(() => {
        console.log('Autorizator server started!');
    })
    .catch(error => {
        console.log('Error while starting autorizator server...', error);
    });