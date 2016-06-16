import React from 'react';
import {Tab, Tabs, Card, CardTitle} from 'react-toolbox';

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
                        console.log(manga);
                        items.push(manga);
                    }
                }
            });
        }
        
        return items;
    }

    friendRecommendation() {
        return [];
    }   

    systemRecommendation() {
        return [];
    }  

    render() {
        return (
            <Tabs>
                <Tab label="Home">
                    <Listing title="Recent updates" items={this.recentUpdates()} />
                    <Listing title="Resume viewing " items={this.resumeViewing()} />
                    <Listing title="Recommended by your friends" items={this.friendRecommendation()} />
                    <Listing title="Recommended by our system" items={this.systemRecommendation()} />
                </Tab>
                <Tab label="Playlists"></Tab>
                <Tab label="Subscriptions"></Tab>
                <Tab label="History"></Tab>
                <Tab label="Discussion"></Tab>
                <Tab label="Settings"></Tab>
            </Tabs>
        )
    }
};

export default Connected;