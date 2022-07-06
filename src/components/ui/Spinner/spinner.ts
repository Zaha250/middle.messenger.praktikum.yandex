import { Block } from 'core';
import './spinner.scss';

interface ISpinnerProps {
    classes?: string;
    variant?: string;
}

export class Spinner extends Block {
    static componentName = 'Spinner';

    constructor({ classes = '', variant = 'light', ...props }: ISpinnerProps) {
        super({
            ...props,
            classes,
            variant,
        });
    }

    render() {
        // language=hbs
        return `
            <svg class="spinner {{variant}} {{classes}}" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="8" />
            </svg>
        `;
    }
}
