import { Block } from '../core';
import '../styles/pages/messenger.scss';
import '../components/blocks/chatList/chatList.scss';

interface IMessengerProps {
    dialogId?: string | number;
}

class Messenger extends Block {
    static componentName = 'Messenger';

    constructor(props: IMessengerProps) {
        super({...props});
    }
    render() {
        // language=hbs
        return `
            <div class="messenger-wrapper">
                {{{ ChatList }}}
                {{#if dialogId}}
                    {{{ Dialog dialogId=dialogId }}}
                {{else}}
                    <main class="messenger-placeholder">
                        <h5 class="messenger-placeholder__text">Выберите чат чтобы отправить сообщение</h5>
                    </main>
                {{/if}}
            </div>
        `;
    }
}

export default Messenger;
