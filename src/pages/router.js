import Login from "./login/login";
import Signup from "./signup/signup"
export const router = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: Signup,
  },
];
