import registerComponents from './components';
import './styles/app.css';
import svgSprites from './layouts/svg-sprites.hbs';
import Router from './core/Router/Router';
import routes from './pages/router';
import { checkAuth } from './helpers/checkAuth';

registerComponents();

// TODO Переделать, так как сначала редерица страница которая в url-e
new Router('#app').use(routes).start();

window.onload = async () => {
  const element = document.createElement('div');
  element.innerHTML = svgSprites();
  document.body.appendChild(element);
  await checkAuth();
};
