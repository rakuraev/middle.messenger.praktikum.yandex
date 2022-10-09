import { Block } from './Block/Block';
export default function renderDOM(block: Block) {
  const root = document.querySelector('#app');
  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}
