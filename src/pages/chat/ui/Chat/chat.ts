import { WSChatController } from 'entities/Chat';
import { StateKeys } from 'shared/config';
import { Block, EventBus } from 'shared/lib/core';
import { withStore } from 'shared/lib/decorators';
import './chat.css';

interface ChatProps {
  chatId: number;
  ChatEventBus: EventBus;
  chats: PickType<State, StateKeys.Chats>;
  ws: WSChatController;
}
@withStore(StateKeys.Chats)
class Chat extends Block<ChatProps> {
  static _name = 'Chat';

  constructor(props: ChatProps) {
    const currentChat = props.chats.find((chat) => chat.id === props.chatId);
    super({ ...props, ...currentChat });
  }

  render() {
    return `
      {{#if chatId}}
        <div class="messenger">
          <div class="messenger-header">
            <div class="messenger-header__avatar"></div>
            <div class="messenger-header__name">{{title}}</div>
            <div class="messenger-header__control">{{{Control chatId=chatId}}}</div>
          </div>
          {{{ChatMessages ChatEventBus=ChatEventBus}}}
          <div class="messenger-footer">{{{ChatInput ChatEventBus=ChatEventBus ws=ws}}}</div>
        </div>
      {{else}}
        <div class="chat__not-selected-message">
          <span>Выберите чат чтобы отправить сообщение</span>
        </div>
      {{/if}}
    `;
  }
}

export default Chat;
