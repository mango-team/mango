import React from 'react';

import Logo from './Logo';
import SearchBar from './SearchBar';
import Links from './Links';
import { Link } from 'react-router'

const Header = ({userLoggedIn}) => {
  return (
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <Logo />
        <SearchBar />
        <Link className="mdl-navigation__link" to="/browse">Browse</Link>
        <div className="mdl-layout-spacer"></div>
        <Links userLoggedIn={userLoggedIn} />
      </div>
    </header>
  )
};

export default Header;
