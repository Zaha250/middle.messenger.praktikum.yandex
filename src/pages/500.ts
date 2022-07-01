import { Block, router } from 'core';
import '../styles/pages/errorPage.scss';

class ServerErrorPage extends Block {
    static componentName = 'ServerErrorPage';

    constructor() {
        super({
            onClick: () => router.go('/messenger'),
        });
    }

    render() {
        // language=hbs
        return `
            <main class="main">
                <h1 class="title">500</h1>
                <p class="desc">Уже исправляем</p>
                {{{ Button text="Назад к чатам" variant="transparent" onClick=onClick }}}
            </main>
        `;
    }
}

export default ServerErrorPage;
