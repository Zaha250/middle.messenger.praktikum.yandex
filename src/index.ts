import * as components from 'components';
import {BlockConstructable, registerComponent, Router} from './core';
import './styles/index.scss';

Object.values(components).forEach((Component: BlockConstructable) => {
    registerComponent(Component);
});

document.addEventListener('DOMContentLoaded', () => {
    new Router().push('/');
});
