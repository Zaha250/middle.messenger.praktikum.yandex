import { Block } from '../../../core';

interface IMessageTextareaProps {
    onKeyDownHandler: () => void;
}

export class MessageTextarea extends Block {
    static componentName = 'MessageTextarea';

    constructor({ onKeyDownHandler, ...props }: IMessageTextareaProps) {
        super({
            ...props,
            onKeyDownHandler,
            events: {
                keydown: (e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        onKeyDownHandler();
                    }
                },
            },
        });
    }

    render() {
        // language=hbs
        return `
            <textarea
                    class="dialog__message"
                    name="message"
                    placeholder="Сообщение"
            ></textarea>
        `;
    }
}
