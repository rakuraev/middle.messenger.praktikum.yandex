export default function renderDOM(block: IBlock) {
  const root = <HTMLElement>document.querySelector('#app');
  root.innerHTML = '';
  root.appendChild(block.getContent());
}
