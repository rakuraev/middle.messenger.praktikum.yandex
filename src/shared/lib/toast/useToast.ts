import { EventBus } from 'shared/lib/core';

export enum ToastStatuses {
  warn = 'warn',
  success = 'success',
  error = 'error',
}

export class Toast extends EventBus {
  [ToastStatuses.warn](text: string) {
    this.emit(ToastStatuses.warn, text);
  }

  [ToastStatuses.success](text: string) {
    this.emit(ToastStatuses.success, text);
  }

  [ToastStatuses.error](text: string) {
    this.emit(ToastStatuses.error, text);
  }
}

export const useToast = new Toast();
