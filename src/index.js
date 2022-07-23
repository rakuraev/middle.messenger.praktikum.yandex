import Render from "./common/Render";
import { router } from "./pages/router";

import "./partials";

window.onload = () => {
  const path = window.location.pathname;
  const page =
    router.find((route) => route.path === path) ||
    router.find((route) => route.path === "*");
  const component = new Render(page);
  document.getElementById("app").innerHTML = component.render();
};
