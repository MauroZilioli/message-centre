import React from 'react';
import { connect } from 'react-redux';

import * as ConversationsActions from './../../actions/ConversationsActions';
import * as UsersActions from './../../actions/UsersActions';
import * as MessagesActions from './../../actions/MessagesActions';

import Conversations from '../../components/conversations/Conversations';

const ConversationsContainer = props => <Conversations {...props} />;

const mapStoreStateToProps = (storeState, ownProps) => ({
    sessionUser: storeState.session.user,
    isLoading: storeState.conversations.isFetching,
    isSaving: storeState.conversations.isSaving,
    errorMessage: storeState.conversations.errorMessage,
    conversations: storeState.conversations.items,
    users: storeState.users.items,
    activeConversation:  storeState.conversations.items.find(conversation => conversation.conversation.id === ownProps.match.params.id),
    isModeUpdate: !storeState.conversations.isFetching && ownProps.match.params.action === 'update',
    isModeCreate: !storeState.conversations.isFetching && ownProps.match.params.action === 'create',
    conversationMessages: storeState.messages.items,
});

const loadAllData = userId => (dispatch) => {
    dispatch(UsersActions.loadUsers());
    dispatch(ConversationsActions.loadConversationsById(userId));
};

export default connect(mapStoreStateToProps, {
    onInitialize: userId => loadAllData(userId),
    loadConversationMessages: id => MessagesActions.loadConversationMessages(id),
    sendNewMessage: message => MessagesActions.sendNewMessage(message),
    onCreateConversation: conversation => ConversationsActions.createConversation(conversation),
})(ConversationsContainer);
