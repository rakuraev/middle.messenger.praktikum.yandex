import type { Routes } from '../../pages/router';
import { BlockClass } from '../Block/Block';
import renderDOM from '../renderDom';

type RouteProps = {
  rootQuery?: string;
};

class Route {
  private _path: string;
  private _blockClass: BlockClass<any>;
  #block: Nullable<InstanceType<BlockClass<any>>>;
  private _props: any;
  public withAuth: boolean;
  constructor(page: Routes, props: RouteProps) {
    const { path, component, withAuth } = page;
    this._path = path;
    this.withAuth = withAuth || false;
    this._blockClass = component;
    this.#block = null;
    this._props = props;
  }

  navigate(path: string) {
    if (this.match(path)) {
      this._path = path;
      this.render();
    }
  }

  leave() {
    if (this.#block) {
      this.#block.hide();
    }
  }

  match(path: string) {
    return path === this._path;
  }

  render() {
    this.#block = new this._blockClass({});
    renderDOM(this.#block, this._props.rootQuery);
  }
}

export default Route;
