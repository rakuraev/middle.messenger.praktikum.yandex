import AuthApi from '../api/AuthApi/AuthApi';
import Router from '../core/Router/Router';
import Store from '../core/Store';
import { RoutePaths } from '../pages/router';
import { StateKeys } from '../store';

const router = new Router();

export class AuthController {
  private api = AuthApi;
  async signin(signinData: SigninData) {
    try {
      await this.api.signin(signinData);
      await this.getUserInfo();
      router.go(RoutePaths.Chat);
    } catch (e) {
      console.error('Error on signin');
      throw e;
    }
  }
  async signup(signupData: SignupData) {
    try {
      await this.api.signup(signupData);
      await this.getUserInfo();
      router.go(RoutePaths.Chat);
    } catch (e) {
      console.error('Error on signup');
    }
  }
  async getUserInfo() {
    try {
      const userData = await this.api.getUserInfo();
      Store.set(StateKeys.User, userData);
    } catch (e) {
      console.error('Error on getUserInfo');
      throw e;
    }
  }
  async logout() {
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
