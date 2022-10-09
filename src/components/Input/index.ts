import Block  from '../../core/Block/Block';
import './input.css';

class Input extends Block {
  constructor(inputProps: IInputProps) {
    const listeners = [
      inputProps.onFocus,
      inputProps.onBlur,
    ];
    const props = {
      id: inputProps.id,
      placeholder: inputProps.placeholder,
      type: inputProps.type,
      value: inputProps.value,
      error: inputProps.error,
    };
    console.log(props);
    super({ ...props, listeners });
  }

  render() {
    return `<div class="p-input">
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
              <span class="p-input__error-message">{{error}}</span>
            </div>`;
  }
}
export default Input;
