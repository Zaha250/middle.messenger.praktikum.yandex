import * as components from 'components';
import { BlockConstructable, registerComponent, renderDOM } from 'core';
import Messenger from 'pages/messenger';
import ProfilePage from 'pages/profile';
import AuthPage from 'pages/auth';
import NotFoundPage from 'pages/404';
import ServerErrorPage from 'pages/500';
import RegPage from 'pages/reg';
import './styles/index.scss';

Object.values(components).forEach((Component: BlockConstructable) => {
    registerComponent(Component);
});

document.addEventListener('DOMContentLoaded', () => {
    renderDOM('#app', new Messenger({ dialogId: 1 }));
    // renderDOM('#app', new ProfilePage({}));
    // renderDOM('#app', new AuthPage({}));
    // renderDOM('#app', new RegPage());
    // renderDOM('#app', new NotFoundPage());
    // renderDOM('#app', new ServerErrorPage());
    // renderDOM('#app', new ServerErrorPage());
});
