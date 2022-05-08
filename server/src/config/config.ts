import { ConfigurationType } from './types';

export const config: ConfigurationType = {
    development: {
        mongodb: 'mongodb://localhost:27017/websystem',
        services: {
            admin: {
                port: 8000,
                hostname: 'localhost',
                logType: 'dev'
            },
            desktop: {
                port: 8001,
                hostname: 'localhost',
                logType: 'dev'
            },
            mobile: {
                port: 8002,
                hostname: 'localhost',
                logType: 'dev'
            }
        },
        rpc: {
            coreBzl: {
                queueName: 'rpc_corebzl_queue'
            }
        },
        crypto: {
            algorithm: 'aes-256-cbc',
            key: 'lslj@{0RwFDAKqS3l0Q8q(ET4$5bgiwl',
            iv: 'XJ3LWoLw:1zD!}wf'
        },
        auth: {
            secret: {
                auth: 'HYtvL7Of8KcZbdomUAeVRJmd61WUycOrJYSkmZzN',
                email: 'aBVEUj9bJveUiPokFUIumGBFsTnuqAXwGRVGPgyn'
            }
        }
    },
    production: {},
    test: {}
}