import { Block } from 'core';
import './chatList.scss';

export class ChatList extends Block {
    static componentName = 'ChatList';

    render() {
        // language=hbs
        return `
            <aside class="chatList">
                <div class="chatList-header">
                    <a href="./profile.hbs">
                        {{{ Avatar wrapperClasses="chatList-header__avatar" name="Александр" }}}
                    </a>
                    {{{ Search classes="chatList__search" }}}
                </div>
                <div class="dialogs-body">
                    {{{ Chat
                            avatar="https://avatars.mds.yandex.net/get-kino-vod-films-gallery/28788/47e2fd514411e18b76af786d7417062d/100x64_3"
                            name="Design Destroyer"
                            last_message="Друзья, у меня для вас особенный выпуск новостей!..."
                            lastMessageDate="10:49"
                            unreadCount="3"
                    }}}
                    {{{ Chat
                            avatar="https://i.pinimg.com/550x/31/23/2f/31232fe4b51b47763282524f008d9081.jpg"
                            name="Стас Рогозин"
                            last_message="Так увлёкся работой по курсу, что совсем забыл его анонсир..."
                            lastMessageDate="1 Мая 2020"
                    }}}
                </div>
            </aside>
        `;
    }
}
