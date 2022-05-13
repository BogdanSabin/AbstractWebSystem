import { Factory } from '../../factory';
import { ProductData, NextFunction, UpdateProductData, IdData, ProductQueryData } from '../../types';
import { create, update, findById, queryAll, remove } from '../lib/product';

// tslint:disable: no-unsafe-any
export const productAPI = {
    create: async (data: ProductData, next: NextFunction) => {
        console.log('Data', data);
        return Factory.getInstance().getAutzClient().authorize({ token: data.token })
            .then(async (userid: string) => {
                return create(data, userid, next);
            })
            .catch(error => {
                return next(error)
            })
    },

    update: async (data: UpdateProductData, next: NextFunction) => {
        console.log('Data', data);
        return Factory.getInstance().getAutzClient().authorize({ token: data.token })
            .then(async (userid: string) => {
                return update(data, { adminId: userid }, next);
            })
            .catch(error => {
                return next(error)
            })
    },

    findById: async (data: IdData, next: NextFunction) => {
        console.log('Data', data);
        return Factory.getInstance().getAutzClient().authorize({ token: data.token })
            .then(async (userid: string) => {
                return findById(data, { adminId: userid }, next);
            })
            .catch(error => {
                return next(error)
            })
    },

    queryAll: async (data: ProductQueryData, next: NextFunction) => {
        console.log('Data', data);
        return Factory.getInstance().getAutzClient().authorize({ token: data.token })
            .then(async (userid: string) => {
                return queryAll(data, { adminId: userid }, next);
            })
            .catch(error => {
                return next(error)
            })
    },

    delete: async (data: IdData, next: NextFunction) => {
        console.log('Data', data);
        return Factory.getInstance().getAutzClient().authorize({ token: data.token })
            .then(async (userid: string) => {
                return remove(data, { adminId: userid }, next);
            })
            .catch(error => {
                return next(error)
            })
    }
}