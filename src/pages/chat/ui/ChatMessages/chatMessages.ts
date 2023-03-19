import { Block } from 'shared/lib/core';
import './chatMessages.css';

interface IChatMessagesProps {
  allMessages?: Message[];
  sortedMessagesByTime: Message[];
}
class ChatMessages extends Block<IChatMessagesProps> {
  static _name = 'ChatMessages';

  getStateFromProps(props: IChatMessagesProps): void {
    const sortedMessagesByTime =
      props?.allMessages?.sort(
        (lhsMessage, rhsMessage) =>
          new Date(lhsMessage.time).getTime() -
          new Date(rhsMessage.time).getTime()
      ) || [];
    this.state = { ...props, sortedMessagesByTime };
  }

  componentBeforeMount(props: IChatMessagesProps): void {
    const messagesCount = props.allMessages?.length || 0;
    if (this.element && messagesCount > 0) {
      this.element.classList.add('chat-messages_pending');
    }
  }

  componentDidMount(props?: IChatMessagesProps): void {
    if (this.element) {
      this.element.scrollTop = this.element.scrollHeight;
      setTimeout(() => {
        this.element?.classList.remove('chat-messages_pending');
      }, 100);
    }
  }

  render() {
    return `<div class="chat-messages ">
              <div class="chat-messages__spinner">{{{Spinner}}}</div>
              <div class="chat-messages__content">
                {{#each sortedMessagesByTime}}
                  {{{ChatMessage message=this}}}
                {{/each}}
              </div>
            </div>`;
  }
}

export default ChatMessages;
