import {Block} from "core";
import './close.scss';

interface ICloseProps {
    onClick: () => void
}

export class Close extends Block {
    static componentName = 'Close';

    constructor({onClick, ...props}: ICloseProps) {
        super({
            ...props,
            events: {
                click: onClick
            }
        });
    }

    render() {
        //language=hbs
        return `
            <span class="close">&times;</span>
        `;
    }
}