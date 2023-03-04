import registerComponent from 'shared/lib/registerComponents';
import Input from './Input';
import Button from './Button';
import SvgTemplate from './SvgTemplate';
import Link from './Link/link';
import RouterLink from './Link/routerLink';

export default () => {
  registerComponent(Input);
  registerComponent(Button);
  registerComponent(SvgTemplate);
  registerComponent(Link);
  registerComponent(RouterLink);
};

export { Input, Button };
