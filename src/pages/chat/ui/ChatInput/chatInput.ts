import { Block } from 'shared/lib/core';
import { Input } from 'shared/ui';
import './chat-input.css';
interface IChatRef {
  chatInput: Input;
}
class ChatInput extends Block<any, IChatRef> {
  static _name = 'ChatInput';

  constructor({ onSendMessage, ...props }: any) {
    const onSend = () => {
      const text = this.refs.chatInput.getValue();
      onSendMessage(text);
      this.refs.chatInput.clearValue();
    };
    super({ onSend, ...props });
    console.log(this);
  }

  render(): string {
    return `<div class="chat-input">
              {{{Input class="chat-input__input" ref='chatInput'}}}
              {{{Button class="chat-input__button" onClick=onSend text="Отправить сообщение"}}}
            </div>`;
  }
}
export default ChatInput;
