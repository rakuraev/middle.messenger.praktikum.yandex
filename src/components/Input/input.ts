import Block from '../../core/Block/Block';
import './input.css';

export default class Input extends Block<InputProps> {
  static _name = 'Input';

  constructor({ onFocus, onBlur, ...restProps }: IInput) {
    super({
      ...restProps,
      events: { focusin: onFocus, focusout: onBlur },
    } as InputProps);
  }

  render() {
    return `<div class="p-input {{#if isError}}p-input_error{{/if}}">
              <input
                class="p-input__input"
                type="{{type}}"
                id="{{id}}"
                value="{{value}}"
                placeholder=" "
              />
              <label class="p-input__label" for="{{id}}">
                {{placeholder}}
              </label>
              <span class="p-input__error-message">{{errorMessage}}</span>
            </div>`;
  }
}
