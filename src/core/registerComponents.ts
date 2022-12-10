/* eslint-disable @typescript-eslint/no-explicit-any */
import Block from './Block/Block';
import Handlebars, { HelperOptions } from 'handlebars';

interface BlockConstructable<P extends BlockProps> {
  new (props: P): Block<P>
  _name: string;
}

export default function registerComponent<P extends BlockProps>(Component: BlockConstructable<P>) {
  Handlebars.registerHelper(
    Component._name,
    function (
      this: BlockProps,
      { hash: { ref, ...hash }, data, fn }: HelperOptions
    ) {
      if (!data.root.children) {
        data.root.children = {};
      }
      if (!data.root.refs) {
        data.root.refs = {};
      }
      const { children, refs } = data.root;
      (Object.keys(hash) as any).forEach((key: keyof BlockProps) => {
        if (this[key] && typeof this[key] === 'string') {
          hash[key] = hash[key].replace(
            new RegExp(`{{${String(key)}}}`, 'i'),
            this[key]
          );
        }
      });
      const component = new Component(hash);
      children[component.id] = component;
      if (ref) {
        refs[ref] = component.getContent();
      }

      const contents = fn ? fn(this) : '';

      return `<div data-id="${component.id}">${contents}</div>`;
    }
  );
}
