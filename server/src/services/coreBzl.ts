import { startRpcServer } from '../RabbitMQ';

startRpcServer('rpc_corebzl_queue')
    .then(() => {
        console.log('CoreBzl server started!');
    });
