import Login from './login';
// import Signup from './signup';
// import Profile from './profile';
// import Chat from './chat';

// const router: Component[] = [Login, Signup, Profile, Chat];
const Router: RouterPage[] = [
  {
    path: '/',
    component: Login,
  },
];
export default Router;
