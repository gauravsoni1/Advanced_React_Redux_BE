import { PropertyProvider } from '../provider/property.provider';

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

}
