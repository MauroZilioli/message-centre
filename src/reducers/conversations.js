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
        case types.LOAD_CONVERSATIONS_REQUEST:
            return {
                ...state,
                errorMessage: '',
                isFetching: true,
                items: [],
            };

        case types.LOAD_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                isReady: true,
                isFetching: false,
                items: action.conversations,
            };

        case types.LOAD_CONVERSATIONS_FAILURE:
            return {
                ...state,
                errorMessage: action.message,
                isFetching: false,
            };

        case types.CREATE_CONVERSATIONS_REQUEST:
            return {
                ...state,
                isSaving: true,
                errorMessage: '',
            };

        case types.CREATE_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                isSaving: false,
                // items: [...state.items, action.region],
            };

        case types.CREATE_CONVERSATIONS_FAILURE:
            return {
                ...state,
                isSaving: false,
                errorMessage: action.message,
            };

        default:
            return state;
    }
};
