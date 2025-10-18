
import { applyMiddleware, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { newsReducer } from './reducers';

const store = legacy_createStore(newsReducer, applyMiddleware(thunk));
export default store;
