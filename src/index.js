import { router } from "./pages/router";

window.onload = () => {
  const path = window.location.pathname;

  const page = router.find((route) => route.path === path);
  document.getElementById("app").innerHTML = page.component();
};
