import { Roles } from '../const/permissions';
import UserModel from '../model/User';
import { generateOrgId } from '../utility/shared';

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
        orgId: generateOrgId(),
        role: Roles.ADMIN
      });

      const resp = await userData.save();

      return resp;
    } catch (error) {
      throw error;
    }
  }

  async addUser(username: string, password: string, org_id: string, role: Roles) {
    try {
      const userData = new UserModel({
        userEmail: username,
        userPassword: password,
        orgId: org_id,
        role: role
      });

      const resp = await userData.save();

      return resp;
    } catch (error) {
      throw error;
    }
  }
}
