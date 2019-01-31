import React from 'react';
import PropTypes from "prop-types";
import './Messages.css';
import * as SH from "../../sh/src/elements";

class Messages extends React.Component {

    render() {

        const {
            messages,
            users,
        } = this.props;

        return (
            <SH.Content>
                {messages.map(message => (
                    <SH.Field key={`field-${message.id}`}>
                        <SH.Label key={`label-${message.id}`}>
                            {message.timestamp + " - " + users.find(x => x.id === message.senderId).name}
                        </SH.Label>
                        <SH.Output key={`message-${message.id}`} value={message.message}/>
                    </SH.Field>
                ))}
            </SH.Content>
        );
    }
}

Messages.defaultProps = {
    messages: [],
    users: [],
    errorMessage: ''
};

Messages.propTypes = {
    messages: PropTypes.array,
    users: PropTypes.array,
    errorMessage: PropTypes.string,
    onInitialize: PropTypes.func.isRequired,
};

export default Messages;
