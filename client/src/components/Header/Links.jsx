import React from 'react';

import SubscriptionsLink from './SubscriptionsLink';
import Notifications from './Notifications';
import ProfileLink from './ProfileLink';
import SignInLink from './SignInLink';
import SignUpLink from './SignUpLink';

export default class Links extends React.Component {
  render() {
    var loggedInLinks =
      <nav className="mdl-navigation">
        <Notifications />
        <ProfileLink />
      </nav>;

    var loggedOutLinks =
      <nav className="mdl-navigation">
        <SignInLink />
        <SignUpLink />
      </nav>;

    return (
      <div>
        {this.props.userLoggedIn ? loggedInLinks : loggedOutLinks}
      </div>
    );
  }
};
