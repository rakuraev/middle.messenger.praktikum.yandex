import Block from '../../core/Block/Block';
import Router from '../../core/Router/Router';

type RouterLinkProps = {
  href: string;
  class: string;
  label: string;
  events?: {
    click: (e: Event) => void;
  };
};
export default class RouterLink extends Block<RouterLinkProps> {
  static _name = 'RouterLink';
  constructor(props: RouterLinkProps) {
    const router = new Router();
    const onClick = (e: Event) => {
      e.preventDefault();
      router.go(props.href);
    };
    super({ ...props, events: { click: onClick } });
  }
  protected render(): string {
    return `<a href="{{href}}" class="{{class}}">{{label}}</a>`;
  }
}
