import Block from '../../../../core/Block/Block';
import './photo.css';

export default class Photo extends Block<PhotoProps> {
  static _name = 'Photo';

  constructor(props: IPhoto) {
    super({ ...props.img });
  }

  render() {
    return `<div class="photo-wrapper">
            {{#if src}}
              <img src="{{src}}" alt={{alt}}>
            {{else}}
              <img src="/static/img/svg/Profile.svg" alt={{alt}}>
            {{/if}}
              <div class="photo__change">Поменять аватар</div>
          </div>`;
  }
}
