import Block from './Block/Block';

export default function renderDOM(block: Block<BlockProps>, rootQuery: string = "#app") {
  const root = <HTMLElement>document.querySelector(rootQuery);
  const content = block.getContent();
  if (content) {
    root.appendChild(content);
  }
}
