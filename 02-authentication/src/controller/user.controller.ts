import { createUserValidation, schemaValidation } from '../const/validations';
import { UserService } from '../service/user.service';
import { ApiResponse, StatusCodes } from '../utility/apiResponse';

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

      const apiRep = new ApiResponse("Signup Success", resp, StatusCodes.CREATED);

      res.send(apiRep);
    } catch (error) {

      const apiResp = new ApiResponse("Signup Failed", error, StatusCodes.BAD_REQUEST);
      res.send(apiResp);
    }
  }

  async signin(req, res) {
    res.send('User will be signed in automatically');
  }
}
