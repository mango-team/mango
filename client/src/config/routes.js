import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
import Home from '../components/Home';
import Search from '../components/Search';
import History from '../components/History';
import Playlists from '../components/Playlists';
import Subscriptions from '../components/Subscriptions';
import Discussions from '../components/Discussions';
import Settings from '../components/Settings';
import Browse from '../components/Browse';
import Detail from '../components/Detail';
import Reader from '../components/Reader';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="search" component={Search} /> 
    <Route path="history" component={History} /> 
    <Route path="playlists" component={Playlists} /> 
    <Route path="subscriptions" component={Subscriptions} /> 
    <Route path="discussions" component={Discussions} /> 
    <Route path="settings" component={Settings} />     
    <Route path="browse" component={Browse} />         
    <Route path="detail" component={Detail} />
    <Route path="reader" component={Reader} /> 
    <Route path="*" component={Home} /> { /* Catch all route. 404 later? */}
  </Route>
)
