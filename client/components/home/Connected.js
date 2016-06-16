import React from 'react';
import { Link } from 'react-router';
import { Navigation } from 'react-toolbox';

import Listing from '../shared/Listing';

class Connected extends React.Component {
    constructor(props){
        super(props);
    }

    recentUpdates() {
        return [];
    }
    
    resumeViewing() {
        const { user, mangas } = this.props;
        const { history } = user;
        let items = [];

        if(history) {
            history.forEach((item, index) => {
                if(item.type === 'manga') {
                    let manga = mangas.find((m) => m.id == item.id);
                    if(manga) {
                        manga.url = `/manga/${manga.id}/${manga.name}`;
                        items.push(manga);
                    }
                }
            });
        }
        
        return items;
    }

    friendRecommendation() {
        const { app, mangas } = this.props;
        const { friendsRecommendations } = app;
        let items = [];

        if(friendsRecommendations) {
            friendsRecommendations.forEach((item, index) => {
                if(item.type === 'manga') {
                    let manga = mangas.find((m) => m.id == item.id);
                    if(manga) {
                        manga.url = `/manga/${manga.id}/${manga.name}`;
                        items.push(manga);
                    }
                }
            });
        }
        
        return items;
    }

    systemRecommendation() {
        const { app, mangas } = this.props;
        const { systemRecommendations } = app;
        let items = [];

        if(systemRecommendations) {
            systemRecommendations.forEach((item, index) => {
                if(item.type === 'manga') {
                    let manga = mangas.find((m) => m.id == item.id);
                    if(manga) {
                        manga.url = `/manga/${manga.id}/${manga.name}`;
                        items.push(manga);
                    }
                }
            });
        }
        
        return items;
    }

    render() {
        return (
            <div>
                <Navigation type="horizontal">
                    <Link to="/" className="active">Home</Link>
                    <Link to="/feed/trending">Trending</Link>
                    <Link to="/feed/subscriptions">Subscriptions</Link>
                </Navigation>
                <div>
                    <Listing 
                        title={<Link to="/feed/updates">Recent updates</Link>} 
                        items={this.recentUpdates()} />

                    <Listing 
                        title={<Link to="/feed/resume">Resume viewing</Link>} 
                        items={this.resumeViewing()} />

                    <Listing 
                        title={<Link to="/feed/recommended-by-friends">Recommended by your friends</Link>} 
                        items={this.friendRecommendation()} />

                    <Listing 
                        title={<Link to="/feed/recommended">Recommended by our system</Link>} 
                        items={this.systemRecommendation()} />
                </div>
            </div>
        )
    }
};

export default Connected;