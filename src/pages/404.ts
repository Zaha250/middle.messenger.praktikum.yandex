import { Block } from 'core';
import '../styles/pages/errorPage.scss';

class NotFoundPage extends Block {
    static componentName = 'NotFoundPage';

    render() {
        // language=hbs
        return `
            <main class="main">
                <h1 class="title">404</h1>
                <p class="desc">Не туда попали</p>
                <a href="index.hbs" class="link">Назад к чатам</a>
            </main>
        `;
    }
}

export default NotFoundPage;
