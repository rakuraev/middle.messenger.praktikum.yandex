import Handlebars, { HelperOptions } from 'handlebars';
import registerComponent from 'shared/lib/registerComponents';
import Button from './Button';
import Input from './Input';
import { Layout } from './Layout';
import { Link, RouterLink } from './Link';
import { ModalWindow } from './ModalWindow';
import { Spinner } from './Spinner';
import SvgTemplate from './SvgTemplate';
import { ToastComponent } from './Toast';
import { Tooltip } from './Tooltip';

const registerLayout = () => {
  Handlebars.registerHelper(
    Layout._name,
    function (this: unknown, { fn }: HelperOptions) {
      if (fn) {
        const contents = fn(this);
        const layoutContents = new Layout().getContent();
        if (layoutContents) {
          const layoutSlot = layoutContents.querySelector('[slot]');
          if (layoutSlot) {
            layoutSlot.innerHTML = contents;
            layoutSlot.removeAttribute('slot');
          }
          return layoutContents.outerHTML;
        }
        return fn(this);
      }
    }
  );
};

export default () => {
  registerComponent(Input);
  registerComponent(Button);
  registerComponent(SvgTemplate);
  registerComponent(Link);
  registerComponent(RouterLink);
  registerComponent(Tooltip);
  registerComponent(Spinner);
  registerComponent(ModalWindow);
  registerLayout();
};

export { Input, Button, ToastComponent, Tooltip, ModalWindow };
