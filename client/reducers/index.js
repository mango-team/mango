import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import authors from './authors';
import providers from './providers';
import users from './users';
import app from './app';

const state = {
    routing,
    authors,
    providers,
    users,
    app
};

const rootReducer = combineReducers(state);

export default rootReducer;