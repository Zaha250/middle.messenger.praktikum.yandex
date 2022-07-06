import { HTTP } from 'core';
import { TRequestOptions } from 'core/HTTP';
import { APIError, UserDTO } from './types';
import {ChatUsersType} from "../store/chats/initialState";

const ChatApiInstance = new HTTP('/chats');

const options: TRequestOptions = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
};

export type ChatResponseType = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string;
            email: string;
            login: string;
            phone: string;
        },
        time: string;
        content: string;
    }
};

export type AddUsersRequestDataType = {
    users: number[];
    chatId: number;
}

export const chatApi = {
    getAll: () => ChatApiInstance.get<ChatResponseType[] | APIError>('', { ...options }),
    create: (title: string) => ChatApiInstance.post<string | APIError>('', { ...options, data: JSON.stringify({ title }) }),
    getChatUsers: (chatId: number) => ChatApiInstance.get<ChatUsersType[] | APIError>(`/${chatId}/users`, { ...options }),
    addUsers: (data: AddUsersRequestDataType) => ChatApiInstance.put<string | APIError>(`/users`, { ...options, data: JSON.stringify(data) }),
};
