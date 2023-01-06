import ChatsController from '../../controllers/ChatsController';
import Block from '../../core/Block/Block';
import Router from '../../core/Router/Router';
import withRouter from '../../decorators/withRouter';
import withStore from '../../decorators/withStore';
import { StateKeys } from '../../store';
import './chat.css';
import './components';

interface ChatState {
  linkToSettingsSlot: () => string;
  linkToChatsSlot: () => string;
  linkToProfileSlot: () => string;
}
interface ChatProps {
  router: Router;
  chats: PickType<State, StateKeys.Chats>;
}
@withRouter
@withStore(StateKeys.Chats)
class ChatPage extends Block<ChatState> {
  getStateFromProps(props: any) {
    const linkToSettingsSlot = () => `{{{SvgTemplate svgId="profile"}}}`;
    const linkToChatsSlot = () => `{{{SvgTemplate svgId="chat"}}}`;
    const linkToProfileSlot = () => `{{{SvgTemplate svgId="settings"}}}`;
    const state: ChatState = {
      linkToSettingsSlot,
      linkToChatsSlot,
      linkToProfileSlot,
    };
    this.state = {
      ...state,
      ...props,
    };
    setInterval(() => console.log(Object.keys(this.children).length), 1000);
  }
  componentDidMount() {
    ChatsController.getChatsList();
  }
  render(): string {
    return `<main class="chats-page">
              <aside class="left-panel">
                <div class="search">
                  <input class="search__input" type="text" />
                </div>
                {{{ChatList chats=chats}}}
                <nav class="navigation-bar-container">
                  <ul class="navigation-bar">
                    <li class="navigation-bar__item">
                      {{{Link href="#" class="navigation-bar__link" slot=linkToProfileSlot}}}
                    </li>
                    <li class="navigation-bar__item">
                      {{{Link href="#" class="navigation-bar__link" slot=linkToChatsSlot}}}
                    </li>
                    <li class="navigation-bar__item">
                      {{{Link href="/settings"  class="navigation-bar__link" slot=linkToSettingsSlot}}}
                    </li>
                  </ul>
                </nav>
              </aside>
              <section class="chat">
                {{{Chat}}}
              </section>
            </main>`;
  }
}

export default ChatPage;
