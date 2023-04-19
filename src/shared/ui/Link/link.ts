import { Block, Router } from 'shared/lib/core';
import { withRouter } from 'shared/lib/decorators';
type LinkProps = {
  href?: string;
  class?: string;
  label?: string;
  events?: BlockEvents;
  router?: Router;
  onClick?: () => void;
};

@withRouter
export class Link extends Block<LinkProps> {
  static _name = 'Link';

  constructor({ onClick, href, ...restProps }: LinkProps) {
    const onLinkClick = (e: Event) => {
      e.preventDefault();
      if (onClick) {
        onClick();
      } else {
        if (href) {
          this.props?.router?.go(href);
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
    return '<a {{#if href}}href="{{href}}"{{/if}} {{#if class}}class="{{class}}"{{/if}} slot>{{#if label}}{{label}}{{/if}}</a>';
  }
}
