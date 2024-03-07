import * as express from 'express';
import { UserRoutes } from './routes/user.routes';
import * as bodyParser from 'body-parser';

import './config/mongo_init';

const app = express();

app.use(bodyParser.json());

app.use('/user', new UserRoutes().routes);

export default app;
