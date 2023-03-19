import { Block } from 'shared/lib/core';
import './layout.css';

export class Layout extends Block {
  static _name = 'Layout';

  render(): string {
    return `<div class="app-layout">
              <div class="app-layout__content" slot></div>
            </div>`;
  }
}
