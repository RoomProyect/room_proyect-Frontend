import {createStore, applyMiddleware, compose} from "redux"
import thunkMiddleware from "redux-thunk"
import reducer from "./reducer"

const composeEnhacer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(
    reducer,
    composeEnhacer(applyMiddleware(thunkMiddleware))
    );

export default store;