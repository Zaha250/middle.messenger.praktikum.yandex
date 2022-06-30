import { Dispatch, RootStateType } from 'store';
import { AuthApi } from 'api/authApi';
import { hasApiError } from '../helpers/hasApiError';

export async function initApp(dispatch: Dispatch<RootStateType>) {
    dispatch({ user: { isLoad: true } });

    try {
        const response = await AuthApi.me();
        console.log(response)
        const data = JSON.parse(response.response);
        console.log(data)

        if (hasApiError(response)) {
            return;
        }

        dispatch({
            user: {
                profile: {
                    id: data.id,
                    login: data.login,
                    firstName: data.first_name,
                    secondName: data.second_name,
                    displayName: data.display_name,
                    avatar: data.avatar,
                    email: data.email,
                    phone: data.phone,
                },
                isLoad: false
            },
        });
    } catch (err) {
        console.error(err);
    } finally {
        // dispatch({ user: { isLoad: false } });
    }
}
