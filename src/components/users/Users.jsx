import React from 'react';
import PropTypes from "prop-types";
import './Users.css';

class Users extends React.Component {

    componentWillMount() {
        this.props.onInitialize();
    }

    render() {

        const {
            users
        } = this.props;

        return (
            <div>
                <h1>Users:</h1>
                <div className="list-group">
                    <ul className="list-group">{users.length === 0 ? '' :
                    users.map(user => (
                        <li className="list-group-item" key={user.id}>{user.id} - {user.name}
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        );
    }
}

Users.defaultProps = {
    users: [],
    errorMessage: ''
};

Users.propTypes = {
    users: PropTypes.array,
    onInitialize: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

export default Users;
