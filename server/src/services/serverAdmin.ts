process.env.serverName = 'admin';

import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import { config } from './../config';

const adminConfig = config.services.admin;
const NOT_FOUND_HTTP_STATUS = 404;

const app = express();
app.use(morgan(adminConfig.logType));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((request: express.Request, response: express.Response) => {
    // Allow connections only on SSE event endpoint
    response.writeHead(NOT_FOUND_HTTP_STATUS);
    response.end();
});

http.createServer({}, app).listen(adminConfig.port, () => {
    console.log(`Admin server is listening on port ${adminConfig.port}`);
});