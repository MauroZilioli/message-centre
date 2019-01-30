import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import { logout } from './../actions/SessionActions';

import Header from './../components/header/Header';

const HeaderContainer = props => <Header {...props} />;

const mapStoreStateToProps = storeState => ({
    user: storeState.session.user,
});

export default withRouter(connect(mapStoreStateToProps, {

})(HeaderContainer));
