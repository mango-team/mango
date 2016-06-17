import React from 'react';
import { Link } from 'react-router';
import { Navigation } from 'react-toolbox';

import List from '../shared/List';
import listFrom, { mangaDetailPageUrl } from '../helpers/listFrom';


const Recommended = (props) => {
    return (
        <div>
            <Navigation type="horizontal">
                <Link to="/feed/recommended"  data-react-toolbox="link">Recommended for you</Link>
                <Link to="/history"  data-react-toolbox="link">Based on your history</Link>
            </Navigation>

            <List items={listFrom(props, props.app.systemRecommendations, mangaDetailPageUrl)} />
        </div>
    )
};

export default Recommended;