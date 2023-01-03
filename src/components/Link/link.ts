import Block from '../../core/Block/Block';

export default class Link extends Block<LinkProps> {
  static _name = 'Link';
  constructor({ onClick, ...restProps }: ILink) {
    const onLinkClick = (e: Event) => {
      e.preventDefault();
      onClick();
    };
    super({ ...restProps, events: { click: onLinkClick } });
  }
  render(): string {
    return `<a {{#if href}}href="{{href}}"{{/if}} {{#if class}}class="{{class}}"{{/if}}>{{label}}</a>`;
  }
}
