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
    super({
      ...restProps,
      href,
      events: { click: onLinkClick },
    });
  }

  render(): string {
    return '<a {{#if href}}href="{{href}}"{{/if}} {{#if class}}class="{{class}}"{{/if}} slot>{{#if label}}{{label}}{{/if}} </a>';
  }
}
