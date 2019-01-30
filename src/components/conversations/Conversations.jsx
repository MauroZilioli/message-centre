import React from 'react';
import PropTypes from "prop-types";
import './Conversations.scss';

// import Users from './../users/Users';

import * as SH from "../../sh/src/elements";

import ConversationUpdate from './conversationupdate/ConversationUpdate';
import ConversationCreate from './conversationcreate/ConversationCreate';

class Conversations extends React.Component {
    constructor(props) {
        super(props);


    }

    componentWillMount() {
        this.props.onInitialize(this.props.sessionUser.id);
    }

    handleUpdateConversation(event, conversation) {
        this.props.history.push(`/conversations/update/${conversation.conversation.id}`);
    }

    handleUpdateConversationCancel() {
        this.props.history.push('/conversations');
    }

    loadConversationMessages(conversationId) {
        this.props.loadConversationMessages(conversationId);
    }

    sendNewMessage(message) {
        this.props.sendNewMessage(message);
    }

    handleCreateConversation(conversation) {
        this.props.onCreateConversation(conversation);
    }

    handleCreateConversationCancel() {
        this.props.history.push('/conversations');
    }



    render() {

        const {
            conversations,
            users,
            isLoading,
            isModeUpdate,
            isModeCreate,
            isSaving,
            activeConversation,
            conversationMessages,
            sessionUser,
        } = this.props;

        const test = users;

        return (
        <SH.Page className="conversations">
            <SH.Header><h1 className="conversations-page-title">My Conversations</h1></SH.Header>
            {
                isLoading
                    ? <SH.Content><SH.Loading>Loading conversations...</SH.Loading></SH.Content>
                    : <SH.Content>
                        <SH.Cardlist>
                            {conversations.map(conversation => (
                                <SH.Card key={`card-conversation-${conversation.conversation.id}`} className="conversations-list-card">
                                    <SH.Header>
                                        <div className="card-conversations-name">
                                            <h3>{conversation.conversation.name === null ? 'NO TITLE' : conversation.conversation.name}</h3>
                                        </div>
                                    </SH.Header>
                                    <SH.Content className="conversations-list-card-front">
                                        <SH.Field>
                                            <SH.Output
                                                value={conversation.conversation.lastseen === null ? '' : conversation.conversation.lastseen}/>
                                        </SH.Field>
                                        {conversation.users.map(user => (
                                            <SH.Field key={`field-user-${user.id}`}>
                                                <SH.Output value={test ? test.find(x => x.id === user.userid).name : user.id}/>
                                                {/*<SH.Output value={user.userid}/>*/}
                                            </SH.Field>
                                        ))}
                                    </SH.Content>
                                    <SH.Content className="conversations-list-card-back">
                                        <SH.Button
                                            onClick={event => this.handleUpdateConversation(event, conversation)}
                                        >Write message</SH.Button>
                                    </SH.Content>
                                </SH.Card>
                            ))}
                        </SH.Cardlist>
                    </SH.Content>
            }
            <SH.Footer>
                <SH.Modal
                    isOpen={isModeCreate}
                    onClose={() => !isSaving && this.handleCreateConversationCancel()}
                    closeable>
                    <ConversationCreate
                        sessionUser={sessionUser}
                        isSaving={isSaving}
                        users={users}
                        onAccept={conversation => this.handleCreateConversation(conversation)}/>
                </SH.Modal>
                <SH.Modal
                    isOpen={isModeUpdate && !!activeConversation}
                    onClose={() => !isLoading && this.handleUpdateConversationCancel()}
                    closeable>
                    <ConversationUpdate
                        conversation={activeConversation}
                        sessionUser={sessionUser}
                        loadMessages={conversation => this.loadConversationMessages(conversation)}
                        onSend={message => this.sendNewMessage(message)}
                        conversationMessages={conversationMessages}
                        users={users}/>
                </SH.Modal>
            </SH.Footer>
        </SH.Page>
        );
    }
}

Conversations.defaultProps = {
    conversations: [],
    conversationMessages: [],
    users: [],
    errorMessage: ''
};

Conversations.propTypes = {
    sessionUser: PropTypes.object.isRequired,
    conversations: PropTypes.array,
    users: PropTypes.array,
    errorMessage: PropTypes.string,
    onInitialize: PropTypes.func.isRequired,
    onCreateConversation: PropTypes.func.isRequired,
    loadConversationMessages: PropTypes.func.isRequired,
    sendNewMessage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    isModeUpdate: PropTypes.bool.isRequired,
    activeConversation: PropTypes.object,
    conversationMessages: PropTypes.array,
    isSaving: PropTypes.bool.isRequired,
};

export default Conversations;
