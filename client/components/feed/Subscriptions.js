import React from 'react';
import { Link } from 'react-router';
import { Navigation } from 'react-toolbox';

const Subscriptions = () => {
    return (
        <div>
            <Navigation type="horizontal">
                <Link to="/">Home</Link>
                <Link to="/feed/trending">Trending</Link>
                <Link to="/feed/subscriptions" className="active">Subscriptions</Link>
            </Navigation>
        </div>
    )
};

export default Subscriptions;