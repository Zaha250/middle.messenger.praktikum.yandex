import { Block } from '../../../core';
import './search.scss';

interface ISearchProps {
    classes?: string;
    value: string;
    onChange: () => void;
}

export class Search extends Block {
    static componentName = 'Search';

    constructor({ classes, value, onChange = () => {} }: ISearchProps) {
        super({ classes, value, events: { input: onChange } });
    }

    render() {
        // language=hbs
        return `
            <input
                type="text"
                placeholder="Поиск"
                id="search_dialogs"
                class="search__input {{classes}}"
                value="{{value}}"
            >
        `;
    }
}
