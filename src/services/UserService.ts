import { Dispatch, RootStateType } from 'store';
import { UserApi } from 'api/userApi';
import { UserDTO } from 'api/types';
import { hasApiError } from 'helpers/hasApiError';

export async function changeProfile(
    dispatch: Dispatch<RootStateType>,
    state: RootStateType,
    data: Omit<UserDTO, 'id' | 'avatar'>,
) {
    try {
        const response = await UserApi.changeProfile(data);

        if (hasApiError(response)) {
            dispatch({
                user: {
                    error: response.reason,
                    isLoad: false
                },
            });
            console.error(response.reason);
            return;
        }

        dispatch({
            user: {
                profile: {
                    id: response.id,
                    login: response.login,
                    firstName: response.first_name,
                    secondName: response.second_name,
                    email: response.email,
                    phone: response.phone,
                    avatar: response.avatar,
                    displayName: response.display_name
                },
            },
        });
    } catch (e) {
        dispatch({
            user: { error: e },
        });
    }
}

export async function changePassword(
    dispatch: Dispatch<RootStateType>,
    state: RootStateType,
    data: { oldPassword: string, newPassword: string },
) {
    try {
        dispatch({
            changePassword: { isLoad: true },
        });

        const response = await UserApi.changePassword(data);

        if (hasApiError(response)) {
            dispatch({
                changePassword: {
                    error: response.reason,
                    isLoad: false
                },
            });
            console.error(response.reason);
            return;
        }

        dispatch({
            changePassword: {
                success: true,
                isLoad: false,
            },
        });
    } catch (e) {
        dispatch({
            changePassword: { error: e },
        });
    }
}

export function searchUsers(login: string) {
    return UserApi.search(login);
}
