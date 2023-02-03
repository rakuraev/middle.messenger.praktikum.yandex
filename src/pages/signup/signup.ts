import Input from '../../components/Input';
import AuthController from '../../controllers/AuthController';
import Block from '../../core/Block/Block';
import omit from '../../utils/omit';
import validateString, {
  FormFieldTypes,
  validateIsSame,
} from '../../utils/validate';
import withRouter from '../../decorators/withRouter';
import withStore from '../../decorators/withStore';
import './signup.css';

interface ISignupRef {
  login: Input;
  email: Input;
  phone: Input;
  password: Input;
  repeatPassword: Input;
  firstName: Input;
  secondName: Input;
}
@withStore()
export default class SignupPage extends Block<SignupProps, ISignupRef> {
  getStateFromProps(): void {
    const onFocus = (event: Event) => {
      const id = (event.target as HTMLInputElement).id as SignupFieldsId;
      this.refs[id].hideError();
    };
    const onBlur = (event: Event) => {
      const id = (event.target as HTMLInputElement).id as SignupFieldsId;
      const currentRef = this.refs[id];
      let validateField;
      if (id === 'repeatPassword') {
        const passwordInputValue = this.refs.password.getValue();
        validateField = validateIsSame(
          currentRef.getValue(),
          passwordInputValue,
          FormFieldTypes.repeatPassword
        );
      } else {
        validateField = validateString(
          currentRef.getValue(),
          FormFieldTypes[id]
        );
      }
      if (!validateField.isValid) {
        currentRef.setError(validateField.message);
      }
    };
    const state: SignupProps = {
      signupFields: [
        {
          placeholder: 'Почта',
          id: 'email',
          type: 'text',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur,
        },
        {
          placeholder: 'Логин',
          id: 'login',
          type: 'text',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur,
        },
        {
          placeholder: 'Телефон',
          id: 'phone',
          type: 'text',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur,
        },
        {
          placeholder: 'Имя',
          id: 'firstName',
          type: 'text',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur,
        },
        {
          placeholder: 'Фамилия',
          id: 'secondName',
          type: 'text',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur,
        },
        {
          placeholder: 'Пароль',
          id: 'password',
          type: 'password',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur,
        },
        {
          placeholder: 'И еще разочек Пароль',
          id: 'repeatPassword',
          type: 'password',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur,
        },
      ],
      onSignup: () => {
        const inputValues = {
          email: this.refs.email.getValue(),
          login: this.refs.login.getValue(),
          phone: this.refs.phone.getValue(),
          first_name: this.refs.firstName.getValue(),
          second_name: this.refs.secondName.getValue(),
          password: this.refs.password.getValue(),
          repeat_password: this.refs.repeatPassword.getValue(),
        };

        const validatedFields: Record<string, ValidateOutput> = {
          email: validateString(inputValues.email, FormFieldTypes.email),
          login: validateString(inputValues.login, FormFieldTypes.login),
          phone: validateString(inputValues.phone, FormFieldTypes.phone),
          password: validateString(
            inputValues.password,
            FormFieldTypes.password
          ),
          firstName: validateString(
            inputValues.first_name,
            FormFieldTypes.firstName
          ),
          secondName: validateString(
            inputValues.second_name,
            FormFieldTypes.secondName
          ),
          repeatPassword: validateIsSame(
            inputValues.repeat_password,
            inputValues.password,
            FormFieldTypes.repeatPassword
          ),
        };
        state.signupFields.forEach((field) => {
          const fieldId = field.id as SignupFieldsId;
          if ('isValid' in validatedFields?.[fieldId]) {
            if (!validatedFields?.[fieldId].isValid) {
              this.refs[fieldId].setError(validatedFields[fieldId].message);
            }
          }
        });
        const isFormValid = Object.values(validatedFields).every(
          (field) => field.isValid
        );
        if (isFormValid) {
          const signupData = omit(inputValues, ['repeat_password']);
          AuthController.signup(signupData);
        }
      },
    };
    this.state = state;
  }

  render(): string {
    return `<main class="signup-page">
            <section class="signup-form__wrapper">
              <form class="signup-form">
                <h1 class="signup-form__title">Регистрация</h1>
                {{#each signupFields}}
                  {{{Input placeholder=placeholder id=id type=type errorMessage=errorMessage isError=isError value=value ref=id onFocus=onFocus onBlur=onBlur}}}
                {{/each}}
                {{{Button text="Зарегистрироваться" modificator="blue" onClick=onSignup}}}
                {{{RouterLink href="/" label="Или все-таки есть аккаунт?" class="signup-form__registration-link"}}}
              </form>
            </section>
          </main>`;
  }
}
