import { Dispatch, RootStateType } from 'store';
import { AuthApi } from 'api/authApi';
import { hasApiError } from '../helpers/hasApiError';

export async function initApp(dispatch: Dispatch<RootStateType>) {
    dispatch({ user: { isLoad: true } });

    try {
        const response = await AuthApi.me();

        if (hasApiError(response)) {
            return;
        }

        dispatch({
            user: {
                id: response.id,
                login: response.login,
                firstName: response.first_name,
                secondName: response.second_name,
                displayName: response.display_name,
                avatar: response.avatar,
                email: response.email,
                phone: response.phone,
            },
        });
    } catch (err) {
        console.error(err);
    } finally {
        dispatch({ user: { isLoad: false } });
    }
}
