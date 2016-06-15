import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import Home from './components/Home';
import History from './components/feed/History';
import WatchHistory from './components/feed/History/Watch';
import SearchHistory from './components/feed/History/Search';
import Recommended from './components/feed/Recommended';
import Subscriptions from './components/feed/Subscriptions';
import User from './components/User';
import HomeUser from './components/user/Home';
import DiscussionUser from './components/user/Discussion';
import AboutUser from './components/user/About';

import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="feed">
                    <Route path="history" component={History}>
                        <IndexRoute component={WatchHistory} />
                        <Route path="search" component={SearchHistory} />
                    </Route>
                    <Route path="recommended" component={Recommended} />
                    <Route path="subscriptions" component={Subscriptions} />
                </Route>
                <Route path="user/:username" component={User}>
                    <IndexRoute component={HomeUser} />
                    <Route path="discussion" component={DiscussionUser} />
                    <Route path="about" component={AboutUser} />
                </Route>
            </Route>
        </Router>
    </Provider>    
);

render(router, document.getElementById('root'));