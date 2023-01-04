// import Block from '../../core/Block/Block';
import Router from '../../core/Router/Router';
import Block from '../../core/Block/Block';

const router = new Router();
export default class Link extends Block<LinkProps> {
  static _name = 'Link';
  constructor({ onClick, href, slot, ...restProps }: ILink) {
    const onLinkClick = (e: Event) => {
      e.preventDefault();
      if (onClick) {
        onClick();
      } else {
        if (href) {
          router.go(href);
        }
      }
    };
    let slotTemplate = '';
    if (slot) {
      slotTemplate = slot();
    }
    super({
      ...restProps,
      href,
      slot: slotTemplate,
      events: { click: onLinkClick },
    });
  }
  render(): string {
    return `<a {{#if href}}href="{{href}}"{{/if}} {{#if class}}class="{{class}}"{{/if}}>{{#if label}}{{label}}{{/if}} {{#if slot}}${this.state.slot}{{/if}}</a>`;
  }
}
