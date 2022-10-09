import './components';
// import Router from './pages/router';
import './styles/app.css';
import renderDOM from './core/renderDom';
import LoginPage from "./pages/login/index";

window.onload = () => {
  // const path = window.location.pathname;
  // const Page = Router.find((route) => route.path === path);
  // const Page = Router[0]
  const Component = new LoginPage();
  renderDOM(Component);
  const element = document.createElement('div');
  document.body.appendChild(element);
};
