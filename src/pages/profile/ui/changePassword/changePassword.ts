import { UserController } from 'entities/User';
import { Block } from 'shared/lib/core';
import { Toast, useToast } from 'shared/lib/toast';
import validateString, { FormFieldTypes } from 'shared/lib/validate';
import { ModalWindow } from 'shared/ui';
import Input from 'shared/ui/Input';
import './changePassword.css';

type ChangePasswordFielsId = 'oldPassword' | 'newPassword';
interface IChangePasswordProps {
  changePasswordFields: IInputProps[];
  toast: Toast;
  className: string[];
  onChangePassword: (e: Event) => void;
}
interface IChangePasswordRefs {
  oldPassword: Input;
  newPassword: Input;
  modalWindow: ModalWindow;
}

export default class ChangePassword extends Block<
  IChangePasswordProps,
  IChangePasswordRefs
> {
  static _name = 'ChangePassword';

  constructor(props: IChangePasswordProps) {
    const className = ['change-password-mw'];
    super({ ...props, className });
  }

  getStateFromProps() {
    const toast = useToast;
    const onFocus = (event: Event) => {
      const id = (event.target as HTMLInputElement).id as ChangePasswordFielsId;
      this.refs[id].hideError();
    };
    const onBlur = (event: Event) => {
      const id = (event.target as HTMLInputElement).id as ChangePasswordFielsId;
      const currentRef = this.refs[id];
      const type = currentRef.state.validateType;
      const validateField = validateString(
        currentRef.getValue(),
        type as FormFieldTypes
      );
      if (!validateField.isValid) {
        currentRef.setError(validateField.message);
      }
    };
    const state: IChangePasswordProps = {
      toast,
      className: this.props.className,
      changePasswordFields: [
        {
          placeholder: 'Старый пароль',
          id: 'oldPassword',
          name: 'old-password',
          validateType: FormFieldTypes.password,
          type: 'password',
          value: '',
          isError: false,
          errorMessage: '',
          autocomplete: 'off',
          onFocus,
          onBlur,
        },
        {
          placeholder: 'Новый пароль',
          id: 'newPassword',
          name: 'new-password',
          validateType: FormFieldTypes.password,
          type: 'password',
          value: '',
          isError: false,
          errorMessage: '',
          autocomplete: 'new-password',
          onFocus,
          onBlur,
        },
      ],
      onChangePassword: async (e: Event) => {
        e.stopPropagation();
        const inputValues: UpdateProfilePassword = {
          newPassword: this.refs.newPassword.getValue(),
          oldPassword: this.refs.oldPassword.getValue(),
        };
        const validatedFields: Record<string, ValidateOutput> = {
          newPassword: validateString(
            inputValues.newPassword,
            FormFieldTypes.password
          ),
          oldPassword: validateString(
            inputValues.oldPassword,
            FormFieldTypes.password
          ),
        };
        const nextInputFields = state.changePasswordFields.map((field) => {
          const fieldId = field.id as ChangePasswordFielsId;
          if (fieldId in validatedFields) {
            const validatedField = validatedFields?.[fieldId];
            if (!validatedField.isValid) {
              field.isError = true;
              field.errorMessage = validatedField.message;
              this.refs[fieldId].setError(field.errorMessage);
            } else {
              field.isError = false;
              field.errorMessage = '';
            }
            field.value = validatedField.value;
          }
          return field;
        });
        const isFormValid = nextInputFields.some((field) => !field.isError);
        if (isFormValid) {
          try {
            await UserController.updatePassword(inputValues);
            this.state.toast.success('Successful password change');
            this.refs.newPassword.clearValue();
            this.refs.oldPassword.clearValue();
            this.refs.modalWindow.hideModal();
          } catch (e) {
            this.state.toast.error(e);
          }
        }
      },
    };
    this.setState(state);
  }

  showModal() {
    this.refs.modalWindow.showModal();
  }

  render() {
    return `
          {{#ModalWindow className=className ref="modalWindow"}}
              <div class="change-password-mw">
                  <div class="change-password-mw__title">Замена пароля</div>
                  {{#each changePasswordFields}}
                        {{{Input placeholder=placeholder id=id validateType=validateType type=type errorMessage=errorMessage isError=isError value=value ref=id onFocus=onFocus onBlur=onBlur autocomplete=autocomplete}}}
                  {{/each}}
                  {{{Button text="Изменить пароль" modificator="blue" onClick=onChangePassword}}}
              </div>
          {{/ModalWindow}}`;
  }
}
