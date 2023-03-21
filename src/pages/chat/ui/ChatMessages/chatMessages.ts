import { ChatEventBusEvents } from 'pages/chat/chat';
import { Block, EventBus } from 'shared/lib/core';
import { isArray } from 'shared/lib/typeguards';
import { ChatMessage } from '../ChatMessage';
import './chatMessages.css';

interface IChatMessagesProps {
  ChatEventBus: EventBus;
  onPushNewMessages: (messages: unknown) => void;
}
class ChatMessages extends Block<IChatMessagesProps> {
  static _name = 'ChatMessages';

  private _isInited = false;

  private _renderedMessages: Record<string, ChatMessage> = {};

  private _messageOffest = 0;

  getStateFromProps(props: IChatMessagesProps): void {
    const pushNewMessages = (...messages: unknown[]) => {
      if (isArray(messages)) {
        this.renderMessages(messages as Message[]);
        if (messages.length < 20) {
          this._messageOffest = NaN;
        }
      }
    };

    const onPushNewMessages = pushNewMessages.bind(this);

    this.state = { ...props, onPushNewMessages };
  }

  sortMessagesByTime(messages: Message[]) {
    const sortedMessagesByTime =
      messages.sort(
        (lhsMessage, rhsMessage) =>
          new Date(lhsMessage.time).getTime() -
          new Date(rhsMessage.time).getTime()
      ) || [];
    return sortedMessagesByTime;
  }

  componentBeforeMount(props: IChatMessagesProps): void {
    props.ChatEventBus.on(
      ChatEventBusEvents.PUSH_NEW_MESSAGES,
      this.state.onPushNewMessages
    );
    if (this.element) {
      this.element.classList.add('chat-messages_pending');
    }
  }

  componentDidMount(props: IChatMessagesProps): void {
    this.getOldMessages();
  }

  componentDidUnmount(props: IChatMessagesProps): void {
    props.ChatEventBus.off(
      ChatEventBusEvents.PUSH_NEW_MESSAGES,
      this.state.onPushNewMessages
    );
  }

  onChangeMessageList() {
    setTimeout(() => {
      if (!this._isInited) {
        if (this.element) {
          this.element.classList.remove('chat-messages_pending');
          this.element.scrollTop = this.element.scrollHeight;
          this.element.addEventListener('scroll', this.bindedOnScroll);
        }
        this._isInited = true;
      }
    }, 200);
    this.onScroll();
  }

  getMessagesElement() {
    return this.element?.querySelector('.chat-messages__content');
  }

  renderMessages(messages: Message[]) {
    const oldMessages = Object.values(this._renderedMessages);

    const newMessages = messages.map(
      (messageData) => new ChatMessage({ message: messageData })
    );

    const allMessagesByTime =
      [...oldMessages, ...newMessages].sort(
        (lhsMessage, rhsMessage) =>
          new Date(rhsMessage.props.message.time).getTime() -
          new Date(lhsMessage.props.message.time).getTime()
      ) || [];

    allMessagesByTime.forEach((messageBlock, index) => {
      if (messageBlock.props.message.id in this._renderedMessages) {
        return;
      }
      const content = messageBlock.getContent();
      const messagesElement = this.getMessagesElement();
      if (index > 0) {
        if (content) {
          const contentTarget = allMessagesByTime[index - 1].element;
          if (contentTarget && messagesElement) {
            messagesElement.insertBefore(content, contentTarget);
            this._renderedMessages[messageBlock.props.message.id] =
              messageBlock;
          }
        }
      } else {
        if (messagesElement && content) {
          messagesElement.appendChild(content);
        }
      }
    });

    this.onChangeMessageList();
  }

  getOldMessages() {
    if (!Number.isNaN(this._messageOffest)) {
      this.state.ChatEventBus.emit(
        ChatEventBusEvents.GET_OLD_MESSAGES,
        this._messageOffest
      );

      this._messageOffest += 20;
    }
  }

  onScroll() {
    const element = this.element;
    if (element) {
      if (element.scrollTop < 300) {
        this.getOldMessages();
      }
    }
  }

  bindedOnScroll = this.onScroll.bind(this);

  render() {
    return `{{#scroll-y-hidden}}
              <div class="chat-messages">
                <div class="chat-messages__spinner">{{{Spinner}}}</div>
                <div class="chat-messages__content">
              </div>
            </div>
            {{/scroll-y-hidden}}`;
  }
}

export default ChatMessages;
