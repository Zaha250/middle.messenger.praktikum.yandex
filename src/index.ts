import * as components from 'components';
import { BlockConstructable, registerComponent, renderDOM, Router } from 'core';
import { initApp } from 'services/InitApp';
import AuthPage from 'pages/auth';
import Messenger from './pages/messenger';
import ProfilePage from './pages/profile';
import RegPage from './pages/reg';
import NotFoundPage from './pages/404';
import { Store, rootState, StoreEvents } from './store';
import './styles/index.scss';

Object.values(components).forEach((Component: BlockConstructable) => {
    registerComponent(Component);
});

document.addEventListener('DOMContentLoaded', () => {
    const router = new Router('#app');
    const store = new Store(rootState);

    store.on(StoreEvents.Updated, (prevState, nextState) => {
        if (prevState.page !== nextState.page) {
            const Page = nextState.page;
            renderDOM('#app', new Page({}));
        }
    });

    console.log(store);

    router
        .use('/', Messenger)
        .use('/auth', AuthPage)
        .use('/reg', RegPage)
        .use('/profile', ProfilePage)
        .use('*', NotFoundPage)
        .start();

    // store.dispatch(initApp);
});
