import React from 'react';

import Header from './Header/Header';
import PageContent from './PageContent/PageContent';
import Footer from './Footer/Footer'; 

const App = ({children}) => {
  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Header userLoggedIn={true} />
      <PageContent navigationList={["Nav1","Nav2","Nav3", "Nav4"]}>{children}</PageContent>
      <Footer /> 
    </div>
  )
}

export default App;
