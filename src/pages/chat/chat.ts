import { ChatController, WSChatController } from 'entities/Chat';
import { StateKeys } from 'shared/config';
import { Block } from 'shared/lib/core';
import { Router } from 'shared/lib/core';
import { withStore } from 'shared/lib/decorators';
import './chat.css';
import './ui';

interface ChatState extends ChatProps {
  allMessages: Message[];
  onSetMessages: (...messages: Message[]) => void;
  onSendMessage: (text: string) => void;
}

interface ChatProps {
  router: Router;
  chats: PickType<State, StateKeys.Chats>;
  chatToken: PickType<State, StateKeys.ChatToken>;
  chatId: PickType<State, StateKeys.ChatId>;
  ws?: WSChatController;
}

@withStore(StateKeys.Chats, StateKeys.ChatToken, StateKeys.ChatId)
class ChatPage extends Block<ChatState> {
  static _name = 'ChatPage';

  constructor(props: ChatState) {
    const allMessages: Message[] = [];
    super({ ...props, allMessages });
  }

  getStateFromProps(props: ChatState) {
    const onSendMessage = (text: string) => {
      if (this.props.ws?.isConnected()) {
        this.props.ws.sendMessage(text);
      }
    };

    const onSetMessages = (...messages: Message[]) => {
      this.setProps({
        ...this.props,
        allMessages: [...this.props.allMessages, ...messages],
      });
    };

    const state: Partial<ChatState> = {
      onSendMessage,
      onSetMessages,
    };
    this.state = {
      ...state,
      ...props,
    };
  }

  componentDidMount() {
    ChatController.getChatsList();
    this.props.ws = new WSChatController(
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
    return `
          {{#Layout}}
            <main class="chats-page">
              <aside class="left-panel">
                <div class="search">
                  <!-- <input class="search__input" type="text" /> -->
                </div>
                {{{ChatList chats=chats chatId=chatId}}}
                <nav class="navigation-bar-container">
                  <ul class="navigation-bar">
                    <li class="navigation-bar__item">
                      {{#Link href="#" class="navigation-bar__link"}}
                        {{{SvgTemplate svgId="chat"}}}
                      {{/Link}}
                    </li>
                    <li class="navigation-bar__item">
                      {{#Link href="/settings"  class="navigation-bar__link"}}
                        {{{SvgTemplate svgId="settings"}}}
                      {{/Link}}
                    </li>
                  </ul>
                </nav>
              </aside>
              <section class="chat">
                {{{Chat chatId=chatId onSendMessage=onSendMessage allMessages=allMessages ws=ws}}}
              </section>
            </main>
          {{/Layout}}`;
  }
}

export default ChatPage;
