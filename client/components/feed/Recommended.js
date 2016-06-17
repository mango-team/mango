import React from 'react';
import { Link } from 'react-router';
import { Navigation } from 'react-toolbox';

import List from '../shared/List';


const Recommended = ({ user }) => {
    return (
        <div>
            <div>
                <Navigation type="horizontal">
                    <Link to="/feed/recommended"  data-react-toolbox="link">Recommended for you</Link>
                    <Link to="/history"  data-react-toolbox="link">Based on your history</Link>
                </Navigation>

                {user && <List items={[]} />}
            </div>
        </div>
    )
};

export default Recommended;