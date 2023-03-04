import { AuthController } from 'entities/Auth';
import { StateKeys } from 'shared/config';
import { Block } from 'shared/lib/core';
import { withRouter, withStore } from 'shared/lib/decorators';
import { ChangePassword } from './components';
import './profile.css';
import './components';

type ProfilePageRef = {
  changePasswordMW: ChangePassword;
};

@withRouter
@withStore(StateKeys.User)
export default class ProfilePage extends Block<
  ProfilePageProps,
  ProfilePageRef
> {
  getStateFromProps(props: any) {
    const state: ProfilePageProps = {
      img: {
        src: () => this.props.user?.avatar || null,
        alt: 'Аватар пользователя',
      },
      name: () =>
        this.props.user
          ? `${this.props.user?.first_name} ${this.props.user?.second_name}`
          : ' ',
      profileInfo: [
        {
          label: 'Имя',
          value: () => this.props.user?.first_name,
        },
        { label: 'Фамилия', value: () => this.props.user?.second_name },
        { label: 'Имя в чате', value: () => this.props.user?.display_name },
        { label: 'Телефон', value: () => this.props.user?.phone },
        { label: 'Почта', value: () => this.props.user?.email },
        { label: 'Логин', value: () => this.props.user?.login },
      ],

      onLogout() {
        AuthController.logout();
      },
      changePassword: () => {
        this.refs.changePasswordMW.showModal();
      },
      backLinkSlot: () => {
        return `<div class="profile-page__back-icon">
                 <div class="profile-page__back-arrow"></div>
                </div>`;
      },
    };
    this.state = { ...props, ...state };
  }

  render() {
    return `<main class="profile-page">
              <nav class="profile-page__back">
              {{{Link href="/messenger" class="profile-page__link" slot=backLinkSlot}}}
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
                    {{{Link href="/" label="Изменить пароль" class="profile-info__item-link" onClick=changePassword}}}
                    </li>
                    <li class="profile-info__item profile-info__item_danger">
                      {{{Link href="/" label="Выйти" class="profile-info__item-link" onClick=onLogout}}}
                    </li>
                  </ul>
                </div>
              </section>
                 {{{ChangePassword ref="changePasswordMW"}}}
              </main>
            `;
  }
}
