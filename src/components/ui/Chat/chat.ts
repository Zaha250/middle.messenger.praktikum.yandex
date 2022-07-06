import { Block } from 'core';
import { store } from 'store';
import { getChatUsers } from 'services/ChatService';
import './chat.scss';
import { modifyQueryParams } from '../../../helpers/modifyQueryParams';

interface IChatProps {
    id: number;
    owner: boolean;
    avatar: string;
    name?: string;
    classes?: string;
    last_message: string;
    unreadCount?: number;
}

export class Chat extends Block {
    static componentName = 'Chat';

    constructor({ id, ...props }: IChatProps) {
        super({
            ...props,
            id,
            events: {
                click: () => {
                    modifyQueryParams({
                        queryParam: 'chatId', mode: 'set', value: id.toString(),
                    });

                    store.dispatch({
                        chats: { activeChat: id },
                    });
                    store.dispatch(getChatUsers, id);
                },
            },
        });
    }

    render() {
        // language=hbs
        return `
            <div class="chat {{classes}}">
                <div class="chat-avatar">
                    {{{ Avatar wrapperClasses="chat-avatar__img" photo=avatar }}}
                </div>
                <div class="chat-info">
                    <div class="chat-content">
                        <h5 class="chat__name">{{name}}</h5>
                        <p class="chat__text">
                            {{#if owner}}
                                <span>Вы:</span>
                            {{/if}}
                            {{#if last_message}}
                                {{last_message.content}}
                            {{else}}
                                <span>Чат пуст</span>
                            {{/if}}
                        </p>
                    </div>
                    <div class="chat-stats">
                        <span class="chat__lastMessageDate">{{last_message.time}}</span>
                        {{# if unreadCount}}
                            <span class="chat__unreadCount">
                                {{unreadCount}}
                            </span>
                        {{/if}}
                    </div>
                </div>
            </div>
        `;
    }
}
