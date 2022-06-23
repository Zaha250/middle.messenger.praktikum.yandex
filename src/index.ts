import * as components from 'components';
import { BlockConstructable, registerComponent, Router } from 'core';
import AuthPage from 'pages/auth';
import Messenger from './pages/messenger';
import ProfilePage from './pages/profile';
import RegPage from './pages/reg';
import NotFoundPage from './pages/404';
import ServerErrorPage from './pages/500';
import './styles/index.scss';

const router = new Router('#app');

Object.values(components).forEach((Component: BlockConstructable) => {
    registerComponent(Component);
});

document.addEventListener('DOMContentLoaded', () => {
    router
        .use('/', Messenger)
        .use('/auth', AuthPage)
        .use('/reg', RegPage)
        .use('/profile', ProfilePage)
        .use('/404', NotFoundPage)
        .use('/500', ServerErrorPage)
        .start();
});
