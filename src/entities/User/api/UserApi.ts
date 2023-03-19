import { BaseApi } from 'shared/lib/core';

class UserApi extends BaseApi {
  constructor() {
    super('/user');
  }

  searchUserByLogin(login: string): Promise<UserData[]> {
    return this.http.post('/search', { login });
  }

  updateProfileInfo(data: UpdateProfileData) {
    return this.http.put('/profile', data);
  }

  updateProfileAvatar(formData: UpdateProfileAvatar): Promise<UserData> {
    return this.http.put('/profile/avatar', null, formData);
  }

  changePassword(data: UpdateProfilePassword) {
    return this.http.put('/password', data);
  }
}

export default new UserApi();
