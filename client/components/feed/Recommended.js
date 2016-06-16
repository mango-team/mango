import React from 'react';
import { Link } from 'react-router';
import { Navigation } from 'react-toolbox';

import Listing from '../shared/Listing';
import HomeNavigation from '../shared/HomeNavigation';


const Recommended = ({ user }) => {
    return (
        <div>
            <HomeNavigation />

            <div>
                <Navigation type="horizontal">
                    <Link to="/feed/recommended">Recommended for you</Link>
                    <Link to="/feed/history">Based on your history</Link>
                </Navigation>

                {user && <Listing items={[]} />}
            </div>
        </div>
    )
};

export default Recommended;