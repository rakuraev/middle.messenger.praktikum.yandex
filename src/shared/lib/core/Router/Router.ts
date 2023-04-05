import { Route } from 'shared/lib/core';
import { BlockClass } from 'shared/lib/core';

export type RouteSignature = {
  path: string;
  component: BlockClass;
  withAuth?: boolean;
};
export class Router {
  private static __instance: Router;

  routes: Route[] = [];

  history: History = window.history;

  private _currentRoute: Nullable<Route> = null;

  private _rootQuery: string | undefined;

  constructor(rootQuery = '#app') {
    this._registerHistoryListener();
    if (Router.__instance) {
      return Router.__instance;
    }
    this.routes = [];
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(routes: RouteSignature[]) {
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
    if (route) {
      if (this._currentRoute !== route) {
        if (this._currentRoute) {
          this._currentRoute.leave();
        }
      }

      this._currentRoute = route;
      route.render();
    } else {
      throw new Error(`No matched route by path:${pathname}`);
    }
  }

  go(pathname: string) {
    this._onRoute(pathname);
    this.history.pushState({}, '', pathname);
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
