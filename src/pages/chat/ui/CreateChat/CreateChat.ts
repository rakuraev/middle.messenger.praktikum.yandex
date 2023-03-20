import { ChatController } from 'entities/Chat';
import { Block } from 'shared/lib/core';
import { Toast, useToast } from 'shared/lib/toast';
import validateString, { FormFieldTypes } from 'shared/lib/validate';
import { Input, ModalWindow } from 'shared/ui';
import './createChat.css';

interface CreateChatProps {
  toast: Toast;
  InputProps: IInputProps;
  onCreateChat: (e: Event) => void;
}

interface CreateChatRefs {
  ModalWindow: ModalWindow;
  Input: Input;
}
export class CreateChat extends Block<CreateChatProps, CreateChatRefs> {
  static _name = 'CreateChat';

  getStateFromProps(props: CreateChatProps) {
    const onFocus = () => {
      const loginInputRef = this.refs.Input;
      if (loginInputRef.isError) {
        loginInputRef.hideError();
      }
    };
    const onBlur = () => {
      const loginInputRef = this.refs.Input;
      const validateField = validateString(
        loginInputRef.getValue(),
        FormFieldTypes.firstName
      );
      if (!validateField.isValid) {
        loginInputRef.setError('Нельзя так назвать чат');
      }
    };

    const state: Partial<CreateChatProps> = {
      toast: useToast,
      InputProps: {
        placeholder: 'Название чата',
        id: 'name',
        type: 'text',
        value: '',
        isError: false,
        errorMessage: '',
        onFocus,
        onBlur,
      },
      onCreateChat: async (e: Event) => {
        try {
          const chatNameInputRef = this.refs.Input;
          const validateField = validateString(
            chatNameInputRef.getValue(),
            FormFieldTypes.firstName
          );
          if (!validateField.isValid) {
            this.refs.Input.setError('Нельзя так назвать чат');
            throw 'Invalid chat name';
          }
          await ChatController.createChat(validateField.value);
          this.refs.Input.clearValue();
          this.refs.ModalWindow.hideModal();
          this.state.toast.success('Success chat create');
        } catch (e) {
          if (typeof e === 'string') {
            this.state.toast.error(e);
          }
        }
      },
    };
    this.state = { ...props, ...state };
  }

  public showModal() {
    this.refs.ModalWindow.showModal();
  }

  render() {
    return `{{#ModalWindow ref="ModalWindow"}}
              <div class="create-chat">
                  <div class="create-chat__title">Создать чат</div>
                  {{{Input 
                    ref="Input" 
                    placeholder=InputProps.placeholder 
                    onFocus=InputProps.onFocus 
                    onBlur=InputProps.onBlur 
                    id=InputProps.id 
                    type=InputProps.type 
                    isError=InputProps.isError 
                    value=InputProps.value 
                    errorMessage=InputProps.errorMessage
                  }}}
                  {{#Button modificator="blue" onClick=onCreateChat}}Создать чат{{/Button}}
              </div>
            {{/ModalWindow}}`;
  }
}
