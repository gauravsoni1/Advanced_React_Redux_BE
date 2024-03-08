import { UserProvider } from '../provider/user.provider';
import * as bcrypt from 'bcrypt';

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

  async signUp(username: string, password: string) {
    try {

      const existingUser = await this.userProvider.findUserByUsername(username);

      if (existingUser) {
        throw new Error('User already exist');
      }

      const encryptedPassword = this.encryptPassword(password);

      const response = this.userProvider.signUp(username, encryptedPassword);
      return response;
    } catch (error) {
      throw error?.message || error;
    }
  }
}
