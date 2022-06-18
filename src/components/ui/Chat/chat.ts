import { Block } from 'core';
import './chat.scss';

interface IChatProps {
    owner: boolean;
    avatar: string;
    name?: string;
    classes?: string;
    last_message: string;
    lastMessageDate: string;
    unreadCount?: number;
}

export class Chat extends Block {
    static componentName = 'Chat';

    constructor({
        classes, last_message, lastMessageDate, owner, avatar, unreadCount, name, 
    }: IChatProps) {
        super({
            classes, last_message, lastMessageDate, owner, avatar, unreadCount, name,
        });
    }

    render() {
        // language=hbs
        return `
            <div class="chat {{classes}}">
                <div class="chat-avatar">
                    <img src="{{avatar}}" alt="{{name}}" class="chat-avatar__img">
                </div>
                <div class="chat-info">
                    <div class="chat-content">
                        <h5 class="chat__name">{{name}}</h5>
                        <p class="chat__text">
                            {{#if owner}}
                                <span>Вы:</span>
                            {{/if}}
                            {{last_message}}
                        </p>
                    </div>
                    <div class="chat-stats">
                        <span class="chat__lastMessageDate">{{lastMessageDate}}</span>
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
