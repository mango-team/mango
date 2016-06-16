import React from 'react';
import { Link } from 'react-router';
import { Navigation } from 'react-toolbox';

const Trending = () => {
    return(
        <div>
            <Navigation type="horizontal">
                <Link to="/">Home</Link>
                <Link to="/feed/trending" className="active">Trending</Link>
                <Link to="/feed/subscriptions">Subscriptions</Link>
            </Navigation>
        </div>
    )
};

export default Trending;