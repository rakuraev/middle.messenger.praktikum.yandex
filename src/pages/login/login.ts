import './login.css';
import { AuthController } from 'entities/Auth';
import { Block } from 'shared/lib/core';
import { withStore } from 'shared/lib/decorators';
import validateString, { FormFieldTypes } from 'shared/lib/validate';
import Input from 'shared/ui/Input';

type LoginPageProps = {
  router?: IRouter;
  loginFields: LoginFields;
  onLogin: () => void;
};

type LoginPageRefs = {
  login: Input;
  password: Input;
};
@withStore()
class LoginPage extends Block<LoginPageProps, LoginPageRefs> {
  getStateFromProps() {
    const onFocus = (event: Event) => {
      const id = (event.target as HTMLInputElement).id as LoginFieldsId;
      this.refs[id].hideError();
    };
    const onBlur = (event: Event) => {
      const id = (event.target as HTMLInputElement).id as LoginFieldsId;
      const currentRef = this.refs[id];
      const validateField = validateString(
        currentRef.getValue(),
        FormFieldTypes[id]
      );
      if (!validateField.isValid) {
        currentRef.setError(validateField.message);
      }
    };
    const state: LoginPageProps = {
      loginFields: [
        {
          placeholder: 'Логин',
          id: 'login',
          name: 'login',
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
          name: 'password',
          type: 'password',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur,
        },
      ],
      onLogin: () => {
        const inputValues: SigninData = {
          login: this.refs.login.getValue(),
          password: this.refs.password.getValue(),
        };
        const validatedFields: Record<string, ValidateOutput> = {
          login: validateString(inputValues.login, FormFieldTypes.login),
          password: validateString(
            inputValues.password,
            FormFieldTypes.password
          ),
        };
        const nextInputFields = state.loginFields.map((field) => {
          const fieldId = field.id as LoginFieldsId;
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
          AuthController.signin(inputValues);
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
                {{{Input placeholder=placeholder id=id type=type name=name errorMessage=errorMessage isError=isError value=value ref=id onFocus=onFocus onBlur=onBlur}}}
              {{/each}}
              {{{Button text="Авторизоваться" modificator="blue" onClick=onLogin}}}
              {{{RouterLink href="/signup" label="Нет акаунта?" class="login-form__registration-link"}}}
            </form>
          </section>
        </main>`;
  }
}

export default LoginPage;
