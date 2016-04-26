import React from 'react';

import Header from './Header/Header';
import PageContent from './PageContent/PageContent';
import Footer from './Footer/Footer'; 

const navList = [
                  {
                    name : "Home",
                    isActive : true,
                    isDisabled : false
                  },
                  {
                    name : "Playlists",
                    isActive : false,
                    isDisabled : true
                  },
                  {
                    name : "Subscriptions",
                    isActive : false,
                    isDisabled : false
                  },
                  {
                    name : "History",
                    isActive : false,
                    isDisabled : false
                  },
                  {
                    name : "Discussions",
                    isActive : false,
                    isDisabled : true
                  },
                  {
                    name : "Settings",
                    isActive : false,
                    isDisabled : true
                  }
                ];

const App = ({children}) => {
  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Header userLoggedIn={false} />
      <PageContent navigationList={navList} navigationActive="Home">{children}</PageContent>
      <Footer /> 
    </div>
  )
}

export default App;
