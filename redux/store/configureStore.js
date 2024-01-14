
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
const middleware = [thunk];
const initialState = {};
export default createStore(rootReducer, initialState, applyMiddleware(...middleware));