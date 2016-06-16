import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import Home from './components/Home';
import History from './components/feed/History';
import WatchHistory from './components/feed/History/Watch';
import SearchHistory from './components/feed/History/Search';
import Recommended from './components/feed/Recommended';
import RecommendedByFriends from './components/feed/RecommendedByFriends';
import Subscriptions from './components/feed/Subscriptions';
import Updates from './components/feed/Updates';
import Resume from './components/feed/Resume';
import Trending from './components/feed/Trending';
import User from './components/User';
import HomeUser from './components/user/Home';
import DiscussionUser from './components/user/Discussion';
import AboutUser from './components/user/About';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Manga from './components/Manga';
import MangaViewer from './components/MangaViewer';
import NotFound from './components/NotFound';

import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="signin" component={SignIn} />
                <Route path="signup" component={SignUp} />
                <Route path="feed">
                    <Route path="history" component={History}>
                        <IndexRoute component={WatchHistory} />
                        <Route path="search" component={SearchHistory} />
                    </Route>
                    <Route path="trending" component={Trending} />
                    <Route path="recommended" component={Recommended} />
                    <Route path="recommended-by-friends" component={RecommendedByFriends} />
                    <Route path="updates" component={Updates} />
                    <Route path="resume" component={Resume} />
                    <Route path="subscriptions" component={Subscriptions} />
                </Route>
                <Route path="user/:username" component={User}>
                    <IndexRoute component={HomeUser} />
                    <Route path="discussion" component={DiscussionUser} />
                    <Route path="about" component={AboutUser} />
                </Route>
                <Route path="manga/:id/:name" component={Manga} />
                <Route path="view/manga/:id/:name/:chapter(/:page)" component={MangaViewer} />
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    </Provider>    
);

render(router, document.getElementById('root'));