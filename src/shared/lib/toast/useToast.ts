import { EventBus } from 'shared/lib/core';

export enum ToastStatuses {
  warning = 'warning',
  success = 'success',
  error = 'error',
}

export class Toast extends EventBus {
  [ToastStatuses.warning](text: unknown) {
    this.emit(ToastStatuses.warning, text);
  }

  [ToastStatuses.success](text: unknown) {
    this.emit(ToastStatuses.success, text);
  }

  [ToastStatuses.error](text: unknown) {
    this.emit(ToastStatuses.error, text);
  }
}

export const useToast = new Toast();
