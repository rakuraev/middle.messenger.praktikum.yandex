export class EventBus implements IEventBus {
  protected listeners: Record<string, EventBusListener[]>;

  isDestroyed = false;

  constructor() {
    this.listeners = {};
  }

  public on(event: string, listener: EventBusListener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
  }

  public off(event: string, listener: EventBusListener) {
    if (!this.listeners[event]) {
      throw new Error(`Нет такого события "${event}"`);
    }
    this.listeners[event] = this.listeners[event].filter(
      (EventListener) => EventListener !== listener
    );
  }

  public emit(event: string, ...args: unknown[]) {
    if (this.isDestroyed) return;
    if (!this.listeners[event]) {
      throw new Error(`Нет такого события "${event}"`);
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }

  public destroy() {
    this.listeners = {};
    this.isDestroyed = true;
  }
}
