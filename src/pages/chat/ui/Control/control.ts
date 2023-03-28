import { Block } from 'shared/lib/core';
import { Tooltip } from 'shared/ui';
import { TooltipPositions } from 'shared/ui/Tooltip';
import { AddUserModalWindow, DeleteUserModalWindow } from '../';
import './control.css';

interface ControlProps {
  chatId: number;
  tooltipPosition: TooltipPositions;
  onSuccess: () => void;
  onClick: () => void;
  onContentClick: (e: Event) => void;
  events: { click: () => void };
}
interface ControlRef {
  tooltip?: Tooltip;
  addUserModalWindow?: AddUserModalWindow;
  deleteUserModalWindow?: DeleteUserModalWindow;
}

enum ControlEventTypes {
  AddUser = 'add-user',
  DeleteChat = 'delete-chat',
}
export class Contol extends Block<ControlProps, ControlRef> {
  static _name = 'Control';

  constructor(props: ControlProps) {
    const onClick = () => {
      if ('tooltip' in this.refs) {
        this.refs.tooltip?.toggleTooltip();
      }
    };
    const onSuccess = () => {
      if ('tooltip' in this.refs) {
        this.refs.tooltip?.hideTooltip();
      }
    };
    const tooltipPosition = TooltipPositions.bottomRight;

    const onContentClick = (e: Event) => {
      const target = e.target as Nullable<HTMLElement>;
      if (target) {
        const targetParentElement = target.closest(
          '[data-event]'
        ) as Nullable<HTMLElement>;
        if (targetParentElement) {
          const eventType = targetParentElement.dataset
            .event as Nullable<ControlEventTypes>;
          if (eventType === ControlEventTypes.AddUser) {
            this.refs.addUserModalWindow?.showModal();
          } else if (eventType === ControlEventTypes.DeleteChat) {
            this.refs.deleteUserModalWindow?.showModal();
          }
        }
      }
    };

    super({
      ...props,
      tooltipPosition,
      onContentClick,
      onSuccess,
      events: { click: onClick },
    });
  }

  render() {
    return `<div class="control">
              <div class="control__icon">{{{SvgTemplate svgId="control"}}}</div>
              {{#Tooltip ref="tooltip" onContentClick=onContentClick offsetY=30.5 position=tooltipPosition}}
                <div class="control__add-user" data-event="add-user">
                  {{{SvgTemplate svgId="add"}}}
                  <div class="control__text">Добавить пользователя</div>
                </div>
                <div class="control__delete-chat" data-event="delete-chat"> 
                  {{{SvgTemplate svgId="add"}}}
                  <div class="control__text">Удалить чат</div>
                </div>
              {{/Tooltip}}
              {{{AddUserModalWindow ref="addUserModalWindow" chatId=chatId onSuccess=onSuccess}}}
              {{{DeleteChatModalWindow ref="deleteUserModalWindow" chatId=chatId onSuccess=onSuccess}}}
            </div>`;
  }
}
