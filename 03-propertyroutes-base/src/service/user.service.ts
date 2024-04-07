import { UserProvider } from '../provider/user.provider';

import { CustomError, ErrorMap } from '../utility/customError';
import { encryptPassword, generateJwt, validatePassword } from '../utility/shared';

export class UserService {
  private _userProvider: UserProvider;

  private get userProvider(): UserProvider {
    if (!this._userProvider) {
      this._userProvider = new UserProvider();
    }
    return this._userProvider;
  }



  async signUp(username: string, password: string) {
    try {

      const existingUser = await this.userProvider.findUserByUsername(username);

      if (existingUser) {
        throw new CustomError(ErrorMap.USER_EXIST);
      }

      const encryptedPassword = encryptPassword(password);

      const response = this.userProvider.signUp(username, encryptedPassword);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async signIn(username: string, password: string) {
    try {

      const existingUser = await this.userProvider.findUserByUsername(username);

      if (!existingUser) {
        throw new CustomError(ErrorMap.INVALID_SIGNIN);
      }
      const isPasswordValid = validatePassword(password, existingUser.userPassword);

      if (!isPasswordValid) {
        throw new CustomError(ErrorMap.INVALID_SIGNIN);
      }

      const jwtToken = generateJwt({
        usr_id: existingUser.userEmail
      }, {
        issuer: "wow_bnb",
        expiresIn: '1m'
      });

      const refreshToken = generateJwt({
        urs_id: existingUser.userEmail
      }, {
        issuer: "wow_bnb",
        expiresIn: '1h'
      })

      return { access_token: jwtToken, refresh_token: refreshToken };
    } catch (error) {
      throw error;
    }
  }
}
