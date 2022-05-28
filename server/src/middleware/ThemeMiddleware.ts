import * as express from 'express';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import * as formidable from 'formidable';
import * as fs from 'fs';
import * as path from 'path';
import { RPCClient } from '../clients';
import { respond, sendFile } from './helper';
import { IdData, ThemeDetailQuery, ThemeData, ThemeUploadData } from '../types';
import { config } from './../config';
import { BzlError } from '../bzl/lib/BzlError';

export class ThemeMiddleware {
    private readonly rpcClient: RPCClient;
    private readonly storage: string;

    constructor(client: RPCClient) {
        this.rpcClient = client;
        this.storage = path.join(__dirname, config.volumes.themes.path);
    }

    upload(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            if (!fs.existsSync(this.storage)) fs.mkdirSync(this.storage, { recursive: true });
            const form = new formidable.IncomingForm({ uploadDir: this.storage, maxFieldsSize: config.volumes.themes.maxSize });
            form.parse(req, (error, fields, files) => {
                if (error) { respond(res, _.toString(error), null); }
                else {
                    const themeData = JSON.parse(fields.themeData as string) as ThemeData;
                    const theme = files['theme'] as formidable.File;

                    if (!this.isFileValid(theme, config.volumes.themes.allowedExtensions)) return respond(res, BzlError.InvalidArgument(`Invalid theme type <${theme.mimetype}>! Required: ${config.volumes.themes.allowedExtensions}`), null)
                    else {
                        const ObjectId = mongoose.Types.ObjectId;
                        const fileName = _.toString(new ObjectId());
                        const extension = _.last(_.split(theme.originalFilename, '.'));
                        fs.rename(theme.filepath, path.join(this.storage, `${fileName}.${extension}`), (err) => {
                            if (err) respond(res, _.toString(err), null);
                            else {
                                const themeUploadData: ThemeUploadData = {
                                    token: req.headers.authorization,
                                    ...themeData,
                                    id: fileName
                                }
                                this.rpcClient.sendMessage({ api: 'theme', method: 'upload', data: themeUploadData })
                                    .then(data => {
                                        return respond(res, null, data);
                                    }).catch(err2 => {
                                        return respond(res, err2, null);
                                    })
                            }
                        })
                    }
                }
            })
        } catch (error) { respond(res, _.toString(error), null); }
    }

    add(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const themeData: ThemeData = {
            token: req.headers.authorization,
            ...req.body as ThemeData
        }
        if (_.isEmpty(themeData.data)) respond(res, BzlError.InvalidArgument('Theme data is mandatory'), null);
        else {
            this.rpcClient.sendMessage({ api: 'theme', method: 'add', data: themeData })
                .then(data => {
                    return respond(res, null, data);
                }).catch(err2 => {
                    return respond(res, err2, null);
                })
        }
    }

    findById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const idData: IdData = {
            token: req.headers.authorization,
            id: req.params.themeid
        }
        const asFile = _.isBoolean(req.query.asFile) ? req.query.asFile : false;
        this.rpcClient.sendMessage({ api: 'theme', method: 'findById', data: idData })
            .then(data => {
                if (asFile) {
                    // tslint:disable-next-line: no-unsafe-any
                    const fileName = `${data._id}.js`;
                    return sendFile(res, path.join(this.storage, fileName));
                }
                else return respond(res, null, data);
            }).catch(error => {
                return respond(res, error, null);
            })
    }

    getDetails(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const queryData: ThemeDetailQuery = {
            token: req.headers.authorization,
            ...!_.isEmpty(req.query.text) && { text: (req.query.text as string) }
        }
        this.rpcClient.sendMessage({ api: 'theme', method: 'getDetails', data: queryData })
            .then(data => {
                return respond(res, null, data);
            }).catch(error => {
                return respond(res, error, null);
            })
    }

    remove(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const idData: IdData = {
            token: req.headers.authorization,
            id: req.params.themeid
        }
        this.rpcClient.sendMessage({ api: 'theme', method: 'delete', data: idData })
            .then(data => {
                return respond(res, null, data);
            }).catch(error => {
                return respond(res, error, null);
            })
    }

    private readonly isFileValid = (file: formidable.File, validTypes: readonly string[]): boolean => {
        const type = _.last(_.split(file.originalFilename, '.'));
        return validTypes.indexOf(type) === -1 ? false : true;
    }
}