import { Block } from 'core';
import './input.scss';

export interface IInputProps {
    type?: 'text' | 'password' | 'email' | 'phone';
    id?: string;
    placeholder?: string;
    name: string;
    classes?: string;
    value?: string;
    onChange?: () => void;
    onBlur?: () => void;
    onFocus?: () => void;
}

export class Input extends Block {
    static componentName = 'Input';

    constructor({
        type = 'text', onChange, onBlur, onFocus, ...props 
    }: IInputProps) {
        super({
            ...props,
            type,
            events: {
                input: onChange,
                blur: onBlur,
                focus: onFocus,
            },
        });
    }

    render() {
        // language=hbs
        return `
            <input
                type="{{type}}"
                placeholder="{{placeholder}}"
                value="{{value}}"
                name="{{name}}"
                class="input {{classes}}"
            >
        `;
    }
}
