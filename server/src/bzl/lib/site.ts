import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import { BzlError } from './BzlError';
import { Factory } from './../../factory';
import { SiteData, NextFunction, IdData, SiteQueryData, UpdateSiteData } from '../../types';
import { config } from './../../config';

export interface SiteFilter {
    readonly adminId: string
}

export const create = async (data: SiteData, adminId: string, next: NextFunction) => {
    const Model = Factory.getInstance().getModels().getSiteModel();
    const ObjectId = mongoose.Types.ObjectId;
    const id = new ObjectId();
    const linkDesktop = `${config.services.desktop.protocol}://${config.services.desktop.hostname}/site/${id}`
    const linkMobile = `${config.services.mobile.protocol}://${config.services.mobile.hostname}/site/${id}`

    const newSite = new Model(_.extend({}, _.omit(data, ['token']), { adminId: adminId, linkDesktop: linkDesktop, linkMobile: linkMobile, _id: id }));
    return newSite.save()
        .then(site => { return next(null, site) })
        .catch(error => { return next(BzlError.InteralError(_.toString(error))) })
}

export const update = async (data: UpdateSiteData, filter: SiteFilter, next: NextFunction) => {
    const Model = Factory.getInstance().getModels().getSiteModel();
    return Model.findOneAndUpdate({ _id: data.id, adminId: filter.adminId }, _.omit(data, ['id', 'token']), { new: true })
        .then(site => {
            return next(null, site);
        }).catch(err => {
            return next(BzlError.InteralError(_.toString(err)));
        })
}

export const findById = async (data: IdData, filter: SiteFilter, next: NextFunction) => {
    const Model = Factory.getInstance().getModels().getSiteModel();
    return Model.findOne({ _id: data.id, adminId: filter.adminId })
        .then(site => {
            if (!site) next(BzlError.NodataFound());
            else return next(null, site);
        }).catch(err => {
            return next(BzlError.InteralError(_.toString(err)));
        })
}

export const queryAll = async (data: SiteQueryData, filter: SiteFilter, next: NextFunction) => {
    const Model = Factory.getInstance().getModels().getSiteModel();
    const textSearchFilter = { $or: [] };
    const textFields: readonly string[] = ['name', 'description']
    if (!_.isEmpty(data.text)) {
        _.forEach(textFields, f => {
            textSearchFilter['$or'].push({ [f]: { $regex: new RegExp(data.text, 'i') } })
        })
    }
    const searchFilter = {
        adminId: filter.adminId,
        ...!_.isEmpty(textSearchFilter['$or']) && textSearchFilter
    };
    return Model.find(searchFilter)
        .then(sites => {
            if (_.isEmpty(sites)) next(BzlError.NodataFound());
            else return next(null, sites);
        }).catch(err => {
            return next(BzlError.InteralError(_.toString(err)));
        })
}

export const remove = async (data: IdData, filter: SiteFilter, next: NextFunction) => {
    const Model = Factory.getInstance().getModels().getSiteModel();
    return Model.findOneAndDelete({ _id: data.id, adminId: filter.adminId })
        .then(res => {
            if (!res) next(BzlError.NodataFound());
            else return next(null, res);
        }).catch(err => {
            return next(BzlError.InteralError(_.toString(err)));
        })
}