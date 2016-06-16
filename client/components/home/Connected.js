import React from 'react';
import { Link } from 'react-router';
import { Navigation } from 'react-toolbox';

import Listing from '../shared/Listing';

const Connected = (props) => {
    const listingFrom = (list, callback) => {
        const items = [];

        if(Array.isArray(list)) {
            const { mangas } = props;

            list.forEach((listItem) => {
                if(listItem && listItem.type === 'manga') {
                    const manga = mangas.find((m) => m.id == listItem.id);
                    if(manga) {
                        let additionalData = {};
                        if(typeof callback == 'function') {
                            additionalData = callback({listItem, manga, list, mangas});
                        }
                        const item = Object.assign({}, manga, additionalData);
                        items.push(item);
                    }
                }
            });
        }

        return items;
    };

    const detailPageUrl = ({ manga }) => {
        return { url: `/manga/${manga.id}/${manga.name}` };
    };

    const chapterPageUrl = ({manga, listItem }) => {
        return { url: `/view/manga/${manga.id}/${manga.name}/${listItem.chapter}/${listItem.page}` };
    }

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
                    items={listingFrom([])} />

                <Listing 
                    title={<Link to="/feed/resume">Resume viewing</Link>} 
                    items={listingFrom(props.user.history, chapterPageUrl)} />

                <Listing 
                    title={<Link to="/feed/recommended-by-friends">Recommended by your friends</Link>} 
                    items={listingFrom(props.app.friendsRecommendations, detailPageUrl)} />

                <Listing 
                    title={<Link to="/feed/recommended">Recommended by our system</Link>} 
                    items={listingFrom(props.app.systemRecommendations, detailPageUrl)} />
            </div>
        </div>
    );
};

export default Connected;