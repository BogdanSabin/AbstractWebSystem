import { DocType, ModelType } from './ModelTypes';

export interface OrderModelType extends OrderType, ModelType { }

export interface OrderType extends DocType {
    readonly siteId: string,
    readonly customerId?: string,
    readonly createdAt: Date,
    readonly orderInfo: readonly {
        readonly key: string,
        readonly type: string,
    }[]

}