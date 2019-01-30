import React from 'react';
import { connect } from 'react-redux';

import * as MessagesActions from './../../actions/MessagesActions';

import Messages from '../../components/messages/Messages';

const MessagesContainer = props => <Messages {...props} />;

const mapStoreStateToProps = (storeState, ownProps) => ({
    // sessionUser: storeState.session.user,
    isLoading: storeState.messages.isFetching,
    isSaving: storeState.messages.isSaving,
    errorMessage: storeState.messages.errorMessage,
    messages: storeState.messages.items,
});

export default connect(mapStoreStateToProps, {
    onInitialize: () => MessagesActions.loadMessages(),
})(MessagesContainer);
