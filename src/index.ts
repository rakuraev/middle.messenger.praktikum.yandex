import registerComponents from './components';
import Router from './pages/router';
import './styles/app.css';
import renderDOM from './core/renderDom';
import svgSprites from './layouts/svg-sprites.hbs';

registerComponents();
window.onload = () => {
  const path = window.location.pathname;
  const Page = Router.find((route) => route.path === path) as RouterPage;
  if ('component' in Page) {
    const Component = Page?.component;
    renderDOM(new Component());
  }
  const element = document.createElement('div');
  element.innerHTML = svgSprites();
  document.body.appendChild(element);
};
