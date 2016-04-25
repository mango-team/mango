import React from 'react';

import Logo from './Logo';
import SearchBar from './SearchBar';
import Links from './Links';

const Header = ({userLoggedIn}) => {
  return (
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <Logo />
        <SearchBar />
        <a className="mdl-navigation__link" href="/Browse">Browse</a>
        <div className="mdl-layout-spacer"></div>
        <Links userLoggedIn={userLoggedIn} />
      </div>
    </header>
  )
};

export default Header;
