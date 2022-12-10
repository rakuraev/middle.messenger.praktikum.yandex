import registerComponents from './components';
import './styles/app.css';
import svgSprites from './layouts/svg-sprites.hbs';
import Router from './core/Router/Router';
import routes from './pages/router';
import { Store } from './core/Store';
import { state } from './store';

registerComponents();
new Router("#app").use(routes).start()
new Store().use(state);

window.onload = () => {
  const element = document.createElement('div');
  element.innerHTML = svgSprites();
  document.body.appendChild(element);
};;
