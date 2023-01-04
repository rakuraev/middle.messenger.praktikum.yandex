import Input from '../../../../components/Input';
import ModalWindow, {
  MWProps,
} from '../../../../components/ModalWindow/ModalWindow';
import UserController from '../../../../controllers/UserController';
import validateString, { FormFieldTypes } from '../../../../utils/validate';
import './changePassword.css';

type ChangePasswordFielsId = 'oldPassword' | 'newPassword';
interface IChangePasswordState {
  changePasswordFields: IInputProps[];
  onChangePassword: (e: Event) => void;
}
interface IChangePasswordChange {
  oldPassword: Input;
  newPassword: Input;
}
export default class ChangePassword extends ModalWindow<
  MWProps,
  IChangePasswordChange
> {
  static _name = 'ChangePassword';
  constructor() {
    const className = ['change-password-mw'];
    super({ className });
  }

  getStateFromProps() {
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
    const state: IChangePasswordState = {
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
            FormFieldTypes.login
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
          } catch (e) {
          } finally {
            this.refs.newPassword.clearValue();
            this.refs.oldPassword.clearValue();
            this.hideModal();
          }
        }
      },
    };
    this.setState(state);
  }
  render() {
    const content = `<div class="change-password-mw">
          <div>Замена пароля</div>
          {{#each changePasswordFields}}
                {{{Input placeholder=placeholder id=id validateType=validateType type=type errorMessage=errorMessage isError=isError value=value ref=id onFocus=onFocus onBlur=onBlur autocomplete=autocomplete}}}
          {{/each}}
          {{{Button text="Изменить пароль" modificator="blue" onClick=onChangePassword}}}

    </div>`;
    const mwContent = super.wrapContent(content);
    return mwContent;
  }
}
