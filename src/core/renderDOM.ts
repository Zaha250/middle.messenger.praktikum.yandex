import Block from './Block';

export default function renderDOM(selector: string, component: Block) {
    const root = document.querySelector(selector);

    if (root) {
        root.innerHTML = '';
        root.appendChild(component.getContent());
    }
}
