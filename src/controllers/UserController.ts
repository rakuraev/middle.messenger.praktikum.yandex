import UserApi from '../api/UserApi/UserApi';
import Store from '../core/Store';
import { StateKeys } from '../store';

class UserController {
  private api = UserApi;

  async updatePassword(updatePasswordData: UpdateProfilePassword) {
    try {
      await this.api.changePassword(updatePasswordData);
    } catch (e) {
      console.error('Error on change password');
      throw e;
    }
  }
  async updateAvatar(avatar: File) {
    try {
      const formData = new FormData();
      formData.append('avatar', avatar, avatar.name);
      const data = await this.api.updateProfileAvatar(
        formData as UpdateProfileAvatar
      );
      Store.set(StateKeys.User, data);
    } catch (e) {
      console.error('Error on change avatar');
      throw e;
    }
  }
}

export default new UserController();
