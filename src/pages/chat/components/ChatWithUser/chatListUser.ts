import Block from '../../../../core/Block/Block';
interface ChatListUserProps extends ChatsListData {
  onClick: () => void;
}

class ChatListUser extends Block<any> {
  static _name = 'ChatListUser';
  constructor({ onClick, ...props }: ChatListUserProps) {
    super({ ...props, events: { click: onClick.bind(null, props.id) } });
  }

  render(): string {
    return ` <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">{{title}}</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
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
