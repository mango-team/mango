import React from 'react'
import { render } from 'react-dom'

import App from './components/App'
import Feed from './components/Feed'
import History from './components/History'
import WatchHistory from './components/history/Watch'
import SearchHistory from './components/history/Search'
import Recommended from './components/feed/Recommended'
import RecommendedByFriends from './components/feed/RecommendedByFriends'
import Updates from './components/feed/Updates'
import Resume from './components/feed/Resume'
import Trending from './components/feed/Trending'
import User from './components/User'
import UserHome from './components/user/Home'
import Home from './components/home/Home'
import UserDiscussion from './components/user/Discussion'
import UserAbout from './components/user/About'
import UserPlaylists from './components/user/Playlists'
import UserSubscriptions from './components/user/Subscriptions'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Manga from './components/Manga'
import MangaAbout from './components/manga/About'
import MangaReviews from './components/manga/Reviews'
import MangaDiscussion from './components/manga/Discussion'
import MangaViewer from './components/MangaViewer'
import NotFound from './components/NotFound'

import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import store, { history } from './store'

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App}>
                <IndexRoute component={Home} />
                <Route path='signin' component={SignIn} />
                <Route path='signup' component={SignUp} />
                <Route path='feed' component={Feed}>
                    <IndexRoute component={NotFound} />
                    <Route path='trending' component={Trending} />
                    <Route path='recommended' component={Recommended} />
                    <Route path='recommended-by-friends' component={RecommendedByFriends} />
                    <Route path='updates' component={Updates} />
                    <Route path='resume' component={Resume} />
                </Route>
                <Route path='user/:username' component={User}>
                    <IndexRoute component={UserHome} />
                    <Route path='discussion' component={UserDiscussion} />
                    <Route path='about' component={UserAbout} />
                    <Route path='playlists' component={UserPlaylists} />
                    <Route path='subscriptions' component={UserSubscriptions} />
                </Route>
                <Route path='history' component={History}>
                    <IndexRoute component={WatchHistory} />
                    <Route path='search' component={SearchHistory} />
                </Route>
                <Route path='manga/:id/:name' component={Manga}>
                    <IndexRoute component={MangaAbout} />
                    <Route path='reviews' component={MangaReviews} />
                    <Route path='discussion' component={MangaDiscussion} />
                </Route>
                <Route path='view/manga/:id/:name/:chapter(/:page)' component={MangaViewer} />
                <Route path='*' component={NotFound} />
            </Route>
        </Router>
    </Provider>
)

render(router, document.getElementById('root'))
