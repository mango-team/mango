import React from 'react';
import { Link } from 'react-router';
import { Navigation } from 'react-toolbox';
import HomeNavigation from './shared/HomeNavigation';

const History = ({app, children}) => {
    return (
        <div>
            {app && <HomeNavigation />}
            {app &&
                 <Navigation type="horizontal">
                    <Link to="/history">Watch history</Link>
                    <Link to="/history/search">Search History</Link>
                 </Navigation>
            }
            {children}
        </div>
    )
};

export default History;