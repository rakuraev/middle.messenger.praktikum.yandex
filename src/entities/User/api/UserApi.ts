import { BaseApi } from 'shared/lib/core';

class UserApi extends BaseApi {
  constructor() {
    super('/user');
  }

  searchUserByLogin(login: string) {
    return this.http.post<UserData[]>('/search', { login });
  }

  updateProfileInfo(data: UpdateProfileData) {
    return this.http.put('/profile', data);
  }

  updateProfileAvatar(formData: UpdateProfileAvatar) {
    return this.http.put<UserData>('/profile/avatar', null, formData);
  }

  changePassword(data: UpdateProfilePassword) {
    return this.http.put('/password', data);
  }
}

export default new UserApi();
