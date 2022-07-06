import { Block } from 'core';
import { connect } from 'HOC';
import { RootStateType, store } from 'store';
import { searchUsers } from 'services/UserService';
import { addUsersToChat, getChatUsers } from "services/ChatService";
import { hasApiError } from 'helpers/hasApiError';
import '../modal/modal.scss';
import './searchUsersModal.scss';

interface ISearchUsersModalProps {
    show: boolean;
}

class SearchUsersModal extends Block {
    static componentName = 'SearchUsersModal';

    constructor(props: ISearchUsersModalProps) {
        super({
            ...props,
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    const inputEl = document.querySelector('#login') as HTMLInputElement;
                    this.searchUsers(inputEl.value);
                },
            },
        });

        this.setState({
            isLoad: false,
            result: [],
            error: null,
            hideSearchUsersModal: () => this.hideSearchUsersModal(),
            searchUsers: (searchQuery: string) => this.searchUsers(searchQuery),
            addUser: (e: MouseEvent) => this.addUser(e),
        });
    }

    hideSearchUsersModal = () => {
        store.dispatch({
            user: {
                search: { showModal: false },
            },
        });
    };

    searchUsers = async (login: string) => {
        this.setState({
            isLoad: true,
        });

        const result = await searchUsers(login);

        if (hasApiError(result)) {
            this.setState({
                error: result.reason,
                isLoad: false,
            });
            return;
        }

        this.setState({
            result,
            isLoad: false,
        });
    };

    addUser = async (e: MouseEvent) => {
        const userId = e.target?.parentNode.dataset.userid;
        const chatId = this.props.chatId;

        const result = await addUsersToChat({
            users: [Number(userId)],
            chatId: chatId
        });

        if(hasApiError(result)){
            this.setProps({
                error: result.reason,
            });
            return;
        }

        store.dispatch(getChatUsers, chatId);
        this.hideSearchUsersModal();
    };

    render() {
        // language=hbs
        return `
            <div class="modal backdrop${this.props.show ? ' show' : ''}">
                <div class="modal-dialog searchUsers sm${this.props.show ? ' show' : ''}">
                    <div class="modal-header">
                        <h5 class=modal__title>Поиск пользователей</h5>
                        {{{ Close onClick=hideSearchUsersModal }}}
                    </div>

                    <div class="modal-content">
                        <form>
                            {{{ ControlledInput
                                    id="login"
                                    name="login"
                                    placeholder="Логин пользователя"
                                    classes="form__input"
                            }}}
                            {{{Error text=error}}}
                            {{#if isLoad}}
                                <div class="searchUsers__spinner">
                                    {{{ Spinner variant="primary" }}}
                                </div>
                            {{else}}
                                <div>
                                    {{#each result}}
                                        <div class="searchUsers-user" data-userID="{{id}}">
                                            <h2>{{first_name}} {{second_name}}</h2>
                                            {{{ Button text="+" classes="searchUsers-user__addBtn" onClick=@root.addUser }}}
                                        </div>
                                    {{/each}}
                                </div>
                            {{/if}}
                            {{{ Button type="submit" text="Найти" classes="w-100" }}}
                        </form>
                    </div>
                </div>
            </div>
        `;
    }
}

function mapStateToProps(state: RootStateType) {
    return {
        show: state.user.search.showModal,
        chatId: state.chats.activeChat
    };
}

export default connect(mapStateToProps)(SearchUsersModal);
