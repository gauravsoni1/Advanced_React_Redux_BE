import * as express from 'express';
import { NotificationController } from '../controller/notification.controller';
import { authenticateRequest } from '../policies/authentication.policy';

export class NotificationRoutes {
  private router = express.Router();

  public get routes() {
    const notificationController = new NotificationController();

    this.router.get('/list', authenticateRequest, notificationController.getNotificationList.bind(notificationController));

    return this.router;
  }
}
