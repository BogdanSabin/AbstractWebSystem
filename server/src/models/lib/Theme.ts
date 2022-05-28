import { Mongoose, SchemaDefinition, SchemaOptions, Schema } from 'mongoose';
import { ModelLib } from './ModelLib';
import { ModelNames } from '../types/ModelTypes';
import { ModelsFactory } from '../index';
import * as ThemeTypes from '../types/ThemeTypes';

// tslint:disable: no-shadowed-variable
export class Theme extends ModelLib<ThemeTypes.ThemeModelType>{
    protected static readonly SchemaDef: SchemaDefinition = {
        name: { type: String, required: true },
        description: { type: String, required: true },
        data: { type: Schema.Types.Mixed, required: false }
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

        this.seedData([{
            _id: '200000000000000000000001',
            name: 'Theme A',
            description: 'Here comes the description'
        },
        {
            _id: '200000000000000000000002',
            name: 'Theme B',
            description: 'Here comes the description'
        }], ['_id'])
    }
}