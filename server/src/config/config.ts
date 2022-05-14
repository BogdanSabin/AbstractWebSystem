import { ConfigurationType } from './types';

export const config: ConfigurationType = {
    development: {
        mongodb: 'mongodb://localhost:27017/websystem',
        services: {
            admin: {
                port: 8000,
                hostname: 'localhost:8000',
                protocol: 'http',
                logType: 'dev'
            },
            desktop: {
                port: 8001,
                hostname: 'localhost:8001',
                protocol: 'http',
                logType: 'dev'
            },
            mobile: {
                port: 8002,
                hostname: 'localhost:8002',
                protocol: 'http',
                logType: 'dev'
            }
        },
        rpc: {
            coreBzl: {
                queueName: 'rpc_corebzl_queue'
            },
            autorizator: {
                queueName: 'rpc_autz_queue'
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
            },
            email: {
                type: 'gmail',
                email: 'trips.appmobile@gmail.com',
                password: 'Tripsapp123'
            }
        },
        volumes: {
            images: {
                path: './../../volumes/images',
                pathBzl: './../../../volumes/images',
                // tslint:disable-next-line: no-magic-numbers
                maxSize: 50 * 1024 * 1024, // 5MB
                allowedExtensions: ['png', 'jpg', 'jpeg', 'gif']
            },
            themes: {
                path: './../../themes/images',
                pathBzl: './../../../themes/images',
                // tslint:disable-next-line: no-magic-numbers
                maxSize: 900 * 1024 * 1024,// 90MB
                allowedExtensions: ['js']
            }
        }
    },
    production: {},
    test: {}
}