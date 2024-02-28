import * as express from 'express';
import { UserController } from '../controller/user.controller';

export class UserRoutes {
  private router = express.Router();

  public get routes() {
    const userController = new UserController();

    this.router.post('/signup', userController.signup.bind(userController));
    this.router.post('/signin', userController.signin.bind(userController));

    return this.router;
  }
}
