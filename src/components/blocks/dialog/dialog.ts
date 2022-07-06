import { Block } from 'core';
import { RootStateType, store } from 'store';
import { connect } from 'HOC';
import { UserDTO } from 'api/types';
import { getChatUsers } from 'services/ChatService';
import { getQueryParam } from 'helpers/getQueryParams';
import './dialog.scss';

interface IDialogProps {
    chatUsers: UserDTO[];
    activeChat: number;
}

class Dialog extends Block {
    static componentName = 'Dialog';

    constructor({ activeChat, ...props }: IDialogProps) {
        super({
            ...props,
            activeChat,
            sendMessageHandler: () => {
                const { value } = this.element?.querySelector('[name=message]') as HTMLInputElement;
                if (!value.trim().length) return;

                console.log(`Message: ${value}`);
            },
            onClickHandler: () => {
                this.props.sendMessageHandler();
            },
        });

        this.setState({
            showSearchUsersModal: () => this.showSearchUsersModal(),
        });
    }

    showSearchUsersModal = () => {
        store.dispatch({
            user: {
                search: { showModal: true },
            },
        });
    };

    componentDidMount(props: any) {
        super.componentDidMount(props);
        const chatId = getQueryParam('chatId');

        if (chatId) {
            store.dispatch({
                chats: { activeChat: chatId },
            });
            store.dispatch(getChatUsers, chatId);
        }
    }

    render() {
        // language=hbs
        if (!this.props.activeChat) {
            return `
                <div class="messenger-placeholder">
                    <h5 class="messenger-placeholder__text">
                        Выберите чат, чтобы отправить сообщение
                    </h5>
                </div>
            `;
        }
        if (this.props.chatUsers.length < 2) {
            // language=hbs
            return `
                <div class="dialog">
                    <div class="dialog-header">
                        {{{ Button text="..." classes="dialog__settings" }}}
                        {{{ Button text="Добавить пользователя" onClick=showSearchUsersModal }}}
                        {{{ SearchUsersModal }}}
                    </div>
                    <div class="messenger-placeholder">
                        <h5 class="messenger-placeholder__text">
                            Добавьте хотя бы одного пользователя, чтобы начать общение
                        </h5>
                    </div>
                </div>
            `;
        }
        // language=hbs
        return `
            <div class="dialog">
                <div class="dialog-header">
                    {{{ Avatar name="Replace" }}}
                    {{{ Button text="..." classes="dialog__settings" }}}
                    {{{ Button text="Добавить пользователя" onClick=showSearchUsersModal }}}
                    {{{ SearchUsersModal }}}
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

function mapStateToProps(state: RootStateType) {
    return {
        chatUsers: state.chats.chatUsers.users,
        activeChat: state.chats.activeChat,
    };
}

export default connect(mapStateToProps)(Dialog);
