import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
import Home from '../components/Home';
import Search from '../components/Search';

export default (
  <Route path="/" component={App}>
    <Route path="/Search" component={Search} />
    <IndexRoute component={Home}/>
  </Route>
)
