import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as SH from './../sh/src/elements';

import { initAuth } from './../actions/SessionActions';

import ConversationsContainer from './pages/ConversationsContainer';
import LoginContainer from "./pages/LoginContainer";

class RoutesContainer extends React.Component {
    componentWillMount() {
        this.props.onInitialize();
    }

    render() {
        const { user } = this.props;

        return(
            <Switch>
                <SH.UserRoute
                    path="/conversations/:action?/:id?"
                    component={ConversationsContainer}
                    user={user}
                    role="*"
                />
                <Route
                    path="/"
                    render={props => (user
                            ? <Redirect to={props.location.state ? props.location.state.from : '/conversations'} />
                            : <LoginContainer {...props} />
                    )}
                />
            </Switch>
        );

    }
}

RoutesContainer.propTypes = {
    onInitialize: PropTypes.func.isRequired,
    user: PropTypes.object,
};

const mapStoreStateToProps = storeState => ({
    user: storeState.session.user,
});

export default withRouter(connect(mapStoreStateToProps, {
    onInitialize: () => initAuth(),
})(RoutesContainer));
