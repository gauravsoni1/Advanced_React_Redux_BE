import UserModel from '../model/User';

export class UserProvider {
  async findUserByUsername(username: string) {
    try {
      const user = await UserModel.findOne({ userEmail: username });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async signUp(username: string, password: string) {
    try {
      const userData = new UserModel({
        userEmail: username,
        userPassword: password,
      });

      const resp = await userData.save();

      return resp;
    } catch (error) {
      throw error;
    }
  }
}
