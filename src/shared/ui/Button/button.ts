import './button.css';
import { Block } from 'shared/lib/core';

export default class Button extends Block<ButtonProps> {
  static _name = 'Button';

  constructor({ onClick, ...restProps }: IButton) {
    super({ ...restProps, events: { click: onClick } });
  }

  render() {
    return `<div class="button{{#if modificator}} button_{{modificator}}{{/if}} {{class}}">
              <button tabindex="{{tabIndex}}" class="button__button" type="button" slot>{{text}}</button>
            </div>`;
  }
}
