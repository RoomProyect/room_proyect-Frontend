import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,

);

export default store;