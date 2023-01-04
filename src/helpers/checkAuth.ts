import AuthController from '../controllers/AuthController';
import Router from '../core/Router/Router';
import { RoutePaths } from '../pages/router';
import { StatusCodes } from '../utils/StatusCodes';

const router = new Router();

export const checkAuth = async () => {
  const currentRoute = router.getCurrentRoute();
  let isWithAuth;
  if (currentRoute) {
    isWithAuth = currentRoute.withAuth;
  }
  try {
    await AuthController.getUserInfo();
    if (!isWithAuth) {
      router.go(RoutePaths.Chat);
    }
  } catch (e) {
    console.error(e);
    if (e instanceof XMLHttpRequest) {
      if (e.status === StatusCodes.UNAUTHORIZED) {
        if (isWithAuth) {
          router.go(RoutePaths.Login);
        }
      }
    }
  }
};
