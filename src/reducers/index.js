import { combineReducers } from 'redux';

import conversations from './conversations';
import messages from './messages';
import users from './users';
import session from './session';

const combined = combineReducers({
    conversations,
    messages,
    users,
    session,
});

export default combined;
