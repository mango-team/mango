import React from 'react';

import Logo from './Logo';
import SearchBar from './SearchBar';
import Links from './Links';

export default class Header extends React.Component {
  constructor(props) {
        super(props);
  }
    
  render() {
    return (
      <div className="header">
        <Logo />
        <SearchBar />
        <Links userLoggedIn={this.props.userLoggedIn} />
      </div>
    );
  }
};
