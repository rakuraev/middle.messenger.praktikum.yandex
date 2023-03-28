import { nanoid } from 'nanoid';
import { Block } from 'shared/lib/core';
import './input.css';

const ERROR_CLASS = 'p-input_error';
const ERROR_MESSAGE_CLASS = 'p-input__error-message';

export default class Input extends Block<InputProps> {
  static _name = 'Input';

  public isError: Nullable<boolean> = null;

  constructor({ onFocus, onBlur, ...restProps }: IInput) {
    if (!('id' in restProps)) {
      restProps.id = nanoid(4);
    }
    super({
      ...restProps,
      events: { focusin: onFocus, focusout: onBlur },
    } as InputProps);
    this.isError = restProps.isError;
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
    this.isError = true;
    const errorMessageNode = content.querySelector(`.${ERROR_MESSAGE_CLASS}`);
    if (errorMessageNode) {
      errorMessageNode.textContent = errorMessage;
    }
  }

  public hideError() {
    this.isError = false;
    this.getContent()?.classList.remove(ERROR_CLASS);
  }

  public clearValue() {
    this.setState({ ...this.state, value: null });
  }

  render() {
    return `<div class="p-input{{#if isError}} p-input_error{{/if}}{{#if class}} {{class}}{{/if}}">
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
              {{#unless disableError}}
                <span class="p-input__error-message">{{errorMessage}}</span>
              {{/unless}}
            </div>`;
  }
}
