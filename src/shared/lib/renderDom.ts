import { Block } from 'shared/lib/core';

export function renderDOM(block: Block<BlockProps>, rootQuery: string) {
  const root = <HTMLElement>document.querySelector(rootQuery);
  const content = block.getContent();
  if (content) {
    root.appendChild(content);
  }
}
