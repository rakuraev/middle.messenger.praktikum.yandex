import Login from './login';
import Signup from './signup';
import Profile from './profile';
import Chat from './chat';
import { BlockClass } from '../core/Block/Block';

export type Routes = {
  path: string;
  component: BlockClass<any>;
  withAuth?: boolean;
};

export enum RoutePaths {
  Login = '/',
  Signup = '/signup',
  Chat = '/messenger',
  Profile = '/settings',
}

const routes: Routes[] = [
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

export default routes;
