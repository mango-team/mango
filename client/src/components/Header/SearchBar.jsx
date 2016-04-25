import React from 'react';

import { browserHistory } from 'react-router'

export default class SearchBar extends React.Component {
  handleClick(event) {
    console.log('Log');
  }
  
  render() {
    return <span>
            <input type="search" placeholder="Search"  />
            <input type="submit" defaultValue="Search" onClick={this.handleClick.bind(this)} />
           </span>;
  }
};

