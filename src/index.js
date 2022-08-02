import Render from "./common/Render";
import { router } from "./pages/router";
import svgSprites from "./layouts/svg-sprites.hbs";

import "./partials";

window.onload = () => {
  const path = window.location.pathname;
  const page =
    router.find((route) => route.path === path) ||
    router.find((route) => route.path === "*");
  const component = new Render(page);
  document.getElementById("app").innerHTML = component.render();
  const element = document.createElement("div");
  element.innerHTML = svgSprites();
  document.body.appendChild(element);
};
