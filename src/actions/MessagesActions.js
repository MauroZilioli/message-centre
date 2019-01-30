import request, {abort} from "../utils/request";
import types from './../constants/ActionTypes';

const loadMessagesRequest = () => ({
    type: types.LOAD_MESSAGES_REQUEST,
});

const loadMessagesSuccess = messages => ({
    type: types.LOAD_MESSAGES_SUCCESS,
    messages,
});

const loadMessagesFailure = message => ({
    type: types.LOAD_MESSAGES_FAILURE,
    message,
});

let loadMessagesPromise = null;
export const loadConversationMessages = id => (dispatch) => {

    if (loadMessagesPromise === null) {
        dispatch(loadMessagesRequest());
    } else {
        abort(loadMessagesPromise);
    }

    loadMessagesPromise = request(`conversation/${id}/message/limited?limit=5&offset=0`);
    loadMessagesPromise.then(
        (messages) => {
            loadMessagesPromise = null;
            dispatch(loadMessagesSuccess(messages));
        },
        () => {
            loadMessagesPromise = null;
            dispatch(loadMessagesFailure('Could not load messages'));
        },
    );
};


const sendNewMessageRequest = () => ({
    type: types.SEND_MESSAGE_REQUEST,
});

const sendNewMessageFailure = message => ({
    type: types.SEND_MESSAGE_FAILURE,
    message,
});

let sendNewMessagePromise = null;
export const sendNewMessage = message => (dispatch) => {
    if (sendNewMessagePromise === null) {
        dispatch(sendNewMessageRequest());
    } else {
        abort(sendNewMessagePromise);
    }

    const newMessage = {
        message: message.message,
        senderId: message.senderId
    };

    sendNewMessagePromise = request(`conversation/${message.id}/message/send`,'POST',newMessage);
    sendNewMessagePromise.then(
        () => {
            sendNewMessagePromise = null;
            dispatch(loadConversationMessages(message.id));
        },
        () => {
            sendNewMessagePromise = null;
            dispatch(sendNewMessageFailure('Could not send message'));
        }
    )
}
