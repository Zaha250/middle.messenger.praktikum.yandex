import { Block, router } from 'core';
import { RootStateType, store } from 'store';
import { ChatsStateType } from 'store/chats/initialState';
import { connect } from 'HOC';
import { getAllChats } from 'services/ChatService';
import './chatList.scss';

interface IChatListProps {
    user: User;
    chats: ChatsStateType;
}

class ChatList extends Block {
    static componentName = 'ChatList';

    constructor(props: IChatListProps) {
        super({
            ...props,
        });
        this.setProps({
            avatar: () => store.getState().user.profile?.avatar,
            userName: () => store.getState().user.profile?.firstName,
            isLoadChats: () => store.getState().chats.isLoad,
            chats: () => store.getState().chats.chats,
            navigateToSettings: () => this.navigateToSettings(),
            showCreateChatModal: () => this.showCreateChatModal(),
        });
    }

    navigateToSettings = () => {
        router.go('/settings');
    };

    showCreateChatModal = () => {
        store.dispatch({
            chats: {
                createModal: { show: true },
            },
        });
    };

    componentDidMount(props: any) {
        super.componentDidMount(props);

        store.dispatch(getAllChats);
    }

    render() {
        // language=hbs
        return `
            <aside class="chatList">
                <div class="chatList-header">
                    {{{ Avatar 
                            wrapperClasses="chatList-header__avatar" 
                            name=userName
                            photo=avatar 
                            onClick=navigateToSettings 
                    }}}
                    {{{ Search classes="chatList__search" }}}
                        <div class="chatList-header__buttons">
                            {{{Button text="Создать чат" classes="chatList-header__addChat" onClick=showCreateChatModal}}}
                        </div>
                    {{{CreateChatModal}}}
                </div>
                <div class="dialogs-body">
                    {{#if isLoadChats}}
                        <div class="chatList__spinner">
                            {{{Spinner variant="primary"}}}
                        </div>
                    {{else}}
                        <div>
                            {{#each chats}}
                                {{{ Chat
                                        id=id
                                        avatar=avatar
                                        name=title
                                        last_message=last_message
                                        unreadCount=unread_count
                                }}}
                            {{/each}}
                        </div>
                    {{/if}}
                </div>
            </aside>
        `;
    }
}

function mapStateToProps(state: RootStateType) {
    return {
        user: state.user.profile,
        chats: state.chats.chats,
    };
}

export default connect(mapStateToProps)(ChatList);
