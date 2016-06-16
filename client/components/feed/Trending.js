import React from 'react';
import { Link } from 'react-router';
import { Navigation } from 'react-toolbox';

import HomeNavigation from '../shared/HomeNavigation';

const Trending = () => {
    return(
        <div>
            <HomeNavigation active="trending" />
        </div>
    )
};

export default Trending;