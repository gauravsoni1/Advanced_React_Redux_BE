import ListingsAndReviewsModel from '../model/Property';

export class PropertyProvider {

  async createProperty(property) {
    const parsedPropertyInput = { ...property, images: { picture_url: property?.image } }
    delete parsedPropertyInput['image'];

    const propertyData = new ListingsAndReviewsModel(parsedPropertyInput);

    try {
      const resp = await propertyData.save();

      return resp;
    } catch (error) {
      throw error;
    }
  }
}
