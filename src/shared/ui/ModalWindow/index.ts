import { Block } from 'shared/lib/core';
import './ModalWindow.css';

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
export default class ModalWindow<P, R> extends Block<IMWState & P, R> {
  static _name = 'ModalWindow';
  private onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.hideModal();
    }
  };
  constructor(props: P) {
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
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }
  componentBeforeUnmount() {
    document.addEventListener('keydown', this.onKeyDown);
  }
  wrapContent(content: string) {
    return `<div class="modal-window">
              <div class="modal-window__content">
                ${content}
              </div>
            </div>`;
  }
}
