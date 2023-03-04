import { BlockClass } from 'shared/lib/core';
import Chat from './chat';
import Login from './login';
import Profile from './profile';
import Signup from './signup';

export type Routes = {
  path: string;
  component: BlockClass;
  withAuth?: boolean;
};

export enum RoutePaths {
  Login = '/',
  Signup = '/signup',
  Chat = '/messenger',
  Profile = '/settings',
}

export const routes: Routes[] = [
  {
    path: RoutePaths.Login,
    component: Login,
  },
  {
    path: RoutePaths.Signup,
    component: Signup,
  },
  {
    path: RoutePaths.Chat,
    component: Chat,
    withAuth: true,
  },
  {
    path: RoutePaths.Profile,
    component: Profile,
    withAuth: true,
  },
];
