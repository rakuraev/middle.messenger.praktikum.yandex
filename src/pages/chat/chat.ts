import ChatsController from '../../controllers/ChatsController';
import WSChatsController from '../../controllers/WSChatController/WSChatController';
import Block from '../../core/Block/Block';
import Router from '../../core/Router/Router';
import withStore from '../../decorators/withStore';
import { StateKeys } from '../../store';
import './chat.css';
import './components';

interface ChatState extends ChatProps {
  allMessages: any[];
  linkToSettingsSlot: () => string;
  linkToChatsSlot: () => string;
  linkToProfileSlot: () => string;
  onSetMessages: (...messages: string[]) => void;
  onSendMessage: (text: string) => void;
}
interface ChatProps {
  router: Router;
  chats: PickType<State, StateKeys.Chats>;
  chatToken: PickType<State, StateKeys.ChatToken>;
  chatId: PickType<State, StateKeys.ChatId>;
  ws: WSChatsController;
}

@withStore(StateKeys.Chats, StateKeys.ChatToken, StateKeys.ChatId)
class ChatPage extends Block<ChatState> {
  constructor(props: ChatState) {
    super(props);
  }
  getStateFromProps(props: ChatState) {
    const allMessages: any[] = [];
    const linkToSettingsSlot = () => `{{{SvgTemplate svgId="profile"}}}`;

    const linkToChatsSlot = () => `{{{SvgTemplate svgId="chat"}}}`;

    const linkToProfileSlot = () => `{{{SvgTemplate svgId="settings"}}}`;

    const onSendMessage = (text: string) => {
      if (this.props.ws?.isConnected()) {
        this.props.ws.sendMessage(text);
      }
    };

    const onSetMessages = (...messages: string[]) => {
      this.setProps({
        ...this.props,
        allMessages: [...this.props.allMessages, ...messages],
      });
    };

    const state: Partial<ChatState> = {
      allMessages: allMessages,
      linkToSettingsSlot,
      linkToChatsSlot,
      linkToProfileSlot,
      onSendMessage,
      onSetMessages,
    };
    this.state = {
      ...state,
      ...props,
    };
  }
  componentDidMount() {
    ChatsController.getChatsList();
    this.props.ws = new WSChatsController(
      this.state.onSetMessages as EventBusListener
    );
  }
  componentDidUpdate(props: ChatProps): void {
    const { chatId, chatToken } = props;
    if (chatId && chatToken && this.props.ws?.isNewChat(chatToken, chatId)) {
      if (this.props.ws?.isConnected()) {
        this.props.ws.disconnect();
      }
      this.props.ws?.connect(chatToken, chatId);
    }
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
                {{{Chat chatId=chatId onSendMessage=onSendMessage allMessages=allMessages}}}
              </section>
            </main>`;
  }
}

export default ChatPage;
