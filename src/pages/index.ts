import type { RouteSignature } from 'shared/lib/core';
import Chat from './chat';
import Login from './login';
import Profile from './profile';
import Signup from './signup';

export enum RoutePaths {
  Login = '/',
  Signup = '/signup',
  Chat = '/messenger',
  Profile = '/settings',
}

export const routes: RouteSignature[] = [
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
