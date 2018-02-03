import { combineReducers, createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import AppReducer from './app';
import UsersReducer from './users';
import ChatsReducer from './chats';
import SearchReducer from './search';

const rootReducer = combineReducers({
    app: AppReducer,
    users: UsersReducer,
    chats: ChatsReducer,
    search: SearchReducer
});

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

export default createStoreWithMiddleware(rootReducer);
