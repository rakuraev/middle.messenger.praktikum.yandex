import registerComponent from '../core/registerComponents';
import Input from './Input';
import Button from './Button';
import SvgTemplate from './SvgTemplate';
import RouterLink from './RourerLink/routerLink';

export default () => {
  registerComponent(Input);
  registerComponent(Button);
  registerComponent(SvgTemplate);
  registerComponent(RouterLink);
};
