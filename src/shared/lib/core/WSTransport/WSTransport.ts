import { EventBus } from 'shared/lib/core';
export enum WSEvents {
  Open = 'open',
  Close = 'close',
  Message = 'message',
  Error = 'error',
}

export enum WSTransportStatuses {
  Connected = 'connected',
  Disconnected = 'disconnected',
}

export abstract class WSTransport extends EventBus {
  private WS_URL = 'wss://ya-praktikum.tech/ws/chats/';

  _status: WSTransportStatuses = WSTransportStatuses.Disconnected;

  endpoint: Nullable<string> = null;

  ws: Nullable<WebSocket> = null;

  checkConnection: Nullable<number> = null;

  constructor() {
    super();
    this._addEventsEventBus();
  }

  private _getFullUrl() {
    return `${this.WS_URL}${this.endpoint}`;
  }

  _connect(endpoint: string) {
    this.endpoint = endpoint;
    this.ws = new WebSocket(this._getFullUrl());
    this._checkConnection();
    this._addEventsWs();
  }

  private _addEventsEventBus() {
    this.on(
      WSEvents.Open,
      this._changeStatus.bind(this, WSTransportStatuses.Connected)
    );
    this.on(
      WSEvents.Close,
      this._changeStatus.bind(this, WSTransportStatuses.Disconnected)
    );
    this.on(WSEvents.Message, this._onMessage.bind(this));
  }

  private _changeStatus(status: WSTransportStatuses) {
    this._status = status;
  }

  private _addEventsWs() {
    this.ws?.addEventListener(WSEvents.Open, this._onWSOpen.bind(this));
    this.ws?.addEventListener(WSEvents.Close, this._onWSClose.bind(this));
    this.ws?.addEventListener(WSEvents.Message, this._onWSMessage.bind(this));
    this.ws?.addEventListener(WSEvents.Error, this._onWSError.bind(this));
  }

  private _onWSOpen(messageEvent: MessageEvent) {
    this.emit(WSEvents.Open, messageEvent);
  }

  private _onWSClose(messageEvent: MessageEvent) {
    this.emit(WSEvents.Close, messageEvent);
  }

  private _onWSMessage(messageEvent: MessageEvent) {
    this.emit(WSEvents.Message, messageEvent);
  }

  private _onWSError(messageEvent: MessageEvent) {
    this.emit(WSEvents.Error, messageEvent);
  }

  private _onMessage(messageEvent: MessageEvent) {
    this.onMessage(messageEvent);
  }

  onMessage(messageEvent: MessageEvent) {}

  _checkConnection() {
    this.checkConnection = setInterval(
      () => this.send({ type: 'ping' }),
      10000
    );
  }

  addEventBusListener(event: WSEvents, listener: EventBusListener) {
    this.on(event, listener);
  }

  send(data: IWSData) {
    this.ws?.send(JSON.stringify(data));
  }

  disconnect() {
    clearInterval(this.checkConnection as number);
    this.checkConnection = null;
    this.ws?.close();
  }

  public isConnected() {
    return this._status === WSTransportStatuses.Connected;
  }
}
