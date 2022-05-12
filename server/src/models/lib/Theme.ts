import { Mongoose, SchemaDefinition, SchemaOptions } from 'mongoose';
import { ModelLib } from './ModelLib';
import { ModelNames } from '../types/ModelTypes';
import { ModelsFactory } from '../index';
import * as ThemeTypes from '../types/ThemeTypes';

// tslint:disable: no-shadowed-variable
export class Theme extends ModelLib<ThemeTypes.ThemeModelType>{
    protected static readonly SchemaDef: SchemaDefinition = {
        name: { type: String, required: true },
        description: { type: String, required: true },
    }

    readonly populateFields = {};

    protected static readonly SchemaOptions: SchemaOptions = {
        collection: ModelNames.Theme,
        autoCreate: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }

    constructor(Mongoose: Mongoose, Models: ModelsFactory) {
        super(Mongoose);

        this.setSchema(Theme.SchemaDef, Theme.SchemaOptions);

        this.createModel(ModelNames.Theme);
    }
}