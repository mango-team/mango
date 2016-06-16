import React from 'react';
import { Link } from 'react-router';
import { Navigation } from 'react-toolbox';

import Listing from '../shared/Listing';


const Recommended = ({ user }) => {
    return (
        <div>
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