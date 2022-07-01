const initialState: ChangePasswordStateType = {
    show: false,
    success: false,
    error: null,
    isLoad: false
}

export type ChangePasswordStateType = {
    show: boolean;
    success: boolean;
    error: Nullable<string>;
    isLoad: boolean;
};

export default initialState;