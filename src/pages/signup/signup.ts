import Block from '../../core/Block/Block';
import validateString, {
  FormFieldTypes,
  validateIsSame,
} from '../../utils/validate';
import './signup.css';

export default class SignupPage extends Block<SignupProps> {
  protected getStateFromProps(): void {
    const onFocus = (event: Event) => {
      const template = (event?.target as HTMLElement).parentNode as HTMLElement;
      template.classList.remove('p-input_error');
    };
    const onBlur = (event: Event) => {
      const id = (event.target as HTMLInputElement).id as SignupFieldsId;
      const inputElement = this.refs?.[id].querySelector(
        `#${id}`
      ) as HTMLInputElement;
      const signupFields = { ...this.state }.signupFields as SignupFields;
      const currentField = signupFields.find(
        (field) => field.id === id
      ) as IInput;
      let validateField;
      if (id === 'repeatPassword') {
        const passwordInputValue = (
          this.refs.password.querySelector('#password') as HTMLInputElement
        ).value;
        validateField = validateIsSame(
          inputElement.value,
          passwordInputValue,
          FormFieldTypes.repeatPassword
        );
      } else {
        validateField = validateString(inputElement.value, FormFieldTypes[id]);
      }
      currentField.isError = !validateField.isValid;
      currentField.errorMessage = validateField.message;
      currentField.value = validateField.value;
      this.setState({ signupFields });
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
          id: 'lastName',
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
          email: (this.refs.email.querySelector('#email') as HTMLInputElement)
            ?.value,
          login: (this.refs.login.querySelector('#login') as HTMLInputElement)
            ?.value,
          firstName: (
            this.refs.login.querySelector('#firstName') as HTMLInputElement
          )?.value,
          lastName: (
            this.refs.lastName.querySelector('#lastName') as HTMLInputElement
          )?.value,
          password: (
            this.refs.password.querySelector('#password') as HTMLInputElement
          )?.value,
          repeatPassword: (
            this.refs.repeatPassword.querySelector(
              '#repeatPassword'
            ) as HTMLInputElement
          )?.value,
        };

        const validatedFields: Record<string, ValidateOutput> = {
          email: validateString(inputValues.email, FormFieldTypes.email),
          login: validateString(inputValues.login, FormFieldTypes.login),
          password: validateString(
            inputValues.password,
            FormFieldTypes.password
          ),
          firstName: validateString(
            inputValues.firstName,
            FormFieldTypes.firstName
          ),
          lastName: validateString(
            inputValues.lastName,
            FormFieldTypes.lastName
          ),
          repeatPassword: validateIsSame(
            inputValues.repeatPassword,
            inputValues.password,
            FormFieldTypes.repeatPassword
          ),
        };
        const nextInputFields = state.signupFields.map((field) => {
          if (field.id in validatedFields) {
            const validatedField = validatedFields?.[field.id];
            if (!validatedField.isValid) {
              field.isError = true;
              field.errorMessage = validatedField.message;
            } else {
              field.isError = false;
              field.errorMessage = '';
            }
            field.value = validatedField.value;
          }
          return field;
        });
        this.setState({ signupFields: nextInputFields });
        console.log(inputValues);
      },
    };
    this.state = state;
  }

  protected render(): string {
    return `<main class="signup-page">
            <section class="signup-form__wrapper">
              <form class="signup-form">
                <h1 class="signup-form__title">Регистрация</h1>
                {{#each signupFields}}
                  {{{Input placeholder=placeholder id=id type=type errorMessage=errorMessage isError=isError value=value ref=id onFocus=onFocus onBlur=onBlur}}}
                {{/each}}
                {{{Button text="Зарегистрироваться" modificator="blue" onClick=onSignup}}}
                <a class="signup-form__registration-link" href="/">Или все-таки есть аккаунт?</a>
              </form>
            </section>
          </main>`;
  }
}
