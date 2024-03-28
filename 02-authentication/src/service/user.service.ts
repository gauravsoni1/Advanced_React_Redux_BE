import { UserProvider } from '../provider/user.provider';
import * as bcrypt from 'bcrypt';
import { CustomError, ErrorMap } from '../utility/customError';

export class UserService {
  private _userProvider: UserProvider;

  private get userProvider(): UserProvider {
    if (!this._userProvider) {
      this._userProvider = new UserProvider();
    }
    return this._userProvider;
  }

  encryptPassword(password: string) {
    const encryptedPassword = bcrypt.hashSync(password, 10);
    return encryptedPassword
  }

  validatePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  async signUp(username: string, password: string) {
    try {

      const existingUser = await this.userProvider.findUserByUsername(username);

      if (existingUser) {
        throw new CustomError(ErrorMap.USER_EXIST);
      }

      const encryptedPassword = this.encryptPassword(password);

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
      const isPasswordValid = this.validatePassword(password, existingUser.userPassword);

      if (!isPasswordValid) {
        throw new CustomError(ErrorMap.INVALID_SIGNIN);
      }
      return "Valid Signin";
    } catch (error) {
      throw error;
    }
  }
}
