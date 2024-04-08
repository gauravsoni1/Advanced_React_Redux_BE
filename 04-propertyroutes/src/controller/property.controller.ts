import { PropertyService } from '../service/property.service';
import { ApiResponse } from '../utility/apiResponse';

export class PropertyController {
    private _propertyService: PropertyService;

    private get propertyService(): PropertyService {
        if (!this._propertyService) {
            this._propertyService = new PropertyService();
        }
        return this._propertyService;
    }

    async createProperty(req, res) {
        try {
            const { body } = req;
            const usr_id = req?.usr_id;
            const response = await this.propertyService.createProperty({ ...body, createdBy: usr_id });

            const apiResp = ApiResponse.success(response, 201, "User Signed up");
            res.status(apiResp.status).json(apiResp);
        } catch (error) {
            const apiResp = ApiResponse.error(error);
            res.status(apiResp.status).json(apiResp);
        }
    }

}
