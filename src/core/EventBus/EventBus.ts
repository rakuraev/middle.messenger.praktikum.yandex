import debounce from '../../utils/debounce';

export class EventBus implements IEventBus {
  protected listeners: Record<string, EventBusListener[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, listener: EventBusListener, options?: IEventBusOnOptions) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    if (options) {
      const { delay } = options;
      if (delay) {
        this.listeners[event].push(debounce(listener, delay));
      }
    } else {
      this.listeners[event].push(listener);
    }
  }

  off(event: string, listener: EventBusListener) {
    if (!this.listeners[event]) {
      throw new Error(`Нет такого события "${event}"`);
    }
    this.listeners[event] = this.listeners[event].filter(
      (EventListener) => EventListener !== listener
    );
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет такого события "${event}"`);
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
