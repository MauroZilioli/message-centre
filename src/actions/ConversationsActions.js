import request, { abort } from './../utils/request';
import navigate from './../utils/navigate';
import types from './../constants/ActionTypes';

const loadConversationsRequest = () => ({
    type: types.LOAD_CONVERSATIONS_REQUEST,
});

const loadConversationsSuccess = conversations => ({
    type: types.LOAD_CONVERSATIONS_SUCCESS,
    conversations,
});

const loadConversationsFailure = message => ({
    type: types.LOAD_CONVERSATIONS_FAILURE,
    message,
});

let loadConversationsPromise = null;
export const loadConversationsById = userId => (dispatch) => {

    if (loadConversationsPromise === null) {
        dispatch(loadConversationsRequest());
    } else {
        abort(loadConversationsPromise);
    }

    loadConversationsPromise = request(`conversation/user/${userId}`);
    loadConversationsPromise.then(
        (conversations) => {
            loadConversationsPromise = null;
            dispatch(loadConversationsSuccess(conversations));
        },
        () => {
            loadConversationsPromise = null;
            dispatch(loadConversationsFailure('Could not load conversations'));
        },
    );
};

const createConversationRequest = () => ({
    type: types.CREATE_CONVERSATIONS_REQUEST,
});

const createConversationSuccess = () => ({
    type: types.CREATE_CONVERSATIONS_SUCCESS,
});

const createConversationFailure = message => ({
    type: types.CREATE_CONVERSATIONS_FAILURE,
    message,
});

let createConversationPromise = null;
export const createConversation = conversation => (dispatch) => {

    if (createConversationPromise === null) {
        dispatch(createConversationRequest());
    } else {
        abort(createConversationPromise);
    }

    createConversationPromise = request(`conversation/group`,'POST',conversation);
    createConversationPromise.then(
        () => {
            loadConversationsPromise = null;
            dispatch(createConversationSuccess());
            navigate('/conversations');
        },
        () => {
            loadConversationsPromise = null;
            dispatch(createConversationFailure('Could not load conversations'));
        },
    );
};


