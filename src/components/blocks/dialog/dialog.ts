import { Block } from 'core';
import './dialog.scss';

interface IDialogProps {
    dialogId: string | number;
    name: string | number;
}

export class Dialog extends Block {
    static componentName = 'Dialog';

    constructor({ name = 'Alex', ...props }: IDialogProps) {
        super({
            ...props,
            name,
            sendMessageHandler: () => {
                const message = this.element?.querySelector('[name=message]').value;
                if (!message.trim().length) return;

                console.log(`Message: ${message}`);
            },
            onClickHandler: () => {
                this.props.sendMessageHandler();
            },
        });
    }

    render() {
        // language=hbs
        return `
            <div class="dialog">
                <div class="dialog-header">
                    {{{ Avatar name=name }}}
                    <button class="dialog__settings">...</button>
                </div>
                <div class="dialog-body">
                    <div class="dialog__date">19 июня</div>
                    {{{ Message time="11:56" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et ipsam laborum" }}}
                    {{{ Message own=true time="12:43" status="read" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et ipsam laborum" }}}
                    {{{ Message own=true time="12:45" status="send" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et ipsam laborum" }}}
                </div>
                <div class="dialog-footer">
                    <button class="dialog__attachment"></button>
                    {{{ MessageTextarea onKeyDownHandler=sendMessageHandler }}}
                    {{{ Button text="Отправить" onClick=onClickHandler }}}
                </div>
            </div>
        `;
    }
}
