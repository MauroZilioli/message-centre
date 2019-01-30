import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const configureStore = initialState => createStoreWithMiddleware(
    rootReducer,
    initialState,
    // window.devToolsExtension && window.devToolsExtension(),
);

export default configureStore();
