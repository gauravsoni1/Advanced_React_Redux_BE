import ListingsAndReviewsModel from '../model/Property';

export class PropertyProvider {

  async createProperty(property) {
    const propertyData = new ListingsAndReviewsModel(property);

    try {
      const resp = await propertyData.save();

      return resp;
    } catch (error) {
      throw error;
    }
  }
}
