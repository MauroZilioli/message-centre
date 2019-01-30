import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import './Login.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
        };
    }

    onSubmit(event) {
        event.preventDefault();
        this.login();
    }

    login() {
        const credentials = {
            id: this.state.userId,
        };

        this.props.onLogin(credentials);
    }

    render() {
        const {
            isLoading,
            isAuthenticated,
            isInitializing,
        } = this.props;

        if (isAuthenticated) {
            return <Redirect to="/conversations"/>
        }

        if (isInitializing) {
            return <div>Initializing...</div>;
        }

        return (
            <div className="login">
                <div className="login-main">
                    <div className="login-head">
                        <div className="login-head-title">Login</div>
                    </div>
                    <form onSubmit={event => this.onSubmit(event)}>
                        <div>
                            <input
                                id="login-form-userId"
                                type="text"
                                value={this.state.userId}
                                className="input"
                                placeholder="User ID"
                                onChange={event => this.setState({ userId: event.target.value })}
                            />
                        </div>
                        <div>
                            <button type="submit" disabled={isLoading} className="button">login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

Login.defaultProps = {

};

Login.propTypes = {
    isInitializing: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
};

export default Login;
