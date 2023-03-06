import { UserController } from 'entities/User';
import { API_BASE_URL_RES } from 'shared/config';
import { Block } from 'shared/lib/core';
import { Toast, useToast } from 'shared/lib/toast';
import './photo.css';
type PhotoProps = {
  toast: Toast;
  src: Nullable<string>;
  alt: string;
  events: {
    change: (e: Event) => void;
  };
};
export default class Photo extends Block<PhotoProps> {
  static _name = 'Photo';

  constructor(props: IPhoto) {
    const toast = useToast;
    const onInput = async (e: Event) => {
      const avatar = (<HTMLInputElement>e.target).files?.[0];
      if (avatar) {
        try {
          await UserController.updateAvatar(avatar);
          this.state.toast.success('Success');
        } catch (reason) {
          if (typeof reason === 'string') {
            this.state.toast.error(reason);
          }
        }
      } else {
        this.state.toast.error('Something went wrong');
      }
    };
    super({ ...props.img, toast, events: { change: onInput } });
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
