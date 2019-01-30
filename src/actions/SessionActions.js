import request, { setToken as setRequestToken } from './../utils/request';
import types from './../constants/ActionTypes';

/* global localStorage */

const SESSION_TOKEN_NAME = 'token';

const fetchSessionUserSuccess = user => ({
    type: types.FETCH_SESSION_USER_SUCCESS,
    user,
});

const loginRequest = () => ({
    type: types.LOGIN_REQUEST,
});

const loginSuccess = () => ({
    type: types.LOGIN_SUCCESS,
});

const loginFailure = message => ({
    type: types.LOGIN_FAILURE,
    message,
});


export const login = crendentials => (dispatch) => {
    dispatch(loginRequest());
    request(`user/${crendentials.id}`).then(
        (user) => {
            dispatch(loginSuccess());

            dispatch(fetchSessionUserSuccess(user));
        },
        () => {
            dispatch(loginFailure('Could not login'));
        },

    );
};

export const initAuth = () => (dispatch) => {
    const token = localStorage.getItem(SESSION_TOKEN_NAME);

    if (token) {
        setRequestToken(token);

        dispatch(loginRequest());
        dispatch(loginSuccess());
        // dispatch(fetchSessionUser());
    }
};
