import './button.css';
import Block from '../../core/Block/Block';

interface IButton {
  text: string;
  modificator: string;
  tabIndex: number;
  onClick?: () => unknown;
}

export default class Button extends Block {
  static _name = 'Button';

  constructor(props: IButton) {
    const { text, modificator, onClick, tabIndex } = props;
    const events = {
      click: onClick,
    };
    super({ text, modificator, events, tabIndex });
  }

  render() {
    return `<div class="button {{#if modificator}}button_{{modificator}}{{/if}}">
              <button tabindex="{{tabIndex}}" class="button__button" type="button">{{text}}</button>
            </div>`;
  }
}