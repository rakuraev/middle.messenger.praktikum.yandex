import registerComponents from './components';
import './styles/app.css';
import svgSprites from './layouts/svg-sprites.hbs';
import Router from './core/Router/Router';
import routes from './pages/router';
import { checkAuth } from './helpers/checkAuth';
import registerHelpers from './helpers/registerHelpers';

registerComponents();
registerHelpers();
const element = document.createElement('div');
element.innerHTML = svgSprites();
document.body.appendChild(element);
new Router('#app').use(routes).start();
window.onload = async () => {
  await checkAuth();
};
