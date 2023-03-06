import { Block } from 'shared/lib/core';
import './layout.css';

interface LayoutProps {
  isLoading: boolean;
}
export class Layout extends Block<LayoutProps> {
  static _name = 'Layout';

  render(): string {
    return `<div class="app-layout">
              <div class="app-layout__content" layout-content></div>
            </div>`;
  }
}
