import sharedConfig from '../config/shared.config';
import { Roles, permissionMap } from '../const/permissions';
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

  async addUser(username: string, password: string, org_id: string, role: Roles) {
    try {

      const existingUser = await this.userProvider.findUserByUsername(username);

      if (existingUser) {
        throw new CustomError(ErrorMap.USER_EXIST);
      }

      const encryptedPassword = encryptPassword(password);

      const response = this.userProvider.addUser(username, encryptedPassword, org_id, role);
      return response;
    } catch (error) {
      throw error;
    }
  }

  private generateAuthToken(existingUser: User, fingerprint: string) {
    return generateJwt({
      usr_id: existingUser.userEmail,
      org_id: existingUser.orgId,
      usr_role: existingUser.role,
      fingerprint
    }, {
      issuer: sharedConfig.jwt.issuer,
      expiresIn: '30m'
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

  async signIn(username: string, password: string, fingerprint: string) {
    try {

      const existingUser = await this.userProvider.findUserByUsername(username);

      if (!existingUser) {
        throw new CustomError(ErrorMap.INVALID_SIGNIN);
      }
      const isPasswordValid = validatePassword(password, existingUser.userPassword);

      if (!isPasswordValid) {
        throw new CustomError(ErrorMap.INVALID_SIGNIN);
      }

      const jwtToken = this.generateAuthToken(existingUser, fingerprint);

      const refreshToken = this.generateRefreshToken(existingUser);

      return {
        access_token: jwtToken,
        refresh_token: refreshToken,
        usr_id: existingUser.userEmail,
        org_id: existingUser.orgId,
        usr_role: existingUser.role,
        usr_permissions: permissionMap[existingUser.role]
      };
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

      const accesToken = this.generateAuthToken(existing_user, null);

      const refreshToken = this.generateRefreshToken(existing_user);

      // console.log({ refreshToken, accesToken });

      return {
        access_token: accesToken,
        refresh_token: refreshToken,
        usr_id: existing_user.userEmail
      }

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
