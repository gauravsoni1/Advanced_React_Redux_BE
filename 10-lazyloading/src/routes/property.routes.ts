import * as express from 'express';
import { PropertyController } from '../controller/property.controller';
import { authenticateRequest } from '../policies/authentication.policy';
import { authRequest } from '../policies/auth.policy';
import { Permissions } from '../const/permissions';
import { fingerprintCheck } from '../policies/fingerprint.policy';

export class PropertyRoutes {
    private router = express.Router();

    public get routes() {
        const propertyController = new PropertyController()

        this.router.post('/', authenticateRequest,fingerprintCheck, authRequest([Permissions.CREATE_PROPERTY]), propertyController.createProperty.bind(propertyController));
        this.router.post('/list', propertyController.getPropertyList.bind(propertyController));
        this.router.put('/:property_id', propertyController.updateProperty.bind(propertyController));
        this.router.get('/search/:name', propertyController.getPropertyByName.bind(propertyController));
        
        return this.router;
    }
}