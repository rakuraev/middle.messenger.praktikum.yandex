import Block from '../../core/Block/Block';
import './chat.css';

export default class ChatPage extends Block<BlockProps> {
  protected render(): string {
    return `<main class="chats-page">
              <aside class="left-panel">
                <div class="search">
                  <input class="search__input" type="text" />
                </div>
                <div class="users-list-container">
                  <ul class="users-list">
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>

                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>

                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>
                    <li class="user">
                      <div class="user__img"></div>
                      <div class="user__user-info">
                        <div class="user__name">Пинус Августовкий</div>
                        <div class="user__last-message">И Human Interface Guidelines и Material Design рекомендуют кушать Кузю Ла...</div>
                      </div>
                      <div class="user__message-info">
                        <div class="user__last-time">04:20</div>
                        <div class="user__not-readed-messages">99</div>
                      </div>
                    </li>

                  </ul>
                </div>
                <nav class="navigation-bar-container">
                  <ul class="navigation-bar">
                    <li class="navigation-bar__item">
                      <a class="navigation-bar__link" href="#">
                        {{{SvgTemplate svgId="profile"}}}
                      </a>
                    </li>
                    <li class="navigation-bar__item">
                      <a class="navigation-bar__link" href="#">
                        {{{SvgTemplate svgId="chat"}}}
                      </a>
                    </li>
                    <li class="navigation-bar__item">
                      <a class="navigation-bar__link" href="#">
                        {{{SvgTemplate svgId="settings"}}}
                      </a>
                    </li>
                  </ul>
                </nav>
              </aside>
            </main>`;
  }
}
