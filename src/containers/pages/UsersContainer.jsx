import React from 'react';
import { connect } from 'react-redux';

import * as UsersActions from './../../actions/UsersActions';

import Users from '../../components/users/Users';

const UsersContainer = props => <Users {...props} />;

const mapStoreStateToProps = (storeState, ownProps) => ({
    sessionUser: storeState.session.user,
    isLoading: storeState.conversations.isFetching,
    isSaving: storeState.conversations.isSaving,
    errorMessage: storeState.conversations.errorMessage,
    users: storeState.users.items,
});

export default connect(mapStoreStateToProps, {
    onInitialize: () => UsersActions.loadUsers(),
})(UsersContainer);
