import './login.css';
import Block from '../../core/Block/Block';
import validateString, { FormFieldTypes } from '../../utils/validate';
import Router from '../../core/Router/Router';
type LoginPageProps = {
  router?: IRouter;
  loginFields: LoginFields;
  onLogin: () => void;
};

class LoginPage extends Block<LoginPageProps> {
  protected getStateFromProps() {
    const router = new Router();

    const onFocus = (event: Event) => {
      const template = (event?.target as HTMLElement).parentNode as HTMLElement;
      template.classList.remove('p-input_error');
    };
    const onBlur = (event: Event) => {
      const id = (event.target as HTMLInputElement).id as LoginFieldsId;
      const inputElement = this.refs?.[id].querySelector(
        `#${id}`
      ) as HTMLInputElement;
      const loginFields = { ...this.state }.loginFields as LoginFields;
      const currentField = loginFields.find(
        (field) => field.id === id
      ) as IInput;
      const validateField = validateString(
        inputElement.value,
        FormFieldTypes[id]
      );
      currentField.isError = !validateField.isValid;
      currentField.errorMessage = validateField.message;
      currentField.value = validateField.value;
      this.setState({ loginFields });
    };
    const state: LoginPageProps = {
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
            login: validateString(inputValues.login, FormFieldTypes.login),
            password: validateString(
              inputValues.password,
              FormFieldTypes.password
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
          const isFormValid = nextInputFields.some((field) => !field.isError);
          if (isFormValid) {
            console.log(this.state);
            router.go('/messenger')
          } else {
            this.setState({ loginFields: nextInputFields });
          }
        }
      },
    };
    this.state = state;
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
              {{{RouterLink href="/signup" label="Нет акаунта?" class="login-form__registration-link"}}}
            </form>
          </section>
        </main>`;
  }
}

export default LoginPage;
