import { PropertyProvider } from '../provider/property.provider';
import { NotificationService } from './notification.service';
import { Notification } from '../model/Notification';
import { io } from './socketio.service';

export class PropertyService {
  private _propertyProvider: PropertyProvider;
  private _notificationService: NotificationService;

  private get propertyProvider(): PropertyProvider {
    if (!this._propertyProvider) {
      this._propertyProvider = new PropertyProvider();
    }
    return this._propertyProvider;
  }

  private get notificationService(): NotificationService{
    if (!this._notificationService){
      this._notificationService = new NotificationService();
    }
    return this._notificationService;
  }


  async createProperty(property) {
    try {
      const propertyResponse = await this.propertyProvider.createProperty(property);

      console.log(propertyResponse);

      const notificationData: Notification = {
        type: "property_added",
        title: propertyResponse?.name,
        message: propertyResponse?.description
      } 

      const notificationResponse = await this.notificationService.createNotification(notificationData);
      io.emit('property', notificationResponse);

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

  async getPropertyByName(name: string) {
    try {
      const propertyList = await this.propertyProvider.getPropertyByName(name);

      return propertyList;
    } catch (error) {
      throw error;
    }
  }

}
