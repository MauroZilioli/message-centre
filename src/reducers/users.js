import types from './../constants/ActionTypes';

const initialState = {
    items: [],
    user: null,
    errorMessage: '',
    isReady: false,
    isSaving: false,
    isFetching: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_USERS_REQUEST:
            return {
                ...state,
                errorMessage: '',
                isFetching: true,
                items: [],
            };

        case types.LOAD_USERS_SUCCESS:
            return {
                ...state,
                isReady: true,
                isFetching: false,
                items: action.users,
            };

        case types.LOAD_USERS_FAILURE:
            return {
                ...state,
                errorMessage: action.message,
                isFetching: false,
            };

        default:
            return state;
    }
};
