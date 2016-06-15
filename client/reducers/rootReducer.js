import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const state = {
    routing: routerReducer
};

const rootReducer = combineReducers(state);

export default rootReducer;