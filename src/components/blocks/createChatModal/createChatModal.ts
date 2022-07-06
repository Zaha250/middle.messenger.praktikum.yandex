import { Block } from 'core';
import { connect } from 'HOC';
import { RootStateType, store } from 'store';
import { createChat } from 'services/ChatService';
import '../modal/modal.scss';

interface ICreateChatModalProps {
    isLoad: boolean;
    success: boolean;
    show: boolean;
    error: Nullable<string>;
}

class CreateChatModal extends Block {
    static componentName = 'CreateChatModal';

    constructor(props: ICreateChatModalProps) {
        super({
            ...props,
        });

        this.setState({
            createChat: () => this.createChat(),
            hideCreateChatModal: () => this.hideCreateChatModal(),
        });
    }

    createChat = () => {
        const input = this.element?.querySelector('#Title') as HTMLInputElement;

        if (input) {
            const { value, name } = input;
            this.refs[name].refs.error.setProps({ text: '' });
            const title: string = value.trim();

            if (title.length < 3) {
                this.refs[name].refs.error.setProps({ text: 'Название чата должно быть не менее 3-х симвалов' });
            } else {
                store.dispatch(createChat, title);
            }
        }
    };

    hideCreateChatModal = () => {
        store.dispatch({
            chats: {
                createModal: { show: false },
            },
        });
    };

    render() {
        // language=hbs
        return `
            <div class="modal backdrop ${this.props.show ? 'show' : ''}">
                <div class="modal-dialog sm ${this.props.show ? 'show' : ''}">
                    <div class="modal-header">
                        <h5 class=modal__title>Новый чат</h5>
                        {{{Close onClick=hideCreateChatModal}}}
                    </div>

                    <div class="modal-content">
                        {{#if success}}
                            <h3>Чат успешно создан</h3>
                            {{else}}
                            {{{ ControlledInput
                                    id="Title"
                                    name="title"
                                    ref="title"
                                    placeholder="Название"
                                    classes="form__input"
                            }}}
                            {{{Error text=error}}}
                            {{{ Button
                                    classes="form__btn"
                                    text="Создать"
                                    isLoad=isLoad
                                    onClick=createChat
                            }}}
                        {{/if}}
                    </div>
                </div>
            </div>
        `;
    }
}

function mapStateToProps(state: RootStateType) {
    return {
        show: state.chats.createModal.show,
        success: state.chats.createModal.success,
        error: state.chats.createModal.error,
        isLoad: state.chats.createModal.isLoad,
    };
}

export default connect(mapStateToProps)(CreateChatModal);
