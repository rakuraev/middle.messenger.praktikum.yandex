import './login.css';
import Block from '../../core/Block/Block';
import validateString, { FORM_FIELDS_TYPES } from '../../utils/validate';
type loginFieldsId = 'password' | 'login';
export default class LoginPage extends Block {
  protected getStateFromProps() {
    const onFocus = (event: Event) => {
      const template = (event?.target as HTMLElement).parentNode as HTMLElement;
      template.classList.remove('p-input_error');
    };
    const onBlur = (event: Event) => {
      const id = (event.target as HTMLInputElement).id as loginFieldsId;
      const inputElement = this.refs?.[id].querySelector(
        `#${id}`
      ) as HTMLInputElement;
      const loginFields = { ...this.state }.loginFields as loginFields;
      const currentField = loginFields.find(
        (field) => field.id === id
      ) as IInputProps;
      const validateField = validateString(
        inputElement.value,
        FORM_FIELDS_TYPES[id]
      );
      currentField.isError = !validateField.isValid;
      currentField.errorMessage = validateField.message;
      currentField.value = validateField.value;
      this.setState({ loginFields });
    };

    const state: ILoginPageState = {
      loginFields: [
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
          placeholder: 'Пароль',
          id: 'password',
          type: 'password',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur,
        },
      ],
    };
    this.state = {
      ...state,
      onLogin: () => {
        const inputValues = {
          login: (this.refs.login.querySelector('#login') as HTMLInputElement)
            ?.value,
          password: (
            this.refs.password.querySelector('#password') as HTMLInputElement
          )?.value,
        };
        if ('loginFields' in state) {
          const validatedFields: Record<string, ValidateOutput> = {
            login: validateString(inputValues.login, FORM_FIELDS_TYPES.login),
            password: validateString(
              inputValues.password,
              FORM_FIELDS_TYPES.password
            ),
          };
          const nextInputFields = state.loginFields.map((field) => {
            const fieldId = field.id;
            if (fieldId in validatedFields) {
              const validatedField = validatedFields?.[fieldId];
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
          this.setState({ loginFields: nextInputFields });
          console.log(inputValues);
        }
      },
    };
  }

  render() {
    return `
        <main class="login-page">
          <section class="login-form__wrapper">
            <form class="login-form">
              <h1 class="login-form__title">Вход</h1>
              {{#each loginFields}}
                {{{Input placeholder=placeholder id=id type=type errorMessage=errorMessage isError=isError value=value ref=id onFocus=onFocus onBlur=onBlur}}}
              {{/each}}
              {{{Button text="Авторизоваться" modificator="blue" onClick=onLogin}}}
              <a class="login-form__registration-link" href="/signup">Нет аккаунта?</a>
            </form>
          </section>
        </main>`;
  }
}
