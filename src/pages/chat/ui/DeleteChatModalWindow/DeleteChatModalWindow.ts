import { ChatController } from 'entities/Chat';
import { Block } from 'shared/lib/core';
import { Toast, useToast } from 'shared/lib/toast';
import { ModalWindow } from 'shared/ui';
import './deleteChatModalWindow.css';

interface IDeleteChatModalWindowRef {
  modalWindow: ModalWindow;
}
interface IDeleteChatModalWindowProps {
  chatId: number;
  toast: Toast;
  onDeleteChat: (e: Event) => void;
  onSuccess: () => void;
}

export class DeleteChatModalWindow extends Block<
  IDeleteChatModalWindowProps,
  IDeleteChatModalWindowRef
> {
  static _name = 'DeleteChatModalWindow';

  getStateFromProps(props: IDeleteChatModalWindowProps) {
    const state: Partial<IDeleteChatModalWindowProps> = {
      toast: useToast,
      onDeleteChat: async (e: Event) => {
        try {
          ChatController.deleteChat(this.state.chatId);
          this.state.toast.success('Chat Deleted');
          this.refs.modalWindow.hideModal();
          this.state.onSuccess();
        } catch (e) {
          if (typeof e === 'string') {
            this.state.toast.error(e);
          }
        }
      },
    };
    this.state = { ...props, ...state };
  }

  showModal() {
    this.refs.modalWindow.showModal();
  }

  render(): string {
    return `
    {{#ModalWindow ref="modalWindow"}}
      <div class="delete-chat-mw">
        <div class="delete-chat-mw__title">Удалить чат</div>
        <div class="delete-chat-mw__btn">{{{Button text="Удалить" modificator="blue" onClick=onDeleteChat}}}</div>
      <div>
    {{/ModalWindow}}
    `;
  }
}
