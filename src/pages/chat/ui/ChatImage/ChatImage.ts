import { API_BASE_URL_RES } from 'shared/config';
import { Block } from 'shared/lib/core';
import './chatImage.css';

interface IChatImageProps {
  file: FileData;
  src: string;
}

export class ChatImage extends Block<IChatImageProps> {
  static _name = 'ChatImage';

  bindedOnLoad: Nullable<(e: Event) => void> = null;

  constructor(props: IChatImageProps) {
    const src = API_BASE_URL_RES + props.file.path;
    super({ ...props, src });
    this.bindedOnLoad = this.onLoad.bind(this);
  }

  showImage() {
    this.element?.classList.add('chat-image_show');
  }

  onLoad = () => {
    console.log('pisya');
    this.showImage();
  };

  addOnLoad() {
    const imgElement = this.element?.querySelector('.chat-image__image');
    if (imgElement && this.bindedOnLoad) {
      imgElement.addEventListener('load', this.bindedOnLoad);
    }
  }

  removeOnLoad() {
    const imgElement = this.element?.querySelector('.chat-image__image');
    if (imgElement && this.bindedOnLoad) {
      imgElement.removeEventListener('load', this.bindedOnLoad);
    }
  }

  componentBeforeMount() {
    this.addOnLoad();
  }

  componentBeforeUnmount() {
    this.removeOnLoad();
  }

  render() {
    return `<div class="chat-image">
              <div class="chat-image__spinner">{{{Spinner}}}</div>
              <img class="chat-image__image" src="{{src}}"/>
            </div>`;
  }
}
