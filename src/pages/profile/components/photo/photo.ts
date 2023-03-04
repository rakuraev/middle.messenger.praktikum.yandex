import { UserController } from 'entities/User';
import { API_BASE_URL_RES } from 'shared/config';
import { Block } from 'shared/lib/core';
import './photo.css';

export default class Photo extends Block<PhotoProps> {
  static _name = 'Photo';

  constructor(props: IPhoto) {
    const onInput = async (e: Event) => {
      const avatar = (<HTMLInputElement>e.target).files?.[0];
      if (avatar) {
        try {
          await UserController.updateAvatar(avatar);
        } catch (e) {
          console.error(e);
        }
      } else {
        console.error('Error on update avatar');
      }
    };
    super({ ...props.img, events: { change: onInput } });
  }

  render() {
    return `<div class="photo-wrapper">
            {{#if src}}
              <img src="${API_BASE_URL_RES}{{src}}" alt="{{alt}}">
            {{else}}
              <img src="/static/img/svg/Profile.svg" alt="{{alt}}">
            {{/if}}
              <div class="photo__change">Поменять аватар</div>
              <input class="photo__file-input" type="file" accept=".jpg, .jpeg, .png" />
          </div>`;
  }
}
