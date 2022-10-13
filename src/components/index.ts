import registerComponent from '../core/registerComponents';
import Input from './Input';
import Button from './Button';
import SvgTemplate from './SvgTemplate';

export default () => {
  registerComponent(Input);
  registerComponent(Button);
  registerComponent(SvgTemplate);
};
