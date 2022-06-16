import * as components from 'components';
import { BlockConstructable, registerComponent, renderDOM } from './core';
import RegPage from './pages/reg';
import './styles/index.scss';

Object.values(components).forEach((Component: BlockConstructable) => {
    registerComponent(Component);
});

document.addEventListener('DOMContentLoaded', () => {
    renderDOM('#app', new RegPage({}));
});
