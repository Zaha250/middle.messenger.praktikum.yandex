import { ChatResponseType } from 'api/chatApi';
import { UserDTO } from 'api/types';

const initialState: ChatsStateType = {
    isLoad: false,
    error: null,
    chats: [],
    activeChat: null,
    chatUsers: {
        error: null,
        isLoad: false,
        users: [],
    },
    createModal: {
        show: false,
        error: null,
        isLoad: false,
        success: false,
    },
};

export type ChatsStateType = {
    isLoad: boolean;
    error: Nullable<string>;
    activeChat: Nullable<number>;
    chats: ChatResponseType[];
    chatUsers: {
        users: ChatUsersType[];
        isLoad: boolean;
        error: Nullable<string>;
    };
    createModal: {
        show: boolean;
        error: Nullable<string>;
        isLoad: boolean;
        success: boolean;
    }
};

export type ChatUsersType = UserDTO & {
    role: string;
}

export default initialState;
