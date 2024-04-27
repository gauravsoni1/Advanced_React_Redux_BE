import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as CORS from 'cors';

import { TodoRoutes } from './routes/todo.routes';

const app = express();
app.use(CORS({ origin: "*" }));

app.use(bodyParser.json());

app.get("/health", (req, res) => res.status(200).send("OK"));
app.use('/todo', new TodoRoutes().routes);

export default app;
