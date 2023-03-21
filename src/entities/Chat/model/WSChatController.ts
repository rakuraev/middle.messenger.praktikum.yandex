import { StateKeys } from 'shared/config';
import { Store, WSTransport, WSEvents } from 'shared/lib/core';
import { isArray, isObject, isPlainObject } from 'shared/lib/typeguards';

export enum WSChatMessageTypes {
  File = 'file',
  Pong = 'pong',
  Message = 'message',
}

enum WSChatEvents {
  addMessage = 'add-message',
}

class WSChatController extends WSTransport {
  _token: Nullable<string> = null;

  _chatId: Nullable<number> = null;

  constructor(onSetMessages: EventBusListener) {
    super();
    this.addEvents();
    this.on(WSChatEvents.addMessage, onSetMessages);
  }

  connect(token: string, chatId: number) {
    const userId = (Store.getState() as State)[StateKeys.User]?.id;
    this._token = token;
    this._chatId = chatId;
    super._connect(`${userId}/${chatId}/${token}`);
  }

  addEvents() {
    this.on(WSEvents.Open, this.getOldMessages.bind(this));
  }

  getOldMessages(offset: unknown) {
    if (typeof offset === 'number') {
      offset = offset.toString();
    }
    if (typeof offset === 'string') {
      this.send({ content: offset, type: 'get old' });
    }
  }

  isNewChat(token: string, chatId: number) {
    return !(token === this._token && chatId === this._chatId);
  }

  sendMessage(message: string) {
    const data: ITextMessage = { type: 'message', content: message };
    this.send(data);
  }

  sendFile(resourceId: string) {
    const data: IFileMessage = { type: 'file', content: resourceId };
    this.send(data);
  }

  onMessage(messageEvent: unknown): void {
    if (isObject(messageEvent)) {
      if (messageEvent instanceof MessageEvent) {
        const data: IWSData = JSON.parse(messageEvent.data);
        const type = data.type;
        if (type) {
          if (type === WSChatMessageTypes.Message) {
            this.emit(WSChatEvents.addMessage, data);
          } else if (type === WSChatMessageTypes.File) {
            this.emit(WSChatEvents.addMessage, data);
          }
        } else {
          if (isArray(data)) {
            this.emit(WSChatEvents.addMessage, ...data);
          }
        }
      }
    }
  }
}

export default WSChatController;
