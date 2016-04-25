import React from 'react';

import Header from './Header/Header';
import PageContent from './PageContent/PageContent';
import Footer from './Footer/Footer'; 

const navList = [
                  {
                    name : "Home",
                    isActive : true
                  },
                  {
                    name : "Subscriptions",
                    isActive : false
                  },
                  {
                    name : "History",
                    isActive : false
                  },
                  {
                    name : "Settings",
                    isActive : false
                  }
                ];

const App = ({children}) => {
  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Header userLoggedIn={true} />
      <PageContent navigationList={navList} navigationActive="Home">{children}</PageContent>
      <Footer /> 
    </div>
  )
}

export default App;
