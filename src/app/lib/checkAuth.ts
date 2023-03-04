import { RoutePaths } from 'pages';
import { AuthController } from 'entities/Auth';
import { StatusCodes } from 'shared/lib/consts';
import { Router } from 'shared/lib/core';
console.log(AuthController);
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
