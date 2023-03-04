import { BaseApi } from 'shared/lib/core';

export class AuthApi extends BaseApi {
  constructor() {
    super('/auth');
  }

  signup(data: SignupData) {
    return this.http.post('/signup', data);
  }

  signin(data: SigninData) {
    return this.http.post('/signin', data);
  }

  getUserInfo(): Promise<UserData> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }
}

export default new AuthApi();
