const initialState: UserStateType = {
    isLoad: false,
    error: null,
    profile: null,
};

export type UserStateType = {
    isLoad: boolean;
    error: Nullable<string>;
    profile: Nullable<User>;
};

export default initialState;
