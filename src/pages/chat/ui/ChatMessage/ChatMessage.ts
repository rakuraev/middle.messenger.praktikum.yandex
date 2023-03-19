import { StateKeys } from 'shared/config';
import { Block } from 'shared/lib/core';
import { getFormatHourAndMinutes } from 'shared/lib/date';
import { withStore } from 'shared/lib/decorators';
import './chatMessage.css';

interface IChatMessageProps {
  message: Message;
  user: UserData;
}

type IChatMessageState = {
  message: Message;
  messageType: MessageTypes;
  isMineMessage: boolean;
  isFile: boolean;
  user: UserData;
  isReaded: boolean;
  time: string;
};

@withStore(StateKeys.User)
export class ChatMessage extends Block<IChatMessageProps> {
  static _name = 'ChatMessage';

  getStateFromProps(props: IChatMessageProps) {
    const isMineMessage = props.user.id === props.message.user_id;
    const isFile = props.message.type === 'file';
    const isReaded = props.message.is_read;
    const time = getFormatHourAndMinutes(new Date(props.message.time));
    const state: Partial<IChatMessageState> = {
      isReaded,
      isMineMessage,
      isFile,
      time,
    };
    this.state = { ...props, ...state };
  }

  render() {
    return `<div class="message{{#if isMineMessage}} message_mine{{/if}}">
             {{#if isFile}}
              <div class="message__file">
                {{{ChatImage file=message.file}}}
              </div>
             {{else}}
              <div class="message__content">
                  <div class="message__string">{{message.content}}</div>
                  <div class="message__time">
                    {{#if isMineMessage}}
                      {{#if isReaded}}
                        {{{SvgTemplate svgId="double-check"}}}
                      {{else}}
                        {{{SvgTemplate svgId="check"}}}
                      {{/if}}
                    {{/if}}
                    <span>{{time}}</span>
                  </div> 
             {{/if}}
            </div>`;
  }
}
