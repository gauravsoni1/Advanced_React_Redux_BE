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

            const apiResp = ApiResponse.success(response, 201, "Property created");
            res.status(apiResp.status).json(apiResp);
        } catch (error) {
            const apiResp = ApiResponse.error(error);
            res.status(apiResp.status).json(apiResp);
        }
    }

    async getPropertyList(req, res) {
        try {
            const { page = 1, limit = 20 } = req.body;
            const response = await this.propertyService.getPropertyList(page, limit);

            const apiResp = ApiResponse.success(response, 200, "Property List");
            res.status(apiResp.status).json(apiResp);
        } catch (error) {
            const apiResp = ApiResponse.error(error);
            res.status(apiResp.status).json(apiResp);
        }
    }

    async updateProperty(req, res) {
        try {
            const { body } = req;
            const { property_id } = req.params;
            const response = await this.propertyService.updateProperty(property_id, body);

            const apiResp = ApiResponse.success(response, 201, "Property Updated");
            res.status(apiResp.status).json(apiResp);
        } catch (error) {
            const apiResp = ApiResponse.error(error);
            res.status(apiResp.status).json(apiResp);
        }
    }

    async getPropertyByName(req, res) {
        try {
            const { name } = req.params;
            const response = await this.propertyService.getPropertyByName(name);


            const apiResp = ApiResponse.success(response, 200, "");
            res.status(apiResp.status).json(apiResp);
        } catch (error) {
            const apiResp = ApiResponse.error(error);
            res.status(apiResp.status).json(apiResp);
        }
    }

}
