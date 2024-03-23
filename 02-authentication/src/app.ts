import * as express from 'express';
import { UserRoutes } from './routes/user.routes';
import * as bodyParser from 'body-parser';
import * as CORS from 'cors';

import './config/mongo_init';

const app = express();
app.use(CORS({origin: "http://localhost:5173"}));

app.use(bodyParser.json());

app.use('/user', new UserRoutes().routes);

export default app;
