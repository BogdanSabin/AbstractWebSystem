import * as express from 'express';

const ERROR_HTTP_STATUS = 500;
const OK_HTTP_STATUS = 200;

// tslint:disable: no-unsafe-any
export const respond = (res: express.Response, error, data) => {
    if (error && error.status && error.data) {
        res.status(error.status).send(error.data);
    }
    else {
        if (error) res.status(ERROR_HTTP_STATUS).send(error);
        else res.status(OK_HTTP_STATUS).send(data);
    }
}

export const redirect = (res: express.Response, error, data) => {
    if (error && error.status && error.data) {
        res.status(error.status).send(error.data);
    }
    else {
        if (error) res.status(ERROR_HTTP_STATUS).send(error);
        else res.redirect(data.redirect);
    }
}