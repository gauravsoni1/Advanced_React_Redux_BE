import * as express from 'express';
import { PropertyController } from '../controller/property.controller';
import { authenticateRequest } from '../policies/authentication.policy';

export class PropertyRoutes {
    private router = express.Router();

    public get routes() {
        const propertyController = new PropertyController()

        this.router.post('/', authenticateRequest, propertyController.createProperty.bind(propertyController));
        this.router.post('/list', propertyController.getPropertyList.bind(propertyController));
        this.router.put('/:property_id', propertyController.updateProperty.bind(propertyController));


        return this.router;
    }
}