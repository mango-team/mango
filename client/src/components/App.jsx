import React from 'react';

import Header from './Header/Header';
import PageContent from './PageContent';

export default React.createClass({
  render() {
    return <div>
        <Header userLoggedIn={true} />
        <PageContent/>
    </div>;
  }
});
