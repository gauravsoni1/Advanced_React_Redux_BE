import sharedConfig from '../config/shared.config';
import { User } from '../model/User';
import { UserProvider } from '../provider/user.provider';

import { CustomError, ErrorMap } from '../utility/customError';
import { encryptPassword, generateJwt, getTokenData, isTokenValid, validatePassword } from '../utility/shared';

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

  private generateAuthToken(existingUser: User) {
    return generateJwt({
      usr_id: existingUser.userEmail
    }, {
      issuer: sharedConfig.jwt.issuer,
      expiresIn: '1m'
    });
  }

  private generateRefreshToken(existingUser: User) {
    return generateJwt({
      usr_id: existingUser.userEmail
    }, {
      issuer: sharedConfig.jwt.issuer,
      expiresIn: '1h'
    });
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

      const jwtToken = this.generateAuthToken(existingUser);

      const refreshToken = this.generateRefreshToken(existingUser);

      return { access_token: jwtToken, refresh_token: refreshToken, usr_id: existingUser.userEmail };
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(refreshtoken: string) {
    try {
      if (!isTokenValid(refreshtoken)) {
        throw new CustomError(ErrorMap.AUTH_FAILED)
      }

      console.log("Called");
      const tokenData = getTokenData(refreshtoken) as any;
      const existing_user = await this.userProvider.findUserByUsername(tokenData?.usr_id);

      const accesToken = this.generateAuthToken(existing_user);

      const refreshToken = this.generateRefreshToken(existing_user);

      console.log({refreshToken, accesToken});

      return {
        access_token: accesToken,
        refresh_token: refreshToken
      }

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
