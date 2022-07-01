import user from './user/initialState';
import changePassword from './changePassword/initialState';

const rootState = {
    user,
    changePassword
};

export type RootStateType = typeof rootState;

export default rootState;
