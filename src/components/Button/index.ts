import './button.css';
import Block from '../../core/Block/Block';

interface IButton {
  text: string;
  modificator: string;
  onClick?: () => unknown;
}

class Button extends Block {
  constructor(props: IButton) {
    const { text, modificator, onClick } = props;
    const events = {
      click: onClick,
    };
    super({ text, modificator, events });
  }

  render() {
    return `<div class="button {{#if modificator}}button_{{modificator}}{{/if}}">
              <button class="button__button" type="button">{{text}}</button>
            </div>`;
  }
}
export default Button;
