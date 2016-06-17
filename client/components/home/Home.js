import React from 'react';
import { Link } from 'react-router';

import HomeNavigation from '../shared/HomeNavigation';
import List from '../shared/List';
import listFrom, { mangaDetailPageUrl, mangaChapterPageUrl } from '../helpers/listFrom';

const Home = (props) => {
    return (
        <div>
            <HomeNavigation active="home" />
            <div>
                <List 
                    title={<Link to="/feed/updates">Recent updates</Link>} 
                    items={listFrom(props, props.app.updates, mangaChapterPageUrl)} />

                <List 
                    title={<Link to="/feed/resume">Resume viewing</Link>} 
                    items={listFrom(props, props.user.history, mangaChapterPageUrl)} />

                <List 
                    title={<Link to="/feed/recommended-by-friends">Recommended by your friends</Link>} 
                    items={listFrom(props, props.app.friendsRecommendations, mangaDetailPageUrl)} />

                <List 
                    title={<Link to="/feed/recommended">Recommended by our system</Link>} 
                    items={listFrom(props, props.app.systemRecommendations, mangaDetailPageUrl)} />
            </div>
        </div>
    );
};

export default Home;