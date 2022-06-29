import * as components from 'components';
import { BlockConstructable, registerComponent, renderDOM, Router } from 'core';
import { initApp } from 'services/InitApp';
import AuthPage from 'pages/auth';
import Messenger from './pages/messenger';
import ProfilePage from './pages/profile';
import RegPage from './pages/reg';
import NotFoundPage from './pages/404';
import { store } from './store';
import './styles/index.scss';

Object.values(components).forEach((Component: BlockConstructable) => {
    registerComponent(Component);
});

document.addEventListener('DOMContentLoaded', () => {
    const router = new Router('#app');

    store.on('changed', (prevState, nextState) => {
        if (prevState.page !== nextState.page) {
            console.log('change page');
            const Page = nextState.page;
            renderDOM('#app', new Page({}));
        }
    });

    router
        .use('/', AuthPage)
        .use('/messenger', Messenger)
        .use('/sign-up', RegPage)
        .use('/settings', ProfilePage)
        .use('*', NotFoundPage)
        .start();

    // store.dispatch(initApp);
});
