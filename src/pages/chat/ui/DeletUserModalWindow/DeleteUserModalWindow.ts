import { ChatController } from 'entities/Chat';
import { UserController } from 'entities/User';
import { Block } from 'shared/lib/core';
import { Toast, useToast } from 'shared/lib/toast';
import validateString, { FormFieldTypes } from 'shared/lib/validate';
import { Input, ModalWindow } from 'shared/ui';
import './deleteUserModalWindow.css';

interface IDeleteUserModalWindowRef {
  modalWindow: ModalWindow;
  loginInput: Input;
}
interface IDeleteUserModalWindowProps {
  chatId: number;
  toast: Toast;
  loginInputProps: IInput;
  onDeleteUser: (e: Event) => void;
  onSuccess: () => void;
}

export class DeleteUserModalWindow extends Block<
  IDeleteUserModalWindowProps,
  IDeleteUserModalWindowRef
> {
  static _name = 'DeleteUserModalWindow';

  getStateFromProps(props: IDeleteUserModalWindowProps) {
    const onFocus = () => {
      const loginInputRef = this.refs.loginInput;
      if (loginInputRef.isError) {
        loginInputRef.hideError();
      }
    };
    const onBlur = () => {
      const loginInputRef = this.refs.loginInput;
      const validateField = validateString(
        loginInputRef.getValue(),
        FormFieldTypes.login
      );
      if (!validateField.isValid) {
        loginInputRef.setError(validateField.message);
      }
    };

    const state: Partial<IDeleteUserModalWindowProps> = {
      toast: useToast,
      loginInputProps: {
        placeholder: 'Логин',
        id: 'login',
        type: 'text',
        value: '',
        isError: false,
        errorMessage: '',
        onFocus,
        onBlur,
      },
      onDeleteUser: async (e: Event) => {
        try {
          const loginInputRef = this.refs.loginInput;
          const validateField = validateString(
            loginInputRef.getValue(),
            FormFieldTypes.login
          );
          if (!validateField.isValid) {
            this.refs.loginInput.setError(validateField.message);
            throw 'Invalid user login';
          }

          const userListByLogin = (await UserController.searchUserByLogin(
            validateField.value
          )) as UserData[];
          if (userListByLogin?.length !== 1) {
            throw 'Error on search user by login';
          }
          const userId = userListByLogin[0].id;
          console.log(this.state);
          await ChatController.deleteUsersFromChat([userId], this.state.chatId);
          this.refs.modalWindow.hideModal();
          this.state.toast.success(
            `User ${userListByLogin[0].login} successfully deleted`
          );
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
      <div class="delete-user-mw">
        <div class="delete-user-mw__title">Удалить пользователя</div>
        <div class="delete-user-mw__input">
          {{{Input 
              ref="loginInput" 
              placeholder=loginInputProps.placeholder 
              onFocus=loginInputProps.onFocus 
              onBlur=loginInputProps.onBlur 
              id=loginInputProps.id 
              type=loginInputProps.type 
              isError=loginInputProps.isError 
              value=loginInputProps.value 
              errorMessage=loginInputProps.errorMessage
          }}}
        </div>
        <div class="delete-user-mw__btn">{{{Button text="Удалить" modificator="blue" onClick=onDeleteUser}}}</div>
      <div>
    {{/ModalWindow}}
    `;
  }
}
