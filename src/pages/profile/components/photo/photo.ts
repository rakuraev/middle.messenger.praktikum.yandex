import Block from '../../../../core/Block/Block';
import './photo.css';

export default class Photo extends Block {
  // TODO Типизировтать
  static _name = 'Photo';

  constructor(props: BlockProps) {
    const PhotoProps = props;
    super(PhotoProps);
  }

  render() {
    return `<div class="photo-wrapper">
            {{#if src}}
              <img src="{{src}}" />
            {{else}}
              <img src="/static/img/svg/Profile.svg" />
            {{/if}}
              <div class="photo__change">Поменять аватар</div>
          </div>`;
  }
}
