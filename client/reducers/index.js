import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import authors from './authors';
import providers from './providers';
import users from './users';
import app from './app';
import chapters from './chapters';
import mangas from './mangas';

const state = {
    routing,
    authors,
    providers,
    users,
    app,
    mangas,
    chapters
};

const rootReducer = combineReducers(state);

export default rootReducer;