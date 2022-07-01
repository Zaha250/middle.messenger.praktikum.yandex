import { Block } from 'core';
import './avatar.scss';

interface IAvatarProps {
    wrapperClasses?: string;
    photo?: string;
    name?: string;
    onClick?: () => void;
}

export class Avatar extends Block {
    static componentName = 'Avatar';

    constructor({ wrapperClasses, photo, name, onClick }: IAvatarProps) {
        super({
            wrapperClasses,
            photo,
            name,
            events: {
                click: onClick,
            }
        });
    }

    render() {
        // language=hbs
        return `
        <div class="avatar {{wrapperClasses}}">
            <div class="avatar-photo {{classes}}">
                {{#if photo}}
                    <img src="{{photo}}" alt="{{name}}">
                {{else}}
                    <div class="avatar-placeholder">
                    </div>
                {{/if}}
            </div>
            {{#if name}}
                <h5 class="avatar__name">{{name}}</h5>
            {{/if}}
        </div>`;
    }
}
