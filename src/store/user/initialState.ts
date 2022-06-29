const initialState: UserStateType = {
    isLoad: false,
    profile: null,
};

export type UserStateType = {
    isLoad: boolean;
    profile: Nullable<User>;
};

export default initialState;
