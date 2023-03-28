import { BlockClass } from 'shared/lib/core';
import type { RouteSignature } from 'shared/lib/core';
import { renderDOM } from 'shared/lib/renderDom';

type RouteProps = {
  rootQuery?: string;
};

export class Route {
  private _path: string;

  private _blockClass: BlockClass<BlockProps>;

  #block: Nullable<InstanceType<BlockClass<BlockProps>>>;

  private _props: RouteProps;

  public withAuth: boolean;

  constructor(page: RouteSignature, props: RouteProps) {
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
    renderDOM(this.#block, this._props?.rootQuery || 'body');
  }
}
