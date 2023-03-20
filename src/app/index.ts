import { checkAuth } from 'app/lib/checkAuth';
import { routes } from 'pages';
import { Store, Router } from 'shared/lib/core';
import registerHelpers from 'shared/lib/registerHelpers';
import registerComponents from 'shared/ui';
import { ToastComponent } from 'shared/ui';
import SvgSprites from 'shared/ui/SvgSprites';
import { state } from './store/index';
import './styles/app.css';

registerComponents();
registerHelpers();

const appFactory = async () => {
  const element = document.createElement('div');
  element.innerHTML = SvgSprites();
  const Toast = new ToastComponent({}).getContent();
  if (Toast) {
    element.append(Toast);
  }
  document.body.appendChild(element);
  Store.init(state);
  const router = new Router('#app').use(routes);
  router.start();

  await checkAuth();
};

export { appFactory };
