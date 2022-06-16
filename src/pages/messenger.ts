import { Block } from '../core';
import '../styles/pages/messenger.scss';
import '../components/blocks/Dialogs/dialogs.scss';

class Messenger extends Block {
    render() {
        // language=hbs
        return `
            <div class="messenger-wrapper">
                {{{ Dialogs }}}
                <main class="messenger-placeholder">
                    <h5 class="messenger-placeholder__text">Выберите чат чтобы отправить сообщение</h5>
                </main>
            </div>
        `;
    }
}

export default Messenger;
