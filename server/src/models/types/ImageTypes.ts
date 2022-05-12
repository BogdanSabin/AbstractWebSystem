import { DocType, ModelType } from './ModelTypes';

export interface ImageModelType extends ImageType, ModelType { }

export interface ImageType extends DocType {
    readonly resourceScope: string,
    readonly resourceId: string,
    readonly extension: string
}