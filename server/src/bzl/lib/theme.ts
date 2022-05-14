import * as _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import { config } from './../../config';
import { ThemeUploadData, NextFunction, IdData, ThemeDetailQuery } from '../../types';
import { genericRmove, genericFindById, genericQueryAll } from './common';
import { Factory } from '../../factory';
import { BzlError } from './BzlError';


const storage = path.join(__dirname, config.volumes.themes.pathBzl);

export const create = async (data: ThemeUploadData, next: NextFunction) => {
    const Model = Factory.getInstance().getModels().getThemeModel();
    const themeName = `${data.id}.js`;
    const newITheme = new Model({
        _id: data.id,
        name: data.name,
        description: data.description
    })

    return newITheme.save()
        .then(theme => { return next(null, theme) })
        .catch(error => { removeThemeFromDisk(themeName); return next(BzlError.InteralError(_.toString(error))) })

}

export const findById = async (data: IdData, next: NextFunction) => {
    const Model = Factory.getInstance().getModels().getThemeModel();
    return genericFindById(data, {}, Model, next);
}

export const getDetails = async (data: ThemeDetailQuery, next: NextFunction) => {
    const Model = Factory.getInstance().getModels().getThemeModel();
    const searchFilter = { $or: [] };
    const textFields: readonly string[] = ['name', 'description']
    if (!_.isEmpty(data.text)) {
        _.forEach(textFields, f => {
            searchFilter['$or'].push({ [f]: { $regex: new RegExp(data.text, 'i') } })
        })
    }
    return genericQueryAll(_.isEmpty(searchFilter.$or) ? {} : searchFilter, Model, next);
}

export const remove = async (data: IdData, next: NextFunction) => {
    const Model = Factory.getInstance().getModels().getThemeModel();
    return genericRmove(data, {}, Model, (err, removedTheme) => {
        if (err) return next(err);
        else {
            // tslint:disable: no-unsafe-any
            const themeName = `${removedTheme._id}.js`;
            removeThemeFromDisk(themeName);
            return next(null, removedTheme);
        }
    });
}

const removeThemeFromDisk = (themeName: string) => {
    try {
        fs.unlinkSync(path.join(storage, themeName));
    } catch (error) {
        console.log('Error while removing file from disk', error);
    }
}