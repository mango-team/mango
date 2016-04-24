import React from 'react';

import LoggedStateLinks from './LoggedStateLinks';

export default class Links extends React.Component {
  render() {
    return (
      <span>
        <a href="/Browse">Browse</a>
        <LoggedStateLinks userLoggedIn={this.props.userLoggedIn} />
      </span>
    );
  }
};
