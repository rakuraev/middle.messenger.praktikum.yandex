import { UserController } from 'entities/User';
import { Block } from 'shared/lib/core';
import { Toast, useToast } from 'shared/lib/toast';
import validateString, { FormFieldTypes } from 'shared/lib/validate';
import { Input, ModalWindow } from 'shared/ui';
import './changeProfileData.css';

type ChangeDataFieldsId =
  | 'login'
  | 'email'
  | 'phone'
  | 'firstName'
  | 'secondName'
  | 'displayName';

interface ChangeProfileDataProps {
  user: Nullable<UserData>;
  toast: Toast;
  changeProfileDataFields: IInputProps[];
  onChangeProfileData: () => void;
}

interface ChangeProfileDataRefs {
  modalWindow: ModalWindow;
  login: Input;
  email: Input;
  phone: Input;
  firstName: Input;
  secondName: Input;
  displayName: Input;
}

export class ChangeProfileData extends Block<
  ChangeProfileDataProps,
  ChangeProfileDataRefs
> {
  static _name = 'ChangeProfileData';

  getStateFromProps(props: ChangeProfileDataProps): void {
    const onFocus = (event: Event) => {
      const id = (event.target as HTMLInputElement).id as ChangeDataFieldsId;
      this.refs[id].hideError();
    };

    const onBlur = (event: Event) => {
      const id = (event.target as HTMLInputElement).id as ChangeDataFieldsId;
      const currentRef = this.refs[id];
      const validateField = validateString(
        currentRef.getValue(),
        FormFieldTypes[id]
      );

      if (!validateField.isValid) {
        currentRef.setError(validateField.message);
      }
    };

    const state: Partial<ChangeProfileDataProps> = {
      toast: useToast,
      changeProfileDataFields: [
        {
          placeholder: 'Почта',
          id: 'email',
          type: 'text',
          value: props.user?.email || '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur,
        },
        {
          placeholder: 'Логин',
          id: 'login',
          type: 'text',
          value: props.user?.login || '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur,
        },
        {
          placeholder: 'Телефон',
          id: 'phone',
          type: 'text',
          value: props.user?.phone || '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur,
        },
        {
          placeholder: 'Имя',
          id: 'firstName',
          type: 'text',
          value: props.user?.first_name || '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur,
        },
        {
          placeholder: 'Фамилия',
          id: 'secondName',
          type: 'text',
          value: props.user?.second_name || '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur,
        },
        {
          placeholder: 'Имя в чате',
          id: 'displayName',
          type: 'text',
          value: props.user?.display_name || '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur,
        },
      ],
      onChangeProfileData: async () => {
        try {
          const inputValues = {
            email: this.refs.email.getValue(),
            login: this.refs.login.getValue(),
            phone: this.refs.phone.getValue(),
            first_name: this.refs.firstName.getValue(),
            second_name: this.refs.secondName.getValue(),
            display_name: this.refs.displayName.getValue(),
          };

          const validatedFields: Record<ChangeDataFieldsId, ValidateOutput> = {
            email: validateString(inputValues.email, FormFieldTypes.email),
            login: validateString(inputValues.login, FormFieldTypes.login),
            phone: validateString(inputValues.phone, FormFieldTypes.phone),

            firstName: validateString(
              inputValues.first_name,
              FormFieldTypes.firstName
            ),
            secondName: validateString(
              inputValues.second_name,
              FormFieldTypes.secondName
            ),
            displayName: {
              isValid: true,
              value: inputValues.display_name,
              message: '',
            },
          };

          this.state.changeProfileDataFields.forEach((field) => {
            const fieldId = field.id as ChangeDataFieldsId;
            if ('isValid' in validatedFields[fieldId]) {
              if (!validatedFields?.[fieldId].isValid) {
                this.refs[fieldId].setError(validatedFields[fieldId].message);
              }
            }
          });
          const isFormValid = Object.values(validatedFields).every(
            (field) => field.isValid
          );
          if (isFormValid) {
            await UserController.updateUserProfile(inputValues);
            this.state.toast.success('Success profile info change');
          }
        } catch (error) {
          this.state.toast.error(error);
        }
      },
    };

    this.state = { ...props, ...state };
  }

  showModal() {
    this.refs.modalWindow.showModal();
  }

  render(): string {
    return `{{#ModalWindow ref="modalWindow"}}
              <div class="change-profile">
                <div class="change-profile__title">Изменить информацию</div>
                {{#each changeProfileDataFields}}
                    {{{Input placeholder=placeholder id=id type=type errorMessage=errorMessage isError=isError value=value ref=id onFocus=onFocus onBlur=onBlur}}}
                {{/each}}
                {{#Button onClick=onChangeProfileData modificator="blue"}}Изменить информацию{{/Button}}
              </div>
            {{/ModalWindow}}`;
  }
}
