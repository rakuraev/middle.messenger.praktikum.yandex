import Block from '../../core/Block/Block';
import './input.css';

export default class Input extends Block {
  static _name = 'Input';
  
  constructor(inputProps: IInputProps) {
    const events = { focusin: inputProps.onFocus, focusout: inputProps.onBlur };
    const props = {
      id: inputProps.id,
      placeholder: inputProps.placeholder,
      type: inputProps.type,
      value: inputProps.value,
      errorMessage: inputProps.errorMessage || '',
      isError: inputProps.isError,
    };
    super({ ...props, events });
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
