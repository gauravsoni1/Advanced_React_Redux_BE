import * as express from 'express';
import { UserRoutes } from './routes/user.routes';
import * as bodyParser from 'body-parser';
import * as CORS from 'cors';

import './config/mongo_init';
import { PropertyRoutes } from './routes/property.routes';

const app = express();
app.use(CORS({origin: "http://localhost:5173"}));

app.use(bodyParser.json());

app.use('/user', new UserRoutes().routes);
app.use('/property', new PropertyRoutes().routes);

export default app;