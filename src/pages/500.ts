import { Block } from '../core';
import '../styles/pages/errorPage.scss';

class ServerErrorPage extends Block {
    static componentName = 'ServerErrorPage';

    render() {
        // language=hbs
        return `
            <main class="main">
                <h1 class="title">500</h1>
                <p class="desc">Уже исправляем</p>
                <a href="index.hbs" class="link">Назад к чатам</a>
            </main>
        `;
    }
}

export default ServerErrorPage;
