import { AuthApi, CreateUserType } from '../api/authApi';
import { Dispatch, RootStateType } from '../store';
import { hasApiError } from '../helpers/hasApiError';
import { Router } from '../core';

const router = new Router('#app');

export async function createUser(dispatch: Dispatch<RootStateType>, state: RootStateType, data: CreateUserType) {
    try {
        const response = await AuthApi.create(data);

        if (hasApiError(response)) {
            console.error(response.reason);
            return;
        }

        dispatch({
            user: {
                profile: { },
            },
        });
        router.go('/messenger');
    } catch (e) {
        console.error(e);
    } finally {

    }
}
