import Login from './login';
import Signup from './signup';
import Profile from './profile';
import Chat from './chat';

const Router: RouterPage[] = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/chat',
    component: Chat,
  },
  {
    path:'/profile',
    component:Profile
  }
];
export default Router;
