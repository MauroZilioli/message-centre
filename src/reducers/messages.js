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
        case types.LOAD_MESSAGES_REQUEST:
            return {
                ...state,
                errorMessage: '',
                isFetching: true,
                items: [],
            };

        case types.LOAD_MESSAGES_SUCCESS:
            return {
                ...state,
                isReady: true,
                isFetching: false,
                items: action.messages,
            };

        case types.LOAD_MESSAGES_FAILURE:
            return {
                ...state,
                errorMessage: action.message,
                isFetching: false,
            };

        case types.SEND_MESSAGE_REQUEST:
            return {
                ...state,
                errorMessage: '',
                isFetching: true,
            };

        case types.SEND_MESSAGE_FAILURE:
            return {
                ...state,
                errorMessage: action.message,
                isFetching: false,
            };

        default:
            return state;
    }
};
