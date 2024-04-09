import { PropertyProvider } from '../provider/property.provider';
import { CustomError, ErrorMap } from '../utility/customError';

export class PropertyService {
  private _propertyProvider: PropertyProvider;

  private get propertyProvider(): PropertyProvider {
    if (!this._propertyProvider) {
      this._propertyProvider = new PropertyProvider();
    }
    return this._propertyProvider;
  }

  async createProperty(property) {
    try {
      const propertyResponse = await this.propertyProvider.createProperty(property);

      console.log(propertyResponse);

      return propertyResponse;
    } catch (error) {
      throw error;
    }
  }

  async getPropertyList(page: number, limit: number) {
    try {
      const propertyResponse = await this.propertyProvider.getPropertyList(page, limit);

      return propertyResponse;
    } catch (error) {
      throw error;
    }
  }

  async updateProperty(property_id, property) {
    try {
      const propertyResponse = await this.propertyProvider.updateProperty(property_id, property);

      console.log(propertyResponse);

      return propertyResponse;
    } catch (error) {
      throw error;
    }
  }

}
