import { NextFunction, ThemeUploadData, IdData, ThemeDetailQuery, ThemeData } from '../../types';
import { Factory } from '../../factory';
import { create, findById, getDetails, remove, add } from '../lib/theme';

const api = 'theme';

// tslint:disable: no-unsafe-any
export const themeAPI = {
    upload: async (data: ThemeUploadData, next: NextFunction) => {
        console.log('Data', data);
        return Factory.getInstance().getAutzClient().authorize({ token: data.token, api: api, method: 'upload' })
            .then(async () => {
                return create(data, next);
            })
            .catch(error => {
                return next(error)
            })
    },

    add: async (data: ThemeData, next: NextFunction) => {
        console.log('Data', data);
        return Factory.getInstance().getAutzClient().authorize({ token: data.token, api: api, method: 'add' })
            .then(async () => {
                return add(data, next);
            })
            .catch(error => {
                return next(error)
            })
    },

    findById: async (data: IdData, next: NextFunction) => {
        console.log('Data', data);
        // return Factory.getInstance().getAutzClient().authorize({ token: data.token, api: api, method: 'findByRef' })
        // .then(async (userid: string) => {
        return findById(data, next);
        // })
        // .catch(error => {
        // return next(error)
        // })
    },

    getDetails: async (data: ThemeDetailQuery, next: NextFunction) => {
        console.log('Data', data);
        return Factory.getInstance().getAutzClient().authorize({ token: data.token, api: api, method: 'getDetails' })
            .then(async () => {
                return getDetails(data, next);
            })
            .catch(error => {
                return next(error)
            })
    },

    delete: async (data: IdData, next: NextFunction) => {
        console.log('Data', data);
        return Factory.getInstance().getAutzClient().authorize({ token: data.token, api: api, method: 'delete' })
            .then(async () => {
                return remove(data, next);
            })
            .catch(error => {
                return next(error)
            })
    }
}