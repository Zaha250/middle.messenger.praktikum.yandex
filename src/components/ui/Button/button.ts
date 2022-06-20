import { Block } from 'core';
import './button.scss';

interface IButtonProps {
    text: string;
    type?: string;
    variant?: string;
    classes?: string;
    onClick: () => void;
}

export class Button extends Block {
    static componentName = 'Button';

    constructor({
        type = 'text', variant = 'primary', onClick, ...props 
    }: IButtonProps) {
        super({
            ...props,
            type,
            variant,
            events: {
                click: onClick,
            },
        });
    }

    render() {
        // language=hbs
        return `
            <button class="btn {{variant}} {{classes}}" type="{{type}}">{{text}}</button>
        `;
    }
}
