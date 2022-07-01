import { Block, router } from 'core';
import '../styles/pages/errorPage.scss';

class NotFoundPage extends Block {
    static componentName = 'NotFoundPage';

    constructor() {
        super({
            onClick: () => router.go('/messenger'),
        });
    }

    render() {
        // language=hbs
        return `
            <main class="main">
                <h1 class="title">404</h1>
                <p class="desc">Не туда попали</p>
                {{{ Button text="Назад к чатам" variant="transparent" onClick=onClick }}}
            </main>
        `;
    }
}

export default NotFoundPage;
