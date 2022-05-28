import { DocType, ModelType } from './ModelTypes';

export interface ThemeModelType extends ThemeType, ModelType { }

export interface ThemeType extends DocType {
    readonly name: string,
    readonly description: string,
    // tslint:disable-next-line: no-any
    readonly data: any
}