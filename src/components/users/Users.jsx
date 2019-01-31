import React from 'react';
import PropTypes from "prop-types";
import './Users.css';
import * as SH from "../../sh/src/elements";

class Users extends React.Component {

    addNewUser(event, user) {
        this.props.addNewUser(user);
    }

    selectableUsers(total, selected) {
        let available = [];

        total.forEach((element) => {
            if (!selected.includes(element)) {
                available.push(element);
            }
        });

        return available;
    }

    render() {

        const {
            users,
            conversationUsers,
        } = this.props;

        let selectableUsers = this.selectableUsers(users, conversationUsers);

        return (
            <SH.Content>
                <SH.Field>
                    <SH.Label htmlFor="conversation-create-addusers">
                        Add Users:
                    </SH.Label>
                    {selectableUsers.map(user => (
                        <div key={`user-${user.id}`} id={`user-${user.id}`}>
                            <SH.Textbox
                                value={user.name}
                                disabled={true}
                            />
                            <SH.Button
                                icon="add"
                                type="link"
                                onClick={event => this.addNewUser(event, user)} />
                        </div>
                    ))}
                </SH.Field>
            </SH.Content>
        );
    }
}

Users.defaultProps = {
    users: [],
    conversationUsers: [],
    errorMessage: ''
};

Users.propTypes = {
    users: PropTypes.array,
    onInitialize: PropTypes.func.isRequired,
    addNewUser:  PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    conversationUsers: PropTypes.array,
};

export default Users;
