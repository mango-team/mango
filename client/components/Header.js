import React from 'react';

import { Link } from 'react-router'

const Header = () => {
  return (
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">
            <a href="/">
                <img width="35px" height="35px" src="https://cdn2.iconfinder.com/data/icons/fruit-flat-transparent/512/mango-128.png" />
                <span>Mango</span>
            </a>
        </span>
        <Link className="mdl-navigation__link" to="/browse">Browse</Link>
        <div className="mdl-layout-spacer"></div>

      </div>
    </header>
  )
};

export default Header;
