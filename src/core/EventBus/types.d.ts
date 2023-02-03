type EventBusListener = (...args: unknown[]) => unknown;

interface IEventBus {
  on(event: string, listener: EventBusListener, options?: IEventBusOnOptions);
  off(event: string, listener: EventBusListener);
  emit(event: string, ...args: ?unknown[]);
}
