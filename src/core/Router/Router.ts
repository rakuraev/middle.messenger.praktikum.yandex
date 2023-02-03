import { Routes } from '../../pages/router';
import Route from './Route';

class Router {
  private static __instance: Router;
  routes: Route[] = [];
  history: any;
  private _currentRoute: Nullable<Route> = null;
  private _rootQuery: string = '';
  constructor(rootQuery: string = '#app') {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._registerHistoryListener();
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(routes: Routes[]) {
    routes.forEach((route) => {
      this.routes.push(new Route(route, { rootQuery: this._rootQuery }));
    });

    return Router.__instance;
  }

  start() {
    this.go(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (this._currentRoute !== route) {
      if (this._currentRoute) {
        this._currentRoute.leave();
      }
    }
    if (route) {
      this._currentRoute = route;
      route.render();
    }
  }

  go(pathname: string) {
    this._onRoute(pathname);
    this.history.pushState({}, null, pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  getCurrentRoute() {
    return this._currentRoute;
  }
  _registerHistoryListener() {
    window.onpopstate = this._onPopState.bind(this);
  }

  _onPopState() {
    this._onRoute.bind(this)(window.location.pathname);
  }
}

export default Router;
