import { Block } from 'shared/lib/core';
import './modalWindow.css';

export type MWProps = {
  className: string[];
};
interface IMWState {
  className: string[];
  content?: string;
  events: {
    click: (e: Event) => void;
  };
}
export class ModalWindow extends Block<IMWState> {
  static _name = 'ModalWindow';

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.hideModal();
    }
  };

  constructor(props: IMWState) {
    const onClick = (e: Event) => {
      const isOutsideModalContentClick = (e.target as HTMLElement).hasAttribute(
        'hide-on-click'
      );
      if (isOutsideModalContentClick) {
        this.hideModal();
      }
    };

    super({ ...props, events: { click: onClick } });
  }

  public showModal() {
    const content = this.getContent();
    content?.classList.add('modal-window_show');
    content?.setAttribute('hide-on-click', 'true');
  }

  public hideModal() {
    const content = this.getContent();
    content?.classList.remove('modal-window_show');
    content?.removeAttribute('hide-on-click');
  }

  private _modalWindowContentClickHandler = (e: Event) => {
    e.stopImmediatePropagation();
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    const contentElement = this.getContentElement();
    if (contentElement) {
      contentElement.addEventListener(
        'click',
        this._modalWindowContentClickHandler
      );
    }
  }

  componentBeforeUnmount() {
    document.addEventListener('keydown', this.onKeyDown);
    const contentElement = this.getContentElement();
    if (contentElement) {
      contentElement.removeEventListener(
        'click',
        this._modalWindowContentClickHandler
      );
    }
  }

  public getContentElement() {
    return this.element?.querySelector('.modal-window__content');
  }

  render() {
    return `<div class="modal-window" teleport="body">
              <div class="modal-window__content" slot>
              </div>
            </div>`;
  }
}
