import { AuthApi, CreateUserType } from 'api/authApi';
import { Dispatch, RootStateType } from 'store';
import { hasApiError } from '../helpers/hasApiError';
import {initApp} from "./InitApp";
import router from "core/Router";

export async function createUser(dispatch: Dispatch<RootStateType>, state: RootStateType, data: CreateUserType) {
    dispatch({
        user: { isLoad: true }
    });
    const response = await AuthApi.create(data);

    if (hasApiError(response)) {
        dispatch({
            user: { error: response.reason, isLoad: false }
        });
        console.error(response.reason);
        return;
    }

    dispatch({
        user: {
            profile: {
                id: response.id,
                login: data.login,
                firstName: data.first_name,
                secondName: data.second_name,
                email: data.email,
                phone: data.phone,
                avatar: '',
                displayName: data.first_name
            },
            isLoad: false
        },
    });
    router.go('/messenger');
}

export async function login(dispatch: Dispatch<RootStateType>, state: RootStateType, data: CreateUserType) {
    try {
        dispatch({
            user: { isLoad: true }
        });
        const response = await AuthApi.login(data);
        console.log(response)

        if (hasApiError(response)) {
            dispatch({
                user: { error: response.reason, isLoad: false }
            });
            return;
        }

        dispatch(initApp);
        router.go('/messenger');
    } catch (e) {
        dispatch({
            user: { error: e }
        });
    }
}

export async function logout(dispatch: Dispatch<RootStateType>, state: RootStateType) {
    try {
        const response = await AuthApi.logout();
        console.log(response)

        if (hasApiError(response)) {
            dispatch({
                user: { error: response.reason, isLoad: false }
            });
            return;
        }

        dispatch({
            user: { profile: null, isLoad: false }
        });

        router.go('/');
    } catch (e) {
        dispatch({
            user: { error: e, isLoad: false }
        });
    }
}
