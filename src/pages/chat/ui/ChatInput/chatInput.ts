import { ChatEventBusEvents } from 'pages/chat/chat';
import { WSChatController } from 'entities/Chat';
import { Block, EventBus } from 'shared/lib/core';
import { Input } from 'shared/ui';
import './chat-input.css';
interface IChatInputRef {
  chatInput: Input;
}

interface IChatInputProps {
  ChatEventBus: EventBus;
  ws: WSChatController;
  onSend: () => void;
}
class ChatInput extends Block<IChatInputProps, IChatInputRef> {
  static _name = 'ChatInput';

  constructor(props: IChatInputProps) {
    const onSend = () => {
      const text = this.refs.chatInput.getValue();
      props.ChatEventBus.emit(ChatEventBusEvents.SEND_NEW_MESSAGE, text);
      this.refs.chatInput.clearValue();
    };
    super({ ...props, onSend });
  }

  render(): string {
    return `<div class="chat-input">
              {{{AddFile ws=ws}}}
              {{{Input class="chat-input__input" ref='chatInput' disableError=true placeholder="Сообщение"}}}
              {{#Button class="chat-input__button" onClick=onSend}}
                {{{SvgTemplate svgId="arrow"}}}
              {{/Button}}
            </div>`;
  }
}
export default ChatInput;
