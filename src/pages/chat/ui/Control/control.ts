import { Block } from 'shared/lib/core';
import { Tooltip } from 'shared/ui';
import { TooltipPositions } from 'shared/ui/Tooltip';
import { AddUserModalWindow, DeleteUserModalWindow } from '../';
import './control.css';

interface IRefControl {
  tooltip?: Tooltip;
  addUserModalWindow?: AddUserModalWindow;
  deleteUserModalWindow?: DeleteUserModalWindow;
}

enum ControlEventTypes {
  AddUser = 'add-user',
  DeleteUser = 'delete-user',
}
export class Contol extends Block<any, IRefControl> {
  static _name = 'Control';

  constructor(props: any) {
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
          } else if (eventType === ControlEventTypes.DeleteUser) {
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
                <div class="control__remove-user" data-event="delete-user"> 
                  {{{SvgTemplate svgId="add"}}}
                  <div class="control__text">Удалить пользователя</div>
                </div>
              {{/Tooltip}}
              {{{AddUserModalWindow ref="addUserModalWindow" chatId=chatId onSuccess=onSuccess}}}
              {{{DeleteUserModalWindow ref="deleteUserModalWindow" chatId=chatId onSuccess=onSuccess}}}
            </div>`;
  }
}
