import React from 'react';
import HomeNavigation from './shared/HomeNavigation';

const Feed = ({ app, children }) => {
    return (
        <div>
            {app && <HomeNavigation />}
            {children}
        </div>
    )
};

export default Feed;