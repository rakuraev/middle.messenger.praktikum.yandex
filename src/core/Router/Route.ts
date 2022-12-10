import type { Routes } from '../../pages/router';
import { BlockClass } from '../Block/Block';
import renderDOM from '../renderDom';

type RouteProps = {
  rootQuery?: string;
};

class Route {
  private _path: string;
  private _blockClass: BlockClass<any>;
  private _block: Nullable<InstanceType<BlockClass<any>>>;
  private _props: any;

  constructor(page: Routes, props: RouteProps) {
    const { path, component } = page;
    this._path = path;
    this._blockClass = component;
    this._block = null;
    this._props = props;
  }

  navigate(path: string) {
    if (this.match(path)) {
      this._path = path;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(path: string) {
    return path === this._path;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
      console.log(this._block);
      renderDOM(this._block, this._props.rootQuery);
      return;
    }

    renderDOM(this._block, this._props.rootQuery);
  }
}

export default Route;
