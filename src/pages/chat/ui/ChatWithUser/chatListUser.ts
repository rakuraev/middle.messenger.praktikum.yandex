import { Block } from 'shared/lib/core';
interface ChatListUserProps extends ChatsListData {
  chatId: number;
  onClick: () => void;
}

class ChatListUser extends Block<any> {
  static _name = 'ChatListUser';

  constructor({ onClick, ...props }: ChatListUserProps) {
    const isActiveChat = props.chatId === props.id;
    super({
      ...props,
      isActiveChat,
      events: { click: onClick.bind(null, props.id) },
    });
  }

  render(): string {
    return ` <li class="user {{#if isActiveChat}}user_active{{/if}}">
                <div class="user__img"></div>
                <div class="user__user-info">
                  <div class="user__name">{{title}}</div>
                  {{#last-messages-content}}
                    <div class="user__last-message">{{this}}</div>
                  {{/last-messages-content}}
                </div>
                <div class="user__message-info">
                  {{#last-messages-time}}
                    <div class="user__last-time">{{this}}</div>
                  {{/last-messages-time}}
                  {{#unreaded-messages}}
                    <div class="user__not-readed-messages">
                      <span class=user__not-readed-messages-count>{{unread_count}}</span>
                    </div>
                  {{/unreaded-messages}}
                </div>
              </li>`;
  }
}

export default ChatListUser;
