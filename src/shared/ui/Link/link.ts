// import Block from '../../core/Block/Block';
import { Router } from 'shared/lib/core';
import { Block } from 'shared/lib/core';

const router = new Router();
export class Link extends Block<LinkProps> {
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
