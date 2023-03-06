import registerComponent from 'shared/lib/registerComponents';
import Button from './Button';
import Input from './Input';
import { Layout } from './Layout';
import { Link, RouterLink } from './Link';
import SvgTemplate from './SvgTemplate';
import { ToastComponent } from './Toast';

export default () => {
  registerComponent(Input);
  registerComponent(Button);
  registerComponent(SvgTemplate);
  registerComponent(Link);
  registerComponent(RouterLink);
  registerComponent(Layout);
};

export { Input, Button, ToastComponent };
