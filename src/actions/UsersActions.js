import request, { abort } from './../utils/request';
import types from './../constants/ActionTypes';

const loadUsersRequest = () => ({
    type: types.LOAD_USERS_REQUEST,
});

const loadUsersSuccess = users => ({
    type: types.LOAD_USERS_SUCCESS,
    users
});

const loadUsersFailure = message => ({
    type: types.LOAD_USERS_FAILURE,
    message
});

let loadUsersPromise = null;
export const loadUsers = () => (dispatch) => {

    if (loadUsersPromise === null) {
        dispatch(loadUsersRequest())
    } else {
        abort(loadUsersPromise);
    }

    loadUsersPromise = request('users');
    loadUsersPromise.then(
        (users) => {
            loadUsersPromise = null;
            dispatch(loadUsersSuccess(users));
        },
        () => {
            loadUsersPromise = null;
            dispatch(loadUsersFailure('Could not load users'));
        }
    )
};
