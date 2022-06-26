const initialState: UserStateType = {
    isLoad: false,
    profile: {
        id: '',
        login: '',
        firstName: '',
        secondName: '',
        displayName: '',
        avatar: '',
        email: '',
        phone: '',
    },
};

type UserStateType = {
    isLoad: boolean;
    profile: User;
};

export default initialState;
