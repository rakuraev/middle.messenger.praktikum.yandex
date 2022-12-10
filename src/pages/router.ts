import Login from './login';
import Signup from './signup';
import Profile from './profile';
import Chat from './chat';
import { BlockClass } from '../core/Block/Block';

export type Routes = {
  path: string;
  component: BlockClass<any>;
};


const routes: Routes[] = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/messenger',
    component: Chat,
  },
  {
    path: '/settings',
    component: Profile,
  },
];

export default routes;
