import React from 'react';
import PropTypes from 'prop-types';

import * as SH from './../../../sh/src/elements';

import Messages from '../../messages/Messages';

import './ConversationUpdate.scss';

class ConversationUpdate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.conversation.conversation.id,
            message: '',
        };

    }

    componentWillMount() {
        this.props.loadMessages(this.state.id);
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.errorMessage) {
            this.setState({
                message: ''
            });
        }
    }

    handleValueChange(name, value) {
        this.setState({
            [name]: value,
        });
    }

    handleSubmitClick() {
        const newMessage = {
            id: this.state.id,
            message: this.state.message,
            senderId: this.props.sessionUser.id,
        };

        this.props.onSend(newMessage);
    }

    render() {

        const {
            conversation,
            conversationMessages,
            users,
        } = this.props;

        const {
            message,
        } = this.state;

        return (
            <SH.Dialog onSubmit={() => this.handleSubmitClick()}>
                <SH.Header>
                    <h2>{conversation.conversation.name}</h2>
                </SH.Header>
                <SH.Content>
                    <Messages
                        messages={conversationMessages}
                        users={users}
                        />
                    <SH.Field>
                        <SH.Textbox
                            value={message}
                            required="required"
                            onChange={event => this.handleValueChange('message', event.target.value)}/>
                    </SH.Field>
                    <SH.Field>
                        <SH.Button
                            type="submit"
                        >Send</SH.Button>
                    </SH.Field>
                </SH.Content>
            </SH.Dialog>
        );
    }
}

ConversationUpdate.defaultProps = {
    conversationMessages: [],
    conversation: null,
    users: [],
};

ConversationUpdate.propTypes = {
    conversation: PropTypes.object,
    loadMessages: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
    conversationMessages: PropTypes.array,
    sessionUser: PropTypes.object.isRequired,
    users: PropTypes.array,
};

export default ConversationUpdate;
