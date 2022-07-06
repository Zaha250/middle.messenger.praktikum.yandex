const initialState: UserStateType = {
    isLoad: false,
    error: null,
    profile: null,
    search: {
        showModal: false,
    },
};

export type UserStateType = {
    isLoad: boolean;
    error: Nullable<string>;
    profile: Nullable<User>;
    search: {
        showModal: boolean;
    }
};

export default initialState;
