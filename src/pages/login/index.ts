import state from './state';
import './login.css';
import Block from '../../core/Block/Block';
import validateString, { FORM_FIELDS_TYPES } from '../../utils/validate';

export default class LoginPage extends Block {
  protected getStateFromProps() {
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
            login: validateString(inputValues.login, FORM_FIELDS_TYPES.LOGIN),
            password: validateString(
              inputValues.password,
              FORM_FIELDS_TYPES.PASSWORD
            ),
          };
          const nextInputFields = state.loginFields.map((field) => {
            const fieldId = field.id;
            if (fieldId in validatedFields) {
              const validatedField = validatedFields?.[fieldId];
              if (!validatedField.isValid) {
                field.error = validatedField.message;
              } else {
                field.error = '';
              }
              field.value = validatedField.value;
            }
            return field;
          });
          this.setState({ loginFields: nextInputFields });
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
                {{{Input placeholder=placeholder id=id type=type error=error value=value ref=id}}}
              {{/each}}
              {{{Button text="Авторизоваться" modificator="blue" onClick=onLogin}}}
              <a class="login-form__registration-link" href="/signup">Нет аккаунта?</a>
            </form>
          </section>
        </main>`;
  }
}
