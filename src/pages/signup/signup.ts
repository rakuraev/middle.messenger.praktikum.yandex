import Block from '../../core/Block/Block';
import './signup.css';
const state = {
  signupFields: [
    {
      placeholder: 'Почта',
      id: 'email',
      type: 'text',
      errorMessage: 'Почта уже сушествует',
    },
    {
      placeholder: 'Логин',
      id: 'login',
      type: 'text',
      errorMessage: 'Логин уже существует',
    },
    {
      placeholder: 'Имя',
      id: 'first_name',
      type: 'text',
      errorMessage: '',
    },
    {
      placeholder: 'Фамилия',
      id: 'last_name',
      type: 'text',
      errorMessage: '',
    },
    {
      placeholder: 'Пароль',
      id: 'password',
      type: 'password',
      errorMessage: 'Пароль неверный',
    },
    {
      placeholder: 'И еще разочек Пароль',
      id: 'password_repeat',
      type: 'password',
      errorMessage: 'Пароли не совпадают',
    },
  ],
};
// TODO добавить валидацию(Пока не успел, прощу прощения🥲)
export default class SignUpPage extends Block {
  protected getStateFromProps(): void {
    this.state = { ...state };
  }

  protected render(): string {
    return `<main class="signup-page">
            <section class="signup-form__wrapper">
              <form class="signup-form">
                <h1 class="signup-form__title">Регистрация</h1>
                {{#each signupFields}}
                  {{{Input placeholder=placeholder id=id type=type errorMesage=errorMessage}}}
                {{/each}}
                {{{Button text="Зарегистрироваться" modificator="blue"}}}
                <a class="signup-form__registration-link" href="/">Или все-таки есть аккаунт?</a>
              </form>
            </section>
          </main>`;
  }
}
