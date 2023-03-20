import { ChatController, WSChatController } from 'entities/Chat';
import { StateKeys } from 'shared/config';
import { Block, EventBus } from 'shared/lib/core';
import { Router } from 'shared/lib/core';
import { withStore } from 'shared/lib/decorators';
import './chat.css';
import './ui';
import { CreateChat } from './ui';

export enum ChatEventBusEvents {
  GET_OLD_MESSAGES = 'get-old-messages',
  PUSH_NEW_MESSAGES = 'push-new-messages',
  SEND_NEW_MESSAGE = 'send-new-message',
}

interface ChatProps {
  allMessages: Message[];
  router: Router;
  chats: PickType<State, StateKeys.Chats>;
  chatToken: PickType<State, StateKeys.ChatToken>;
  chatId: PickType<State, StateKeys.ChatId>;
  ws?: WSChatController;
  ChatEventBus: EventBus;
  onSetMessages: (...messages: Message[]) => void;
  onSendMessage: (text: unknown) => void;
  onGetOldMessages: (offsetIndex: unknown) => void;
}

interface ChatRefs {
  createChatMW: CreateChat;
}

@withStore(StateKeys.Chats, StateKeys.ChatToken, StateKeys.ChatId)
class ChatPage extends Block<ChatProps, ChatRefs> {
  static _name = 'ChatPage';

  constructor(props: ChatProps) {
    const ChatEventBus = new EventBus();
    const allMessages: Message[] = [];
    super({ ...props, allMessages, ChatEventBus });
  }

  getStateFromProps(props: ChatProps) {
    const onSendMessage = (text: unknown) => {
      if (this.props.ws?.isConnected() && typeof text === 'string') {
        this.props.ws.sendMessage(text);
      }
    };

    const onSetMessages = (...messages: Message[]) => {
      this.state.ChatEventBus.emit(
        ChatEventBusEvents.PUSH_NEW_MESSAGES,
        ...messages
      );
    };

    const getOldMessages = (offsetIndex: unknown) => {
      if (this.props.ws?.isConnected()) {
        this.props.ws.getOldMessages(offsetIndex);
      }
    };

    const onGetOldMessages = getOldMessages.bind(this);

    const state: Partial<ChatProps> = {
      onSendMessage: onSendMessage.bind(this),
      onSetMessages,
      onGetOldMessages,
    };
    this.state = {
      ...state,
      ...props,
    };
  }

  componentBeforeMount(props: ChatProps): void {
    props.ChatEventBus.on(
      ChatEventBusEvents.GET_OLD_MESSAGES,
      this.state.onGetOldMessages
    );
    props.ChatEventBus.on(
      ChatEventBusEvents.SEND_NEW_MESSAGE,
      this.state.onSendMessage
    );
    this.addOnCreateChat();
  }

  componentDidMount() {
    ChatController.getChatsList();
    this.props.ws = new WSChatController(
      this.state.onSetMessages as EventBusListener
    );
  }

  componentDidUpdate(props: ChatProps): void {
    this.removeOnCreateChat();
    const { chatId, chatToken } = props;
    if (chatId && chatToken && this.props.ws?.isNewChat(chatToken, chatId)) {
      if (this.props.ws?.isConnected()) {
        this.props.ws.disconnect();
      }
      this.props.ws?.connect(chatToken, chatId);
    }
    this.addOnCreateChat();
  }

  addOnCreateChat() {
    const createChatBtn = this.element?.querySelector('[create-chat]');
    if (createChatBtn) {
      createChatBtn.addEventListener('click', this.bindedOnCreateChat);
    }
  }

  removeOnCreateChat() {
    const createChatBtn = this.element?.querySelector('[create-chat]');
    if (createChatBtn) {
      createChatBtn.removeEventListener('click', this.bindedOnCreateChat);
    }
  }

  public componentBeforeUnmount(props: ChatProps): void {
    this.removeOnCreateChat();
  }

  bindedOnCreateChat = this.onCreateChat.bind(this);

  onCreateChat() {
    this.refs.createChatMW.showModal();
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
                      <div class="navigation-bar__link" create-chat>
                        {{{SvgTemplate svgId="add"}}}
                      </div>
                    </li>
                    <li class="navigation-bar__item">
                      <div class="navigation-bar__link">
                        {{{SvgTemplate svgId="chat"}}}
                      </div>
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
                {{{Chat chatId=chatId ChatEventBus=ChatEventBus ws=ws}}}
              </section>
            </main>
            {{{CreateChat ref="createChatMW"}}}
          {{/Layout}}`;
  }
}

export default ChatPage;
