import { NotificationService } from '../service/notification.service';
import { ApiResponse } from '../utility/apiResponse';

export class NotificationController {
  private _notificationService: NotificationService;

  private get notificationService(): NotificationService {
    if (!this._notificationService) {
      this._notificationService = new NotificationService();
    }
    return this._notificationService;
  }

  async getNotificationList(req, res) {
    try {
      const response = await this.notificationService.getNotificationList();
      const apiResp = ApiResponse.success(response, 200, "Notification List");
      res.status(apiResp.status).json(apiResp);

    } catch (error) {
      const apiResp = ApiResponse.error(error);
      res.status(apiResp.status).json(apiResp);
    }
  }
}