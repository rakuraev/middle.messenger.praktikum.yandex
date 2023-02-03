import Block from '../../core/Block/Block';
import './input.css';
const ERROR_CLASS = 'p-input_error';
const ERROR_MESSAGE_CLASS = 'p-input__error-message';
export default class Input extends Block<InputProps> {
  static _name = 'Input';

  constructor({ onFocus, onBlur, ...restProps }: IInput) {
    super({
      ...restProps,
      events: { focusin: onFocus, focusout: onBlur },
    } as InputProps);
  }

  public getValue(): string {
    const value = (
      this.getContent()?.querySelector('.p-input__input') as HTMLInputElement
    ).value;
    return value;
  }

  public setError(errorMessage: string) {
    const content = this.getContent() as HTMLElement;
    content.classList.add(ERROR_CLASS);
    content.querySelector(`.${ERROR_MESSAGE_CLASS}`)!.textContent =
      errorMessage;
  }

  public hideError() {
    this.getContent()?.classList.remove(ERROR_CLASS);
  }

  public clearValue() {
    this.setState({ ...this.state, value: null });
  }

  render() {
    return `<div class="p-input {{#if isError}}p-input_error{{/if}} {{class}}">
              <input
                class="p-input__input"
                type="{{type}}"
                name="{{name}}"
                id="{{id}}"
                value="{{value}}"
                autocomplete="{{autocomplete}}"
                placeholder=" "
              />
              {{#if placeholder}}
              <label class="p-input__label" for="{{id}}">
                {{placeholder}}
              </label>
              {{/if}}
              <span class="p-input__error-message">{{errorMessage}}</span>
            </div>`;
  }
}
