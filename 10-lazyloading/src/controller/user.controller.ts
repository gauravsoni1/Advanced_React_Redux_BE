import { addUserValidation, createUserValidation, schemaValidation, signinValidation } from '../const/validations';
import { UserService } from '../service/user.service';
import { ApiResponse } from '../utility/apiResponse';
import { CustomError, ErrorMap } from '../utility/customError';

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

      const apiResp = ApiResponse.success(resp, 201, "User Signed up");
      res.status(apiResp.status).json(apiResp);
    } catch (error) {
      const apiResp = ApiResponse.error(error);
      res.status(apiResp.status).json(apiResp);
    }
  }

  async addUser(req, res) {
    try {
      const { username, password, role } = req.body;
      const { org_id } = req;

      schemaValidation(addUserValidation, req.body);

      const resp = await this.userService.addUser(username, password, org_id, role);

      const apiResp = ApiResponse.success(resp, 201, "User Signed up");
      res.status(apiResp.status).json(apiResp);
    } catch (error) {
      const apiResp = ApiResponse.error(error);
      res.status(apiResp.status).json(apiResp);
    }
  }

  async signin(req, res) {
    try {
      const { username, password, fingerprint } = req.body;

      schemaValidation(signinValidation, req.body);

      const resp = await this.userService.signIn(username, password, fingerprint);

      const apiResp = ApiResponse.success(resp, 200, "User Signed In");
      res.status(apiResp.status).json(apiResp);
    } catch (error) {
      const apiResp = ApiResponse.error(error);
      res.status(apiResp.status).json(apiResp);
    }
  }

  async refreshToken(req, res) {
    try {
      const { refresh_token } = req.params;

      if (!refresh_token) {
        throw new CustomError(ErrorMap.INVALID_INPUT)
      }

      const resp = await this.userService.refreshToken(refresh_token);

      const apiResp = ApiResponse.success(resp, 200, "token refreshed");
      res.status(apiResp.status).json(apiResp);
    } catch (error) {
      const apiResp = ApiResponse.error(error);
      res.status(apiResp.status).json(apiResp);
    }
  }
}
