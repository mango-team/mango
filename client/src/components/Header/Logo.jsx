import React from 'react';

export default class Logo extends React.Component {
  render() {
    return (
      <div className="logo">
        <a href="/">
          <img src="http://placehold.it/35x35" />
          <span>Mango</span>
        </a>
      </div>);
  }
};
