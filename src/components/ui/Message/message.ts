import { Block } from 'core';
import './message.scss';

interface IMessageProps {
    own?: boolean;
    content: string;
    status?: string;
}

export class Message extends Block {
    static componentName = 'Message';

    constructor({ ...props }: IMessageProps) {
        super({
            ...props,
        });
    }

    render() {
        // language=hbs
        return `
            <div class="message {{#if own}}own{{/if}}">
                <div class="message-content">{{content}}</div>
                 <div class="message-info">
                     {{#if own}}
                         <div class="message__delivery {{status}}"></div>
                     {{/if}}
                     <span class="message__time">{{time}}</span>
                 </div>
            </div>
        `;
    }
}
