import { Block } from '../../../core';
import './error.scss';

export class Error extends Block {
    static componentName = 'Error';

    render() {
        // language=hbs
        return `
            <div class="error">{{text}}</div>
        `;
    }
}
