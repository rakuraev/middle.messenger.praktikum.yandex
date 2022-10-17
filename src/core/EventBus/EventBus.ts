export class EventBus implements IEventBus {
  protected listeners: Record<string, EventBusListener[]>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, listener: EventBusListener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
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
