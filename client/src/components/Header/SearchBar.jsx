import React from 'react';

import { browserHistory } from 'react-router'

export default class SearchBar extends React.Component {
  loadSearchResultClick(event) {
    var searchText = document.getElementById('search').value != "" ? "?query=" + encodeURIComponent(document.getElementById('search').value) : "";
    window.location.assign(window.location.pathname + '#/search' + searchText);
  };

  render() {
    return <span>
      <input id="search" type="search" placeholder="Search"  />
      <input type="submit" defaultValue="Search" onClick={this.loadSearchResultClick.bind(this) } />
    </span>;
  }
};

