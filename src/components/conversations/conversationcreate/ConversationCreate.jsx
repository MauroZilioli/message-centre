import React from 'react';
import PropTypes from 'prop-types';

import * as SH from './../../../sh/src/elements';

import './ConversationCreate.scss';

class ConversationCreate extends React.Component {
    constructor(props) {
        super(props);

        this.proto = {
            name: '',
            conversationUsers: [],
            newUser: '',
        };

        this.state = {
            ...this.proto,
        };
    }

    handleValueChange(name, value) {
        this.setState({
            [name]: value,
        });
    }

    addNewUser(event, user) {
        let usersList = this.state.conversationUsers;
        usersList.push(user);
        this.setState({
            conversationUsers: usersList,
            newUser: ''
        });
    }

    handleSubmitClick() {
        let usersId = '';
        this.state.conversationUsers.forEach(conUser => {
                if (usersId === '') {
                    usersId += conUser.id;
                } else {
                    usersId += `,${conUser.id}`;
                }
        });
        const conversation = {
            name: this.state.name,
            users: usersId,
        };

        this.props.onAccept(conversation);
    }

    selectableUsers(total, selected) {
        let available = [];

        total.forEach((element) => {
            if (!selected.includes(element)) {
                available.push(element);
            }
        })

        return available;
    }

    render() {
        const {
            name,
            conversationUsers,
        } = this.state;

        const {
            users,
            isSaving,
        } = this.props;

        let selectableUsers = this.selectableUsers(users, conversationUsers);

        return (
            <SH.Dialog onSubmit={() => this.handleSubmitClick()}>
                <SH.Header>
                    <h2>Create new conversation</h2>
                </SH.Header>
                <SH.Content>
                    <SH.Field>
                        <SH.Label htmlFor="conversation-create-title">
                            Name:
                        </SH.Label>
                        <SH.Textbox
                            id="conversation-create-title"
                            value={name}
                            required="required"
                            onChange={event => this.handleValueChange('name', event.target.value)}
                        />
                    </SH.Field>
                    <SH.Field>
                        <SH.Label htmlFor="conversation-create-users">
                            Users:
                        </SH.Label>
                        {conversationUsers.map(user => (
                            <div key={`user-${user.id}`} id={`user-${user.id}`}>
                                <SH.Textbox
                                    disabled={true}
                                    value={user.name}
                                    />
                            </div>
                        ))}
                    </SH.Field>
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
                <SH.Footer>
                    <SH.Button
                        type="submit"
                        disabled={isSaving}
                    >Create</SH.Button>
                </SH.Footer>
            </SH.Dialog>
        );
    }
}

ConversationCreate.defaultProps = {
    errorMessage: '',
};

ConversationCreate.propTypes = {
    errorMessage: PropTypes.string,
    users: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    onAccept: PropTypes.func.isRequired,
};

export default ConversationCreate;
