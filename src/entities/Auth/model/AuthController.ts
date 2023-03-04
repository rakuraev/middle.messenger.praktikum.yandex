import { RoutePaths } from 'pages';
import { StateKeys } from 'shared/config';
import { Router, Store } from 'shared/lib/core';
import { AuthApi } from '../api';

const router = new Router();

export class AuthController {
  private api = AuthApi;

  public async signin(signinData: SigninData) {
    try {
      await this.api.signin(signinData);
      await this.getUserInfo();
      router.go(RoutePaths.Chat);
    } catch (e) {
      console.error('Error on signin');
      throw e;
    }
  }

  public async signup(signupData: SignupData) {
    try {
      await this.api.signup(signupData);
      await this.getUserInfo();
      router.go(RoutePaths.Chat);
    } catch (e) {
      console.error('Error on signup');
    }
  }

  public async getUserInfo() {
    try {
      const userData = await this.api.getUserInfo();
      Store.set(StateKeys.User, userData);
    } catch (e) {
      console.error('Error on getUserInfo');
      throw e;
    }
  }

  public async logout() {
    try {
      await this.api.logout();
      router.go(RoutePaths.Login);
    } catch (e) {
      console.error('Error on logout');
      throw e;
    }
  }
}

export default new AuthController();
