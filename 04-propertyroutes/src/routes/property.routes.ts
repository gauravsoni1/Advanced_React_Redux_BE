import * as express from 'express';
import { PropertyController } from '../controller/property.controller';

export class PropertyRoutes {
    private router = express.Router();

    public get routes() {
        const propertyController = new PropertyController()

        this.router.post('/', propertyController.createProperty.bind(propertyController));
        return this.router;
    }
}