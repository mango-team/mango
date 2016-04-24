import React from 'react';

import Header from './Header/Header';
import PageContent from './PageContent/PageContent';
import Footer from './Footer/Footer';

export default React.createClass({
  render() {
    return <div>
        <Header userLoggedIn={true} />
        <PageContent navigationList={["Nav1","Nav2","Nav3", "Nav4"]}/>
        <Footer />
    </div>;
  }
});
