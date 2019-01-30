import React from 'react';
import PropTypes from "prop-types";
import './Messages.css';

class Messages extends React.Component {
    // constructor(props) {
    //     super(props);
    //
    // }

    componentWillMount() {
        this.props.onInitialize();
    }

    render() {

        const {
            messages
        } = this.props;

        return (
            <div>{messages.length === 0 ? '' :
                messages.map(message => (
                    <p>{message.timestamp + ": " + message.message}</p>
                ))}
            </div>
        );
    }
}

Messages.defaultProps = {
    messages: [],
    errorMessage: ''
};

Messages.propTypes = {
    messages: PropTypes.array,
    errorMessage: PropTypes.string,
    onInitialize: PropTypes.func.isRequired,
};

export default Messages;
