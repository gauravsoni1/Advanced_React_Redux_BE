import * as express from 'express';
import { UserController } from '../controller/user.controller';
import { authenticateRequest } from '../policies/authentication.policy';

export class UserRoutes {
  private router = express.Router();

  public get routes() {
    const userController = new UserController();

    this.router.post('/signup', userController.signup.bind(userController));
    this.router.post('/signin', userController.signin.bind(userController));
    this.router.get("/token/refresh/:refresh_token", userController.refreshToken.bind(userController));
    this.router.post('/add_user',authenticateRequest, userController.addUser.bind(userController));

    return this.router;
  }
}
