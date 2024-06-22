import NotificationModel, { Notification } from '../model/Notification';

export class NotificationProvider {
  async getNotificationList() {
    try {
      const response = await NotificationModel.find();

      return response;
    } catch (err) {
      throw err;
    }
  }

  async createNotification(notification: Notification) {

    const notificationData = new NotificationModel(notification);

    try {
      const resp = await notificationData.save();

      return resp;
    } catch (error) {
      throw error;
    }
  }
}
