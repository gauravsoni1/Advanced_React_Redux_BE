import { UserProvider } from '../provider/user.provider';
import { encryptPassword } from '../utility/shared';

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
      const hashedPassword = encryptPassword(password);

      const existingUser = await this.userProvider.findUserByUsername(username);

      if (existingUser) {
        throw new Error('User already exist');
      }

      const response = this.userProvider.signUp(username, hashedPassword);
      return response;
    } catch (error) {
      throw error?.message || error;
    }
  }
}
