import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
import Home from '../components/Home';
import Search from '../components/Search';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="search" component={Search} /> 
    <Route path="*" component={Home} /> { /* Catch all route. 404 later? */}
  </Route>
)
