import user from './user/initialState';
import changePassword from './changePassword/initialState';
import chats from './chats/initialState';

const rootState = {
    user,
    changePassword,
    chats,
};

export type RootStateType = typeof rootState;

export default rootState;
