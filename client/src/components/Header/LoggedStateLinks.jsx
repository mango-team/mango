import React from 'react';

import SubscriptionsLink from './SubscriptionsLink';
import Notifications from './Notifications';
import ProfileLink from './ProfileLink';
import SignInLink from './SignInLink';
import SignUpLink from './SignUpLink';

export default class LoggedStateLinks extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render() {
        var loggedInLinks = <span>
            <SubscriptionsLink />
            <Notifications />
            <ProfileLink />
        </span>;
        
        var loggedOutLinks = <span>
            <SignInLink />
            <SignUpLink />
        </span>;
        
        return this.props.userLoggedIn ? loggedInLinks : loggedOutLinks;
    }
};