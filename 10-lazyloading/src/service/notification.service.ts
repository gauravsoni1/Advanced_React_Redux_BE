import { Notification } from '../model/Notification';
import { NotificationProvider } from '../provider/notification.provider';

export class NotificationService {
  private _notificationProvider: NotificationProvider;

  private get notificationProvider(): NotificationProvider {
    if (!this._notificationProvider) {
      this._notificationProvider = new NotificationProvider();
    }
    return this._notificationProvider;
  }

  async getNotificationList() {
    try {
      const propertyList = await this.notificationProvider.getNotificationList();
      console.log(propertyList);

      return propertyList;
    } catch (error) {
      console.log(error);
    }
  }

  async createNotification(notification: Notification) {
    try {
      const response = await this.notificationProvider.createNotification(notification);

      return response;
    } catch (error) {
      throw error;
    }
  }
}