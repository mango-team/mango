import React from 'react';

export default class SearchBar extends React.Component {
  render() {
    return <span>
            <input type="search" placeholder="Search"/>
            <input type="submit" value="Search"/>
           </span>;
  }
};
