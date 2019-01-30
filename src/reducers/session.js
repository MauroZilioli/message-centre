import types from './../constants/ActionTypes';

const initialState = {
    user: null,
    errorMessage: '',
    isInitializing: false,
    isFetching: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        // Login
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
            };

        case types.FETCH_SESSION_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                isInitializing: false,
                isFetching: false,
            };

        case types.LOGOUT_SUCCESS:
            return { ...initialState };

        default:
            return state;
    }
};
