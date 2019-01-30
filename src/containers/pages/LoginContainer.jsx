import React from 'react';
import { connect } from 'react-redux';

import { login } from './../../actions/SessionActions';

import Login from '../../components/login/Login';

const LoginContainer = props => <Login {...props} />;

const mapStoreStateToProps = storeState => ({
    isAuthenticated: !!storeState.session.user,
    errorMessage: storeState.session.errorMessage,
    isInitializing: storeState.session.isInitializing,
    isLoading: storeState.session.isFetching,
});

export default connect(mapStoreStateToProps, {
    onLogin: credentials => login(credentials),
})(LoginContainer);
