import { StateKeys } from 'shared/config';
import { Block } from 'shared/lib/core';
import { Store } from 'shared/lib/core';
import './chat.css';

class Chat extends Block<any> {
  static _name = 'Chat';

  constructor(props: any) {
    const currentChat = () => {
      const chatId = props.chatId;
      if (chatId) {
        return Store.getState()?.[StateKeys.Chats]?.find(
          (chat: ChatsListData) => {
            return chat.id === chatId;
          }
        );
      }
    };
    super({ ...props, ...currentChat() });
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
          {{{ChatMessages allMessages=allMessages}}}
          <div class="messenger-footer">{{{ChatInput onSendMessage=onSendMessage ws=ws}}}</div>
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
