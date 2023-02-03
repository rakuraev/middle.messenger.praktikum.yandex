import registerComponents from './components';
import './styles/app.css';
import svgSprites from './layouts/svg-sprites.hbs';
import Router from './core/Router/Router';
import routes from './pages/router';
import { checkAuth } from './helpers/checkAuth';
import registerHelpers from './helpers/registerHelpers';

registerComponents();
registerHelpers();

(async () => {
  const element = document.createElement('div');
  element.innerHTML = svgSprites();
  document.body.appendChild(element);
  const router = new Router('#app').use(routes);
  router.start();

  await checkAuth();
})();
