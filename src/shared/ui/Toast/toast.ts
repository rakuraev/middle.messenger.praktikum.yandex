import { nanoid } from 'nanoid';
import { Block } from 'shared/lib/core';
import { Toast, ToastStatuses, useToast } from 'shared/lib/toast';
import './toast.css';

export class ToastComponent extends Block<PlainObject> {
  static _name = 'Toast';

  toast: Toast;

  constructor(props: PlainObject) {
    super(props);
    this.toast = useToast;
    this._bindEvents();
  }

  _pushToast(text: unknown, toastStatus: ToastStatuses) {
    const toastMessage = typeof text === 'string' ? text : 'Unknown';
    const toastMessageTemplate = this._renderToastElement(
      toastMessage,
      toastStatus
    );
    const toastMessageTemplateId = 't' + nanoid(5);
    const messageElement =
      toastMessageTemplate.content.querySelector('.toast__message');
    if (messageElement) {
      messageElement.id = toastMessageTemplateId;
      const toastTemplate = this._getToastElement();
      if (toastTemplate) {
        toastTemplate.append(toastMessageTemplate.content);
      }
      this._removeToast(toastMessageTemplateId);
    }
  }

  _removeToast(toastMessageId: string) {
    const messageToRemove = this.element?.querySelector(`#${toastMessageId}`);
    if (messageToRemove) {
      setTimeout(() => {
        messageToRemove.classList.add('toast__message_hidding');
        setTimeout(() => messageToRemove.remove(), 500);
      }, 5000);
    }
  }

  _renderToastElement(
    text: string,
    toastStatus: ToastStatuses
  ): HTMLTemplateElement {
    const template = document.createElement('template');
    template.innerHTML = this._toastMessageTemplate(text, toastStatus);
    return template;
  }

  _bindEvents() {
    this.toast.on(ToastStatuses.error, this._onError.bind(this));
    this.toast.on(ToastStatuses.success, this._onSuccess.bind(this));
    this.toast.on(ToastStatuses.warning, this._onWarn.bind(this));
  }

  _onError(text: unknown) {
    this._pushToast(text, ToastStatuses.error);
  }

  _onSuccess(text: unknown) {
    this._pushToast(text, ToastStatuses.success);
  }

  _onWarn(text: unknown) {
    this._pushToast(text, ToastStatuses.warning);
  }

  _getToastElement() {
    return this.element?.querySelector('[toast-content]');
  }

  _toastMessageTemplate(text: string, status: ToastStatuses) {
    return `<div class="toast__message toast__message_${status}">${text}</div>`;
  }

  render() {
    return '<div class="toast"><div class="toast__content" toast-content></div></div>';
  }
}
