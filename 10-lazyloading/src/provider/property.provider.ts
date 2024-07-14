import ListingsAndReviewsModel from '../model/Property';
import { CustomError, ErrorMap } from '../utility/customError';

export class PropertyProvider {

  async getPropertyById(propertyId) {
    try {
      const response = await ListingsAndReviewsModel.findOne({ _id: propertyId });

      return response;
    } catch (error) {
      throw error;
    }
  }

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

  async getPropertyList(page: number, limit: number) {
    try {
      // @ts-ignore

      const response = await ListingsAndReviewsModel.paginate({}, { page, limit });

      return response?.docs;
    } catch (err) {
      throw err;
    }
  }

  async updateProperty(property_id, property) {

    try {
      const updatedProperty = await ListingsAndReviewsModel.findOneAndUpdate(
        { _id: property_id },
        property,
        { new: true }
      );

      if (updatedProperty) {
        return updatedProperty
      } else {
        throw new CustomError(ErrorMap.PROPERTY_NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }

  async getPropertyByName(name: string) {
    try {
      // @ts-ignore
      const response = await ListingsAndReviewsModel.find({ name: { $regex: `^${name}` } });

      return response;
    } catch (err) {
      throw err;
    }
  }
}
