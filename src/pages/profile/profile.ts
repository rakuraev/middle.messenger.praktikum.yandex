import Block from '../../core/Block/Block';
import './profile.css';
import './components';

const state: ProfilePageProps = {
  img: {
    src: 'https://memepedia.ru/wp-content/uploads/2021/08/maxresdefault.jpg',
    alt: 'Аватар пользователя',
  },
  name: 'Иван Резня',
  profileInfo: [
    { label: 'Имя', value: 'Иван' },
    { label: 'Фамилия', value: 'Резня' },
    { label: 'Имя в чате', value: 'Иван Резня' },
    { label: 'Телефон', value: '79999999999' },
    { label: 'Почта', value: 'email@example.ru' },
    { label: 'Логин', value: 'ivanmassacre' },
  ],
};
export default class ProfilePage extends Block<ProfilePageProps> {
  getStateFromProps() {
    this.state = state;
  }

  render() {
    return `<main class="profile-page">
              <nav class="profile-page__back">
                <a href="#" class="profile-page__link">
                  <div class="profile-page__back-icon">
                    <div class="profile-page__back-arrow"></div>
                  </div>
                </a>
              </nav>
              <section class="profile-info__wrapper">
                <div class="profile-info">
                  <div class="profile-info__picture">
                    {{{Photo img=img}}}
                  </div>
                  <div class="profile-info__name">{{name}}</div>
                  <ul class="profile-info__info-list">
                    {{#each profileInfo}}
                      <li class="profile-info__item">
                        <label class="profile-info__label">{{label}}</label>
                        <input class="profile-info__input" disabled type="text" value="{{value}}" />
                      </li>
                    {{/each}}
                  </ul>
                  <ul class="profile-info__change-info">
                    <li class="profile-info__item">
                      <a class="profile-info__item-link" href="#">Изменить данные</a>
                    </li>
                    <li class="profile-info__item">
                      <a class="profile-info__item-link" href="#">Изменить пароль</a>
                    </li>
                    <li class="profile-info__item profile-info__item_danger">
                      <a class="profile-info__item-link" href="#">Выйти</a>
                    </li>
                  </ul>
                </div>
              </section>
            </main>`;
  }
}