import { Block } from 'core';
import 'components/blocks/chatList/chatList.scss';
import '../styles/pages/messenger.scss';

interface IMessengerProps {}

class Messenger extends Block {
    static componentName = 'Messenger';

    constructor(props: IMessengerProps) {
        super({ ...props });
    }

    render() {
        // language=hbs
        return `
            <div class="messenger-wrapper">
                {{{ ChatList }}}
                {{{ Dialog }}}
            </div>
        `;
    }
}

export default Messenger;
