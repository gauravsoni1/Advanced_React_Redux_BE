import { createUserValidation, schemaValidation } from '../const/validations';
import { UserService } from '../service/user.service';

export class UserController {
  private _userService: UserService;

  private get userService(): UserService {
    if (!this._userService) {
      this._userService = new UserService();
    }
    return this._userService;
  }

  async signup(req, res) {
    try {
      const { username, password } = req.body;

      schemaValidation(createUserValidation, req.body);

      const resp = await this.userService.signUp(username, password);

      res.send(resp);
    } catch (error) {
      res.send(error);
    }
  }

  async signin(req, res) {
    res.send('User will be signed in');
  }
}
