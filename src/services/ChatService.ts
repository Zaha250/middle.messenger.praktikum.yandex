import { chatApi } from 'api/chatApi';
import { Dispatch, RootStateType } from 'store';
import { hasApiError } from '../helpers/hasApiError';

export async function getAllChats(dispatch: Dispatch<RootStateType>, state: RootStateType) {
    try{
        dispatch({
            chats: { isLoad: true },
        });

        const response = await chatApi.getAll();
        console.log(response);

        if (hasApiError(response)) {
            dispatch({
                chats: { error: response.reason },
            });
            return;
        }

        dispatch({
            chats: { chats: response },
        });
    } catch (e) {
        dispatch({
            chats: { error: e },
        });
    } finally {
        dispatch({
            chats: { isLoad: false },
        });
    }
}

export async function createChat(dispatch: Dispatch<RootStateType>, state: RootStateType, title: string) {
    try{
        dispatch({
            chats: {
                createModal: { isLoad: true },
            },
        });

        const response = await chatApi.create(title);
        console.log(response);

        if (hasApiError(response)) {
            dispatch({
                chats: {
                    createModal: { error: response.reason },
                },
            });
            return;
        }

        dispatch({
            chats: {
                createModal: { success: true },
            },
        });

        dispatch(getAllChats);

        setTimeout(() => {
            dispatch({
                chats: {
                    createModal: { show: false },
                },
            });
        }, 3000);
    } catch (e) {
        dispatch({
            chats: {
                createModal: { error: e },
            },
        });
    } finally {
        dispatch({
            chats: {
                createModal: { isLoad: false },
            },
        });
    }
}

export async function getChatUsers(dispatch: Dispatch<RootStateType>, state: RootStateType, chatId: number) {
    try{
        dispatch({
            chats: {
                chatUsers: { isLoad: true },
            },
        });

        const response = await chatApi.getChatUsers(chatId);
        console.log(response);

        if (hasApiError(response)) {
            dispatch({
                chats: {
                    chatUsers: { error: response.reason },
                },
            });
            return;
        }

        dispatch({
            chats: {
                chatUsers: { users: response },
            },
        });
    } catch (e) {
        dispatch({
            chats: {
                chatUsers: { error: e },
            },
        });
    } finally {
        dispatch({
            chats: {
                chatUsers: { isLoad: false },
            },
        });
    }
}
