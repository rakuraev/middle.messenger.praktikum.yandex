import Block from '../../../../core/Block/Block';
import Store from '../../../../core/Store';
import withStore from '../../../../decorators/withStore';
import { StateKeys } from '../../../../store';
import './chat.css';

@withStore(StateKeys.ChatId)
class Chat extends Block<any> {
  static _name = 'Chat';

  constructor(props) {
    const currentChat = () => {
      const chatId = props.chatId;
      if (chatId) {
        return Store.getState()?.[StateKeys.Chats].find((chat) => {
          return chat.id === chatId;
        });
      }
    };
    super({ ...props, ...currentChat() });
    console.log(this.state);
  }
  render() {
    return `
      {{#if chatId}}
        <div class="messenger">
          <div class="messenger-header">
            <div class="messenger-header__avatar"></div>
            <div class="messenger-header__name">{{title}}</div>
            <div class="messenger-header__control"></div>
          </div>
          <div class="messenger-main">{{{ChatMessages chatId=chatId}}}</div>
          <div class="messenger-footer"></div>
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
