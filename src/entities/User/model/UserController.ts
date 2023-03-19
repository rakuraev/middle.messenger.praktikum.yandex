import { UserApi } from 'entities/User';
import { StateKeys } from 'shared/config';
import { Store } from 'shared/lib/core';

class UserController {
  private api = UserApi;

  async updatePassword(updatePasswordData: UpdateProfilePassword) {
    try {
      await this.api.changePassword(updatePasswordData);
    } catch (e) {
      console.error('Error on change password');
      if ((e as XMLHttpRequest)?.response?.reason) {
        throw (e as XMLHttpRequest).response.reason;
      }
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
      if ((e as XMLHttpRequest)?.response?.reason) {
        throw (e as XMLHttpRequest).response.reason;
      }
    }
  }

  async searchUserByLogin(login: string) {
    try {
      const result = await this.api.searchUserByLogin(login);
      return result;
    } catch (e) {
      console.error('Error on search user');
      if ((e as XMLHttpRequest)?.response?.reason) {
        throw (e as XMLHttpRequest).response.reason;
      }
    }
  }
}

export default new UserController();
