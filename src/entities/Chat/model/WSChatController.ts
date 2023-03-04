import { StateKeys } from 'shared/config';
import { Store, WSTransport, WSEvents } from 'shared/lib/core';
import { isArray } from 'shared/lib/typeguards';

enum WSChatMessageTypes {
  Pong = 'pong',
  Message = 'message',
}

enum WSChatEvents {
  addMessage = 'add-message',
}

class WSChatController extends WSTransport {
  offset = 0;

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

  getOldMessages() {
    this.send({ content: this.offset.toString(), type: 'get old' });
  }

  isNewChat(token: string, chatId: number) {
    return !(token === this._token && chatId === this._chatId);
  }

  sendMessage(message: string) {
    const data: ITextMessage = { type: 'message', content: message };
    this.send(data);
  }

  onMessage(messageEvent: MessageEvent<any>): void {
    const data: IWSData = JSON.parse(messageEvent.data);
    const type = data.type;
    if (type) {
      if (type === WSChatMessageTypes.Message) {
        this.emit(WSChatEvents.addMessage, data);
      }
    } else {
      if (isArray(data)) {
        this.emit(WSChatEvents.addMessage, ...data);
      }
    }
  }
}

export default WSChatController;
