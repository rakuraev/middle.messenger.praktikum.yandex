import Render from './core/Render';
import Router from './pages/router';
import svgSprites from './layouts/svg-sprites.hbs';
import NotFound from './pages/404';
import './partials';
import './styles/app.css';

window.onload = () => {
  const path = window.location.pathname;
  const page = Router.find((route) => route.path === path) || NotFound;
  const component = new Render(page);
  document.getElementById('app')!.innerHTML = component.render();
  const element = document.createElement('div');
  element.innerHTML = svgSprites();
  document.body.appendChild(element);
};
